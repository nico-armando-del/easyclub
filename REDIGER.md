# Rédiger une page du site OnClub

Ce guide est pour les rédacteurs. Une page = **un fichier `.mdx`** dans `src/content/<collection>/`. Le menu, les hubs (/fonctionnalites, /pour-qui, /ressources), le pied de page, le sitemap, `llms.txt`, les « Voir aussi » et le maillage croisé se construisent **tout seuls** à partir de ces fichiers. **Vous n'avez aucun fichier commun à toucher.**

Branche : `refonte`. Jamais de push, de merge vers `main` ni de déploiement.

## 1. Construire et vérifier

```sh
export PATH=/opt/homebrew/opt/node@22/bin:$PATH   # Astro 7 exige Node 22
npm run dev            # http://localhost:4321, rechargement à chaque sauvegarde
npm run build          # build + contrôle SEO + ressemblance : DOIT finir sans défaut
```

`npm run build` échoue au premier défaut (titre trop long, lien cassé, FAQ différente de son JSON-LD, mot interdit, page trop ressemblante…). Lisez le message, corrigez, relancez. Pour voir une page contre toutes les autres : `python3 scripts/ressemblance.py dist sport/judo`.

## 2. Les adresses

| Collection | Dossier | Adresse | Exemple complet à copier |
|---|---|---|---|
| Fonctionnalités | `src/content/fonctionnalites/` | `/fonctionnalites/<fichier>` | `inscription-en-ligne.mdx` |
| Sports | `src/content/sports/` | `/sport/<fichier>` | `football.mdx` |
| Autres activités | `src/content/activites/` | `/activites/<fichier>` | `ecole-de-musique.mdx` |
| Profils (rôles) | `src/content/profils/` | `/pour/<fichier>` | `tresorier.mdx` |
| Comparatifs | `src/content/comparatifs/` | `/comparatif/<fichier>` | `tableur-excel.mdx` |
| Guides | `src/content/guides/` | `/guides/<fichier>` | `pass-sport.mdx` |
| Articles | `src/content/articles/` | `/articles/<fichier>` | `soirees-du-tresorier.mdx` |

Le nom du fichier est l'adresse : minuscules, sans accents, tirets (`ecole-de-danse.mdx`).
**À garder absolument** (adresses du site actuel) : `sports/` doit contenir `football`, `danse`, `judo`, `basket`, `yoga`, `fitness`, `volley`, `handball`, `tennis`. Le contrôle affiche un avertissement tant qu'une manque. Source des pages actuelles : `ancien/site/sport/<nom>.html` (à réécrire, pas à recopier).

Les **23 fichiers de `fonctionnalites/`** sont des ébauches : gardez le fichier, son adresse, son `nom` et sa `ligne`, complétez le reste.

## 3. Le frontmatter, collection par collection

Tous les champs sont vérifiés au build (schéma Zod, `src/content.config.ts`). Un champ manquant ou trop long arrête le build avec son nom.

### Champs communs à toutes les pages

```yaml
titreSeo: "Le besoin d'abord, 30 à 65 caractères | OnClub"
description: "110 à 160 caractères. Ce que la page apporte, la recherche à laquelle elle répond, sans ellipse finale."
titre: "Le h1 de la page (8 à 90 caractères)"
chapo: "Une ou deux phrases sous le h1 (40 à 320 caractères) : le problème, puis ce qui change."
temps:                       # OBLIGATOIRE : le bloc « temps gagné » en tête de page
  cles: [fiches, relances]   # des clés de src/data/temps.ts (1 à 5)…
  titre: "Titre du bloc (facultatif)"
# … ou, quand aucun chiffre n'existe pour ce sujet :
# temps:
#   geste: "La famille répond depuis le mail, en un clic."
ecran: inscription           # facultatif : inscription | reinscription | relance | site | boutique | terrain | cluby
maj: 2026-10-09              # date de la dernière mise à jour du contenu
faq:                         # facultatif, 8 au plus ; affichée ET balisée en JSON-LD
  - question: "10 à 160 caractères, une vraie question"
    reponse: "30 à 700 caractères."
sources:                     # obligatoire pour tout fait extérieur (fédération, loi, prix d'un concurrent)
  - titre: "Nom de la page source"
    url: "https://…"
    consulte: "2026-10-09"
# Liens croisés (facultatifs) : les liens inverses se calculent tout seuls.
fonctionnalites: [inscription-en-ligne, convocations]
sports: [football]
activites: [ecole-de-musique]
profils: [tresorier]
guides: [pass-sport]
comparatifs: [tableur-excel]
articles: [soirees-du-tresorier]
brouillon: false             # true : la page n'est pas construite
```

Les clés de `temps.cles` : `fiches` (25 h → 0 h), `paiements` (12 h 30 → 1 h), `relances` (10 h → 40 min), `pieces` (6 h 40 → 1 h 30), `rentree` (12 h → 2 h), `messages`, `attente`, `site`, `boutique`, `evenements`. Le chiffre, le calcul et l'hypothèse s'affichent ensemble : **vous ne tapez jamais un chiffre de temps**.

### Fonctionnalité (`fonctionnalites/`)

```yaml
nom: "Inscription en ligne"     # 2 ou 3 mots, c'est la tuile
ligne: "25 h de saisie en moins par saison"   # à quoi ça sert / le temps gagné, 70 caractères au plus
famille: Inscrire               # Inscrire | Encaisser | Organiser | Communiquer | Vendre | Piloter
offre: mini                     # mini | pro | max : l'offre la plus basse qui l'ouvre
ordre: 1                        # ordre dans sa famille
# + les champs communs
```

`offre` se vérifie dans le produit : `/Users/bertone/Dev/onclub/lib/entitlements/index.ts` (FORMULE_MINIMALE). Il alimente le tableau de /tarifs.

### Sport (`sports/`), autre activité (`activites/`), profil (`profils/`)

```yaml
nom: "Football"                 # 3 à 40 caractères, le nom court du menu
ligne: "De l'école de foot aux seniors, la rentrée se fait en ligne"   # 12 à 90 caractères, pour les cartes
ordre: 1
# + les champs communs
```

### Comparatif (`comparatifs/`)

```yaml
nom: "OnClub ou un tableur"
ligne: "Ce que le tableur coûte en soirées, ligne par ligne"
# + les champs communs
```

### Guide (`guides/`) et article (`articles/`)

```yaml
nom: "Pass'Sport 2026-2027"     # 3 à 60 caractères
ligne: "Qui y a droit, comment le déduire"   # 12 à 120 caractères
publie: 2026-10-09
lecture: 5                      # minutes de lecture affichées
rubrique: "Cotisations"         # ARTICLES SEULEMENT, 3 à 30 caractères
# + les champs communs
```

## 4. L'ordre d'une page (imposé par le gabarit)

Fil d'Ariane → h1 + chapô → **bloc temps** (champ `temps`) → écran animé (champ `ecran`) → votre texte → sources → FAQ → Voir aussi → **appel démo**. Le bloc temps en tête et l'appel démo en fin sont automatiques : ne les réécrivez pas.

## 5. Les composants dans le texte

Utilisables directement dans le `.mdx`, sans `import` :

```mdx
<BlocTemps cles={['fiches', 'pieces']} titre="Le temps rendu s'additionne" />
<BlocTemps geste="Le parent répond présent depuis le mail, sans compte." />

<EcranAnime nom="relance" legende="Le tableau de l'argent, données fictives." />

<Encadre titre="À retenir">
Une pièce manquante n'empêche ni l'inscription ni le paiement.
</Encadre>

<TuileFonction nom="Relance d'un clic" ligne="10 h de relances ramenées à 40 min" href="/fonctionnalites/relance-un-clic" offre="mini" />

<Calculateur />
```

Écrans animés disponibles (repris de /presentation, données fictives, étiquette « Exemple ») : `inscription`, `reinscription`, `relance`, `site`, `boutique`, `terrain`, `cluby`. **Chaque page de fonctionnalité, de sport, d'activité et de profil montre au moins un écran** (champ `ecran` ou `<EcranAnime>`).

## 6. Longueur et forme

- Fonctionnalité : 500 à 900 mots. Sport, activité, profil : 900 à 1 500. Guide, article, comparatif : 1 000 à 2 000.
- Des h2 qui reprennent les vraies recherches (« Inscription club de foot en ligne », « Comment relancer une cotisation impayée »). Jamais de h1 dans le texte : le h1 vient de `titre`.
- Paragraphes courts, listes quand il y a des étapes, une idée par paragraphe.
- **Au moins 5 liens internes** dans la page (les liens croisés du frontmatter en fournissent déjà ; ajoutez des liens dans le texte vers des pages qui existent).
- Une page doit ressembler à moins de 0,35 à toutes les autres (contrôlé au build) : pas de copier-coller d'une page sport à l'autre.
- Espaces : tapez des espaces ordinaires avant « : ; ? ! » ; l'espace insécable est posée au build.

## 7. Les règles de contenu (non négociables)

**Le temps d'abord.** Chaque page répond d'abord à « combien de temps je gagne, et pour faire quoi à la place » (entraîner, répéter, jouer, être en famille). Pas de chiffre de temps hors des clés de `temps.ts` : sinon, le geste (« en un clic », « depuis son téléphone »). Toujours « estimation, pas une étude » (c'est automatique dans le bloc temps).

**Les seuls chiffres autorisés** : 66 h → 5 h par saison, 61 h rendues (250 adhérents) ; le détail des cinq tâches ; 51 / 75 / 97 h selon l'offre ; INJEP 39 % (Analyses & synthèses n° 71, octobre 2023). Pas de gain en euros.

**Les offres** : Mini 2,90 %, Pro 4,90 %, Pro Max IA 6,90 % (+ 2 % sur la boutique) des cotisations encaissées en ligne. Rien de fixe, rien sur les chèques et les espèces. Cluby : pas dans Mini, Pro 100 questions par mois, Pro Max IA sans limite. Boutique et événements : Pro Max IA. Site, liste d'attente, campagnes, saisons : Pro. Les frais de carte sont **à la charge de l'association** (souvent couverts par des frais de dossier inclus dans le prix, pour toutes les familles).

**Mots et promesses interdits** (le build échoue) : « logiciel », « frais bancaires inclus », « relances automatiques », « prélèvement automatique », « Trouver un club » ; le nom d'une association réelle (Torcy ou autre). Interdits aussi : faux témoignage, faux avis, faux client, faux chiffre, enfant identifiable, annuaire de clubs, dénigrement d'un concurrent, « paiement en 10 fois » en accroche. On dit « relancer d'un bouton ».

**Vérifier avant d'écrire.** Une fonctionnalité s'appuie sur `ancien/site/fonctionnalites.html` (faits vérifiés) ou sur le code du produit (`/Users/bertone/Dev/onclub`, en lecture seule). Ce qui n'est pas vérifié ne s'écrit pas. Pour une activité hors sport : le produit connaît, pour chaque cours, la discipline, le niveau, les professeurs, la salle, les créneaux, les places, le tarif, l'essai et les événements ponctuels (stage, gala) — `lib/catalogue/schema.ts`. Le vocabulaire affiché est « Cours / Équipe » (`lib/mots.ts`).

**Faits extérieurs** (fédération, loi, aide, prix d'un concurrent) : dans `sources`, avec la date de consultation.

**Les membres** : pas de « trouver un club ». Un adhérent ou un parent est envoyé vers **/recommander** (« Transmettre à mon club »).

**La démo** : chaque page y mène (automatique en fin de page). Dans le texte, liez `/demo` ; un lien `/demo?type=musique` (sport, musique, danse, theatre, langues, autre) préchoisit le type d'association, `/demo?offre=pro` cite l'offre.

## 8. Le socle (pour mémoire, ne pas modifier sans raison)

- `src/data/site.ts` : taux, offres, contacts, familles, frais de carte, INJEP. `src/data/temps.ts` : les seuls chiffres de temps et le calcul.
- `src/lib/collections.ts` (adresses, menu, Voir aussi), `src/lib/plan.ts` (sitemap, llms.txt).
- `src/components/` : Layout (dans `src/layouts/`), EnTete, PiedDePage, AnimationEntree, BlocTemps, EcranAnime, TuileFonction, Calculateur, Offres, Faq, FilAriane, VoirAussi, AppelDemo, BoutonDemoFixe, Consentement, Encadre, PageCollection, PageLegale, CartesCollection, Sprite.
- **Consentement et ville** : le bandeau (Consentement.astro + `public/js/site.js`) propose Accepter / Refuser à égalité, refus par défaut, choix gardé 180 jours dans le cookie `onclub_consentement`, modifiable par « Cookies et localisation » en pied de page. Seulement après « Accepter », le navigateur appelle `/api/ville` : la fonction Vercel `api/ville.js` (à la racine du dépôt, déployée à côté de `dist/` sans adaptateur) lit `x-vercel-ip-city` et renvoie la ville, sans rien journaliser ni stocker. La ville personnalise trois choses : la phrase `data-ville-phrase` de l'accueil, le champ `data-ville-champ` de /demo, le message de /recommander.
- `astro.config.mjs` : sortie statique, `build.format: 'file'`, espaces insécables posées après le build. `vercel.json` : `cleanUrls`, `trailingSlash: false`, redirections www, `/blog/cotisation-en-plusieurs-fois` → `/articles/…` (308).
- `public/presentation.html`, `public/en.html`, `public/es.html` : anciens fichiers gardés tels quels.
