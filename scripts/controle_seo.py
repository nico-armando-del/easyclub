#!/usr/bin/env python3
"""LE CONTRÔLE SEO BLOQUANT du site OnClub (bibliothèque standard seule).

Lancé par « npm run build » juste après « astro build », sur dist/ :
    python3 scripts/controle_seo.py dist
Code de sortie 1 au premier défaut trouvé (tous les défauts sont listés) :
le build échoue, rien ne part en ligne.

Ce qui est vérifié, page par page :
  - title 30 à 65 caractères, description 110 à 160, aucun doublon ;
  - un seul h1, pas de saut de niveau de titre ;
  - canonical = adresse de la page ; Open Graph et Twitter complets ;
  - hreflang réciproques quand il y en a ;
  - fil d'Ariane visible ET balisé (BreadcrumbList) sur toute page de niveau 2 ;
  - FAQ visible identique à son JSON-LD (questions et réponses entières) ;
  - liens internes : aucun lien cassé, aucune ancre absente ; au moins 5 liens
    sortants vers d'autres pages ; chaque page reçoit au moins 3 liens ;
  - images : alt, dimensions, poids ; aucune police tierce ;
  - mots interdits dans le texte visible ;
  - taux de commission identiques partout (2,90 / 4,90 / 6,90 %) ;
  - le sitemap contient chaque page publique et rien d'autre ; robots.txt ; llms.txt ;
  - le calculateur de l'accueil redonne 66 h → 5 h pour 250 adhérents.
Les pages anciennes gardées telles quelles (presentation, en, es) ne passent
que les contrôles de structure (sitemap, canonical, liens, mots interdits).
"""
import json, os, re, sys, html
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

ROOT = sys.argv[1] if len(sys.argv) > 1 else "dist"
BASE = "https://onclub.app"
NOINDEX_ATTENDU = {"404.html"}
ANCIENNES = {"presentation.html", "en.html", "es.html"}
MOTS_INTERDITS = [
    r"logiciel", r"torcy", r"frais bancaires inclus", r"relances? automatiques?",
    r"pr[ée]l[èe]vements? automatiques?", r"trouver un club", r"trouvez votre club",
]
TAUX_AUTORISES = {"2,90", "4,90", "6,90"}
# Adresses du site d'avant qui doivent exister avant la mise en ligne : un avertissement tant qu'elles manquent.
HERITEES = ["/sport/" + s for s in ("football", "danse", "judo", "basket", "yoga", "fitness", "volley", "handball", "tennis")]
BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
        "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "Googlebot"]
ERR, AVERT = [], []
# Les redirections déclarées dans vercel.json sont des adresses valides (ex. /blog → /ressources).
_vj = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "vercel.json")
REDIRIGEES = {r["source"] for r in json.load(open(_vj, encoding="utf-8")).get("redirects", []) if "has" not in r} if os.path.isfile(_vj) else set()


def err(page, code, msg):
    ERR.append((page, code, msg))


def norm(s):
    return re.sub(r"\s+", " ", html.unescape(s).replace(" ", " ").replace(" ", " ")).strip()


class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.t = ""; s.it = False; s.meta = []; s.links = []; s.ld = []; s.inld = False; s.buf = ""
        s.imgs = []; s.a = []; s.h = []; s.ids = set(); s.lang = None; s.scripts = []; s.text = []; s.skip = 0
        s.fil = False; s.styles = []; s.instyle = False
    def handle_starttag(s, t, a):
        a = dict(a)
        if a.get("id"): s.ids.add(a["id"])
        if t == "html": s.lang = a.get("lang")
        if t == "title": s.it = True
        if t == "meta": s.meta.append(a)
        if t == "link": s.links.append(a)
        if t == "nav" and "fil" in (a.get("class") or "").split(): s.fil = True
        if t == "script":
            if a.get("type") == "application/ld+json": s.inld = True; s.buf = ""
            else:
                s.skip += 1
                if a.get("src"): s.scripts.append(a["src"])
        if t == "style": s.skip += 1; s.instyle = True
        if t == "svg": s.skip += 1
        if t == "img": s.imgs.append(a)
        if t == "a" and a.get("href"): s.a.append(a["href"])
        if re.fullmatch(r"h[1-6]", t) and s.skip <= 0: s.h.append(int(t[1]))
    def handle_endtag(s, t):
        if t == "title": s.it = False
        if t == "script":
            if s.inld: s.inld = False; s.ld.append(s.buf)
            else: s.skip -= 1
        if t == "style": s.skip -= 1; s.instyle = False
        if t == "svg": s.skip -= 1
    def handle_data(s, d):
        if s.it: s.t += d
        elif s.inld: s.buf += d
        elif s.instyle: s.styles.append(d)
        elif s.skip <= 0: s.text.append(d)


def url_of(rel):
    p = rel[:-5]
    return BASE + "/" if p == "index" else BASE + "/" + p


def file_of(u):
    path = urlparse(u).path.strip("/") or "index"
    for c in (path + ".html", path + "/index.html", path):
        if os.path.isfile(os.path.join(ROOT, c)): return c
    return None


pages = {}
for d, _, fs in os.walk(ROOT):
    for f in fs:
        if f.endswith(".html"):
            rel = os.path.relpath(os.path.join(d, f), ROOT)
            p = P(); p.feed(open(os.path.join(ROOT, rel), encoding="utf-8").read()); pages[rel] = p

# --- sitemap
sm = ET.parse(os.path.join(ROOT, "sitemap.xml")).getroot()
ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
smap = {u.find("s:loc", ns).text: u.find("s:lastmod", ns).text for u in sm.findall("s:url", ns)}
for u in smap:
    if not file_of(u): err("sitemap.xml", "SITEMAP", f"{u} n'existe pas")

titles, descs, faits = {}, {}, {}
entrants = {}  # page -> pages qui la citent
for rel, p in sorted(pages.items()):
    m = lambda k, v: [x.get("content") for x in p.meta if x.get(k) == v]
    noindex = "noindex" in " ".join(m("name", "robots"))
    url = url_of(rel)
    texte = norm(" ".join(p.text))
    # mots interdits : partout, anciennes pages comprises
    for mot in MOTS_INTERDITS:
        r = re.search(mot, texte, re.I)
        if r: err(rel, "MOT_INTERDIT", f"« {texte[max(0, r.start() - 30):r.end() + 30]} »")
    # liens internes (sortants), ancres, scripts locaux
    sortants = set()
    for h in p.a + p.scripts:
        u = urljoin(url, h)
        pu = urlparse(u)
        if pu.netloc != "onclub.app": continue
        if pu.path.startswith("/_vercel/") or pu.path.startswith("/api/"): continue
        f = file_of(u.split("#")[0].split("?")[0])
        if not f and pu.path in REDIRIGEES: continue
        if not f and rel in ANCIENNES and pu.path in HERITEES: continue  # signalé plus bas en avertissement
        if not f: err(rel, "LIEN_404", h); continue
        if pu.fragment and f in pages and pu.fragment not in pages[f].ids: err(rel, "ANCRE", h)
        if f.endswith(".html") and f != rel and h in p.a:
            sortants.add(f); entrants.setdefault(f, set()).add(rel)
    if rel in NOINDEX_ATTENDU:
        if not noindex: err(rel, "NOINDEX", "page privée sans noindex")
        if url in smap: err(rel, "SITEMAP", "page noindex présente dans le sitemap")
        continue
    if noindex: err(rel, "NOINDEX", "page publique en noindex")
    if url not in smap: err(rel, "SITEMAP", f"{url} absente du sitemap")
    can = [x.get("href") for x in p.links if x.get("rel") == "canonical"]
    if can != [url]: err(rel, "CANONICAL", f"{can} != {url}")
    hl = {x.get("hreflang"): x.get("href") for x in p.links if x.get("rel") == "alternate" and x.get("hreflang")}
    if hl:
        if hl.get(p.lang) != url: err(rel, "HREFLANG", "pas d'auto-référence")
        if "x-default" not in hl: err(rel, "HREFLANG", "x-default absent")
        for lg, h in hl.items():
            f = file_of(h)
            if not f: err(rel, "HREFLANG", f"{h} introuvable"); continue
            back = {x.get("hreflang"): x.get("href") for x in pages[f].links if x.get("rel") == "alternate" and x.get("hreflang")}
            if back != hl: err(rel, "HREFLANG", f"non réciproque avec {h}")
    if rel in ANCIENNES:
        continue
    # --- contrôles complets : les pages du nouveau site
    t = p.t.strip()
    if not 30 <= len(t) <= 65: err(rel, "TITLE_LEN", f"{len(t)} car. : {t[:70]}")
    titles.setdefault(t, []).append(rel)
    d = (m("name", "description") or [""])[0]
    if not 110 <= len(d) <= 160: err(rel, "DESC_LEN", f"{len(d)} car. : {d[:60]}")
    if d.rstrip().endswith(("…", "...")): err(rel, "DESC_TRONQUEE", "description terminée par une ellipse")
    descs.setdefault(d, []).append(rel)
    og = {x.get("property"): x.get("content") for x in p.meta if (x.get("property") or "").startswith("og:")}
    for k in ("og:title", "og:description", "og:url", "og:image", "og:image:alt", "og:locale", "og:type", "og:site_name"):
        if not og.get(k): err(rel, "OG", f"{k} absent")
    if og.get("og:url") and og["og:url"] != url: err(rel, "OG", "og:url != canonical")
    for k in ("twitter:card", "twitter:title", "twitter:description", "twitter:image"):
        if not m("name", k): err(rel, "TWITTER", f"{k} absent")
    if p.h.count(1) != 1: err(rel, "H1", f"{p.h.count(1)} h1")
    for a, b in zip(p.h, p.h[1:]):
        if b > a + 1: err(rel, "TITRES", f"saut h{a} -> h{b}"); break
    for i in p.imgs:
        src = i.get("src", "")
        if "alt" not in i: err(rel, "ALT", f"{src} sans alt")
        if not (i.get("width") and i.get("height")): err(rel, "IMG_DIM", f"{src} sans width/height")
        if src.startswith(("http", "data:")): continue
        fp = os.path.join(ROOT, urljoin("/" + rel, src).lstrip("/"))
        if not os.path.isfile(fp): err(rel, "IMG_404", src); continue
        if os.path.getsize(fp) > 120_000: err(rel, "IMG_POIDS", f"{src} {os.path.getsize(fp)//1024} Ko")
    for x in p.links:
        if re.search(r"fonts\.(googleapis|gstatic)|fontshare|typekit", x.get("href", "")): err(rel, "POLICE_TIERCE", x["href"][:60])
    for st in p.styles:
        if re.search(r"fonts\.(googleapis|gstatic)|@import\s+url\(\s*['\"]?https?:", st): err(rel, "POLICE_TIERCE", "@import ou police distante dans un style")
    if len(sortants) < 5: err(rel, "LIENS_SORTANTS", f"{len(sortants)} liens internes vers d'autres pages (5 au moins)")
    # JSON-LD
    graphe = []
    for b in p.ld:
        try: j = json.loads(b)
        except Exception as e: err(rel, "LD_JSON", str(e)); continue
        graphe += j.get("@graph", [j]) if isinstance(j, dict) else j
    types = [n.get("@type") for n in graphe]
    for n in graphe:
        ty = n.get("@type")
        if ty == "FAQPage":
            for q in n.get("mainEntity", []):
                if norm(q["name"]) not in texte: err(rel, "LD_FAQ", f"question invisible : {q['name'][:50]}")
                if norm(q["acceptedAnswer"]["text"]) not in texte: err(rel, "LD_FAQ", f"réponse différente de la FAQ visible : {q['name'][:50]}")
        if ty == "BlogPosting":
            for k in ("headline", "datePublished", "dateModified", "author", "image", "mainEntityOfPage"):
                if not n.get(k): err(rel, "LD_ARTICLE", f"{k} absent")
            if n.get("mainEntityOfPage") not in (url, {"@id": url}): err(rel, "LD_ARTICLE", "mainEntityOfPage != canonical")
        if ty == "BreadcrumbList":
            it = n.get("itemListElement", [])
            if [x.get("position") for x in it] != list(range(1, len(it) + 1)): err(rel, "LD_FIL", "positions")
            if it and it[-1].get("item") != url: err(rel, "LD_FIL", "dernier élément != canonical")
            if not p.fil: err(rel, "FIL_VISIBLE", "fil d'Ariane balisé mais pas affiché")
    if "Organization" not in types or "WebSite" not in types: err(rel, "LD_ORG", "Organization ou WebSite absent")
    if "/" in rel and "BreadcrumbList" not in types: err(rel, "LD_FIL", "page de niveau 2 sans fil d'Ariane balisé")
    if p.fil and "BreadcrumbList" not in types: err(rel, "LD_FIL", "fil d'Ariane visible mais pas balisé")
    for taux in re.findall(r"(\d[,.]\d0)\s?%", texte): faits.setdefault(taux.replace(".", ","), set()).add(rel)

# chaque page publique reçoit au moins 3 liens d'autres pages
for rel in pages:
    if rel in NOINDEX_ATTENDU or rel in ANCIENNES: continue
    n = len(entrants.get(rel, set()) - {rel})
    if n < 3: err(rel, "LIENS_ENTRANTS", f"{n} pages la citent (3 au moins)")

for t, r in titles.items():
    if len(r) > 1: err(",".join(r), "TITLE_DOUBLON", t[:60])
for d, r in descs.items():
    if len(r) > 1: err(",".join(r), "DESC_DOUBLON", d[:60])
for taux, r in faits.items():
    if taux not in TAUX_AUTORISES: err(",".join(sorted(r))[:120], "TAUX", f"taux {taux} % inconnu (autorisés : {sorted(TAUX_AUTORISES)})")

# robots.txt / llms.txt
rb = open(os.path.join(ROOT, "robots.txt"), encoding="utf-8").read()
if "Sitemap: https://onclub.app/sitemap.xml" not in rb: err("robots.txt", "ROBOTS", "ligne Sitemap absente")
for bloc in re.split(r"(?im)^user-agent:", rb)[1:]:
    agents = bloc.splitlines()[0].strip()
    if re.search(r"(?im)^disallow:\s*/\s*$", bloc) and (agents == "*" or any(b.lower() in agents.lower() for b in BOTS)):
        err("robots.txt", "ROBOTS", f"{agents} bloqué")
ll = open(os.path.join(ROOT, "llms.txt"), encoding="utf-8").read()
for u in re.findall(r"https://onclub\.app[^\s)]*", ll):
    if u not in smap: err("llms.txt", "LLMS", f"{u} hors sitemap")
for u in smap:
    if urlparse(u).path not in ("/en", "/es") and u not in ll: err("llms.txt", "LLMS", f"{u} absente de llms.txt")
for taux in re.findall(r"(\d,\d0)\s?%", ll):
    if taux not in TAUX_AUTORISES: err("llms.txt", "TAUX", f"taux {taux} % inconnu")
for mot in MOTS_INTERDITS:
    if re.search(mot, ll, re.I): err("llms.txt", "MOT_INTERDIT", mot)

# le calculateur de l'accueil : 66 h → 5 h pour 250 adhérents
acc = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
mc = re.search(r'data-calculateur="([^"]+)"', acc)
if not mc: err("index.html", "CALCULATEUR", "calculateur absent de l'accueil")
else:
    taches = json.loads(html.unescape(mc.group(1)))
    av, ap = sum(t["avant"] for t in taches), sum(t["apres"] for t in taches)
    if (round(av / 60), round(ap / 60)) != (66, 5): err("index.html", "CALCULATEUR", f"{round(av/60)} h → {round(ap/60)} h au lieu de 66 h → 5 h")

for chemin in HERITEES:
    if not file_of(BASE + chemin): AVERT.append(f"{chemin} : adresse du site actuel pas encore réécrite (à faire avant la mise en ligne)")

print(f"contrôle SEO : {len(pages)} pages, {len(smap)} adresses au sitemap, {len(ERR)} défaut(s)")
for e in sorted(ERR, key=lambda x: (x[1], x[0])):
    print(f"  [{e[1]}] {e[0]} : {e[2]}")
for a in AVERT:
    print(f"  (avertissement) {a}")
print("  taux cités :", {k: len(v) for k, v in sorted(faits.items())})
sys.exit(1 if ERR else 0)
