#!/usr/bin/env python3
"""LA RESSEMBLANCE ENTRE PAGES DE CONTENU (bloquant au-delà de 0,35).

    python3 scripts/ressemblance.py dist            toutes les paires
    python3 scripts/ressemblance.py dist sport/judo  une page contre toutes les autres

Compare, mot à mot (difflib), le contenu PROPRE de chaque page de collection :
le h1, le chapô, le texte rédigé (article[data-contenu]) et la FAQ. Les blocs
communs (en-tête, pied, bloc temps, appel démo, « voir aussi ») sont écartés :
ils sont identiques par construction. Objectif : moins de 0,35 partout.

LANGUE PAR LANGUE : les pages françaises sont comparées entre elles, les pages
espagnoles (dist/es/<dossier>/) entre elles. Une page et sa traduction ne se
comparent pas (elles disent la même chose, par définition).
"""
import difflib, html, os, re, sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else "dist"
CIBLES = sys.argv[2:]
DOSSIERS = ["fonctionnalites", "sport", "activites", "pour", "comparatif", "guides", "articles"]
SEUIL = 0.35


def propre(f):
    s = open(f, encoding="utf-8").read()
    s = re.sub(r"(?is)<(script|style|svg)[^>]*>.*?</\1>", " ", s)
    parts = []
    for motif in (r"(?is)<h1[^>]*>(.*?)</h1>", r'(?is)<p class="chapo"[^>]*>(.*?)</p>',
                  r"(?is)<article[^>]*data-contenu[^>]*>(.*?)</article>", r'(?is)<section class="faq"[^>]*>(.*?)</section>'):
        parts += re.findall(motif, s)
    t = re.sub(r"(?s)<[^>]+>", " ", " ".join(parts))
    return re.sub(r"\s+", " ", html.unescape(t).replace(" ", " ")).strip().lower().split()


pages = []
for prefixe in ("", "es/"):
    for d in DOSSIERS:
        dd = os.path.join(ROOT, prefixe + d)
        if os.path.isdir(dd):
            pages += sorted(os.path.join(prefixe + d, f) for f in os.listdir(dd) if f.endswith(".html"))
langue = lambda p: "es" if p.startswith("es/") else "fr"
mots = {p: propre(os.path.join(ROOT, p)) for p in pages}
cibles = [c if c.endswith(".html") else c + ".html" for c in CIBLES] or pages
pire, defauts, vus = 0.0, [], set()
for c in cibles:
    if c not in mots:
        print(f"page inconnue : {c}"); sys.exit(1)
    for p in pages:
        if p == c or (p, c) in vus or langue(p) != langue(c): continue
        vus.add((c, p))
        r = difflib.SequenceMatcher(None, mots[c], mots[p], autojunk=False).ratio()
        if r > pire: pire = r
        if r >= SEUIL: defauts.append((r, c, p))
nb_es = sum(1 for p in pages if langue(p) == "es")
print(f"ressemblance : {len(pages)} pages de contenu ({len(pages) - nb_es} fr, {nb_es} es), {len(vus)} paires de même langue, maximum {pire:.2f} (seuil {SEUIL})")
for r, a, b in sorted(defauts, reverse=True):
    print(f"  [RESSEMBLANCE] {a} ~ {b} : {r:.2f}")
sys.exit(1 if defauts else 0)
