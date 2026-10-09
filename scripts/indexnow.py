#!/usr/bin/env python3
"""
PRÉVENIR BING, YANDEX, SEZNAM ET NAVER DÈS QU'UNE PAGE CHANGE (IndexNow).

Google ne lit pas IndexNow : pour lui, c'est le sitemap et la Search Console.
Bing, lui, le lit, et l'index de Bing nourrit aussi la recherche de ChatGPT, de
Copilot et de DuckDuckGo. Un domaine jeune attend sinon des semaines qu'un robot
repasse.

La clé est le fichier site/<clé>.txt, publié à la racine du site : il prouve
que c'est bien nous qui parlons pour onclub.app.

À LANCER APRÈS CHAQUE MISE EN LIGNE (une fois le déploiement terminé) :

    python3 scripts/indexnow.py                 toutes les adresses du sitemap
    python3 scripts/indexnow.py /sport/volley   seulement celles-là
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent / 'site'
HOTE = 'onclub.app'


def cle() -> str:
    fichiers = [f for f in RACINE.glob('*.txt') if re.fullmatch(r'[0-9a-f]{32}', f.stem) and f.read_text().strip() == f.stem]
    if len(fichiers) != 1:
        sys.exit(f'Il faut exactement une clé IndexNow dans site/ (trouvé : {len(fichiers)}).')
    return fichiers[0].stem


def adresses() -> list[str]:
    if len(sys.argv) > 1:
        return [f'https://{HOTE}{a if a.startswith("/") else "/" + a}' for a in sys.argv[1:]]
    return re.findall(r'<loc>([^<]+)</loc>', (RACINE / 'sitemap.xml').read_text(encoding='utf-8'))


def main() -> None:
    k = cle()
    urls = adresses()
    corps = json.dumps({'host': HOTE, 'key': k, 'keyLocation': f'https://{HOTE}/{k}.txt', 'urlList': urls}).encode()
    requete = urllib.request.Request('https://api.indexnow.org/indexnow', data=corps,
                                     headers={'Content-Type': 'application/json; charset=utf-8'}, method='POST')
    try:
        with urllib.request.urlopen(requete, timeout=30) as r:
            print(f'IndexNow : {r.status} pour {len(urls)} adresse(s)')
    except urllib.error.HTTPError as e:
        # 200 et 202 : reçu. 403 : la clé n'est pas encore en ligne. 422 : une adresse hors du domaine.
        sys.exit(f'IndexNow a refusé : {e.code} {e.reason}')


if __name__ == '__main__':
    main()
