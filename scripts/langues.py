#!/usr/bin/env python3
"""
LES PAGES ANGLAISE ET ESPAGNOLE DE L'ACCUEIL, ÉCRITES À PARTIR DU FRANÇAIS.

Google n'indexe qu'une langue par adresse. Tant que l'anglais et l'espagnol
n'existaient que par le bouton EN/ES, qui traduisait la page dans le navigateur,
Google ne voyait que le français, et le site n'existait pas pour l'Espagne ni
pour le Royaume-Uni. Ce script écrit site/en.html et site/es.html (servies en
/en et /es) à partir de site/index.html et des traductions de site/i18n.js, avec
la langue, le titre, la description, l'adresse canonique et les données
structurées de chaque page.

La règle suit celle qu'appliquait le navigateur : data-i18n remplace le texte,
data-i18n-html le contenu HTML, data-i18n-alt, data-i18n-aria et
data-i18n-content l'attribut correspondant.

À RELANCER APRÈS CHAQUE MODIFICATION DE index.html OU DE i18n.js :

    python3 scripts/langues.py              écrit les deux pages
    python3 scripts/langues.py --verifier   échoue si elles ne sont plus à jour
"""
import html
import json
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
SITE = RACINE / 'site'
LANGUES = {'en': ('en_GB', 'https://onclub.app/en'), 'es': ('es_ES', 'https://onclub.app/es')}
VIDES = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
         'param', 'source', 'track', 'wbr'}
AVIS = '<!-- Page générée par scripts/langues.py depuis index.html et i18n.js : ne pas la modifier à la main. -->\n'


def traductions():
    """Le dictionnaire de i18n.js, lu par Node, qui sait ce qu'est un littéral JS."""
    code = ("global.window={};require(process.argv[1]);"
            "process.stdout.write(JSON.stringify(window.I18N))")
    sortie = subprocess.run(['node', '-e', code, str(SITE / 'i18n.js')],
                            capture_output=True, text=True, check=True)
    return json.loads(sortie.stdout)


class Reperes(HTMLParser):
    """Relève, pour chaque élément traduit, où commence sa balise, où elle finit
    et où commence sa balise fermante, en positions absolues dans le fichier."""

    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.debuts_de_ligne = [0] + [i + 1 for i, c in enumerate(source) if c == '\n']
        self.pile = []
        self.elements = []

    def position(self):
        ligne, colonne = self.getpos()
        return self.debuts_de_ligne[ligne - 1] + colonne

    def handle_starttag(self, balise, attributs):
        debut = self.position()
        brut = self.get_starttag_text()
        element = {'balise': balise, 'attributs': dict(attributs), 'debut': debut,
                   'fin_balise': debut + len(brut), 'fin_contenu': None}
        self.elements.append(element)
        if balise not in VIDES:
            self.pile.append(element)

    def handle_startendtag(self, balise, attributs):
        debut = self.position()
        brut = self.get_starttag_text()
        self.elements.append({'balise': balise, 'attributs': dict(attributs), 'debut': debut,
                              'fin_balise': debut + len(brut), 'fin_contenu': None})

    def handle_endtag(self, balise):
        if balise in VIDES:
            return
        ouvert = self.pile.pop()
        if ouvert['balise'] != balise:
            raise ValueError(f"</{balise}> ferme <{ouvert['balise']}> à la position {self.position()}")
        ouvert['fin_contenu'] = self.position()


def texte(valeur):
    """data-i18n remplace textContent : la valeur est du texte, pas du HTML.
    Les entités écrites dans i18n.js (&nbsp;) sont rendues en vrais caractères."""
    return html.escape(html.unescape(valeur), quote=False)


def attribut(valeur):
    return html.escape(html.unescape(valeur), quote=True)


def remplacer_attribut(balise_brute, nom, valeur):
    motif = re.compile(r'(\s' + re.escape(nom) + r'=")[^"]*(")')
    if not motif.search(balise_brute):
        raise ValueError(f'{nom} absent de {balise_brute[:80]}')
    return motif.sub(lambda m: m.group(1) + attribut(valeur) + m.group(2), balise_brute, count=1)


def sans_balises(fragment):
    return ' '.join(html.unescape(re.sub(r'<[^>]+>', ' ', fragment)).split())


def page(source, t, langue):
    locale, adresse = LANGUES[langue]
    reperes = Reperes(source)
    reperes.feed(source)
    reperes.close()
    if reperes.pile:
        raise ValueError(f"balises restées ouvertes : {[e['balise'] for e in reperes.pile][-3:]}")

    manquantes = set()
    modifications = []  # (début, fin, remplacement), sans chevauchement
    for e in reperes.elements:
        a = e['attributs']
        brut = source[e['debut']:e['fin_balise']]
        nouveau = brut
        for nom_i18n, nom_attr in (('data-i18n-alt', 'alt'), ('data-i18n-aria', 'aria-label'),
                                   ('data-i18n-content', 'content')):
            cle = a.get(nom_i18n)
            if cle is None:
                continue
            if cle not in t:
                manquantes.add(cle)
                continue
            nouveau = remplacer_attribut(nouveau, nom_attr, t[cle])
        if a.get('data-lang'):
            nouveau = nouveau.replace(' aria-current="true"', '')
            if a['data-lang'] == langue:
                nouveau = nouveau[:-1] + ' aria-current="true">'
        if nouveau != brut:
            modifications.append((e['debut'], e['fin_balise'], nouveau))

        for nom_i18n, rendu in (('data-i18n', texte), ('data-i18n-html', lambda v: v)):
            cle = a.get(nom_i18n)
            if cle is None:
                continue
            if cle not in t:
                manquantes.add(cle)
                continue
            if e['fin_contenu'] is None:
                raise ValueError(f'<{e["balise"]} {nom_i18n}="{cle}"> sans balise fermante')
            modifications.append((e['fin_balise'], e['fin_contenu'], rendu(t[cle])))

    if manquantes:
        raise ValueError(f'clés absentes des traductions {langue} : {sorted(manquantes)}')

    # Un élément traduit à l'intérieur d'un autre disparaît avec le contenu de son
    # parent, remplacé en entier : sa propre modification n'a plus d'objet.
    modifications.sort()
    retenues = []
    for m in modifications:
        if retenues and m[0] < retenues[-1][1]:
            parent = retenues[-1]
            if not (parent[0] <= m[0] and m[1] <= parent[1]):
                raise ValueError(f'modifications qui se chevauchent : {parent[:2]} et {m[:2]}')
            continue
        retenues.append(m)

    sortie = source
    for debut, fin, remplacement in reversed(retenues):
        sortie = sortie[:debut] + remplacement + sortie[fin:]

    # L'en-tête : langue, titre, adresse canonique, langue Open Graph.
    def une_fois(chaine, ancien, nouveau, quoi):
        if chaine.count(ancien) != 1:
            raise ValueError(f'{quoi} : {chaine.count(ancien)} occurrence(s)')
        return chaine.replace(ancien, nouveau)

    sortie = une_fois(sortie, '<html lang="fr">', f'<html lang="{langue}">', 'html lang')
    sortie = re.sub(r'<title>.*?</title>', lambda m: f'<title>{texte(t["meta_title"])}</title>', sortie, count=1)
    sortie = une_fois(sortie, '<link rel="canonical" href="https://onclub.app/">',
                      f'<link rel="canonical" href="{adresse}">', 'canonical')
    sortie = une_fois(sortie, '<meta property="og:url" content="https://onclub.app/">',
                      f'<meta property="og:url" content="{adresse}">', 'og:url')
    sortie = une_fois(sortie, '<meta property="og:locale" content="fr_FR">',
                      f'<meta property="og:locale" content="{locale}">', 'og:locale')
    sortie = une_fois(sortie, '<!DOCTYPE html>\n', '<!DOCTYPE html>\n' + AVIS, 'doctype')

    # Les données structurées disent ce que la page montre, dans sa langue.
    def donnees(m):
        d = json.loads(m.group(1))
        if d.get('@type') == 'FAQPage':
            questions = []
            for n in range(1, 50):
                if f'faq{n}_q' not in t:
                    break
                questions.append({'@type': 'Question', 'name': sans_balises(t[f'faq{n}_q']),
                                  'acceptedAnswer': {'@type': 'Answer', 'text': sans_balises(t[f'faq{n}_a'])}})
            d['mainEntity'] = questions
        elif 'description' in d:
            d['description'] = sans_balises(t['meta_description'])
        return ('<script type="application/ld+json">'
                + json.dumps(d, ensure_ascii=False) + '</script>')

    sortie = re.sub(r'<script type="application/ld\+json">(.*?)</script>', donnees, sortie, flags=re.S)
    return sortie


def main():
    verifier = '--verifier' in sys.argv[1:]
    source = (SITE / 'index.html').read_text(encoding='utf-8')
    t = traductions()
    perimees = []
    for langue in LANGUES:
        attendu = page(source, t[langue], langue)
        chemin = SITE / f'{langue}.html'
        if verifier:
            if not chemin.exists() or chemin.read_text(encoding='utf-8') != attendu:
                perimees.append(chemin.name)
        else:
            chemin.write_text(attendu, encoding='utf-8')
            print(f'écrit {chemin.relative_to(RACINE)}')
    if perimees:
        print('à régénérer (python3 scripts/langues.py) : ' + ', '.join(perimees))
        sys.exit(1)


if __name__ == '__main__':
    main()
