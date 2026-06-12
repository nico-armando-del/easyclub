# EasyClub — Brandbook « Studio »

Direction artistique validée : fintech, sobre, rassurante. La marque doit inspirer confiance au trésorier qui confie l'argent du club, tout en restant simple pour les familles.

## 1. Palette

### Couleurs de marque

| Rôle | Nom | Hex |
|---|---|---|
| Fond sombre, hero, footer, admin | Marine 900 | #061325 |
| Couleur principale de marque | Marine 700 | #0B1F3A |
| Marine intermédiaire (cartes sur fond sombre) | Marine 500 | #16325C |
| Action principale (boutons, liens) | Bleu 500 | #2E6BE6 |
| Hover des actions | Bleu 600 | #2456C2 |
| Fond bleu clair (badges, surlignage) | Bleu 50 | #E3ECFC |
| Argent encaissé, succès, confirmations | Vert 500 | #34C794 |
| Texte sur fond vert clair | Vert 700 | #1E8A66 |
| Fond vert clair (badges payé) | Vert 50 | #E0F7EE |

### Neutres

| Rôle | Hex |
|---|---|
| Fond de page | #F4F6FA |
| Bordures, séparateurs | #E2E7EF |
| Texte secondaire | #8A93A6 |
| Texte courant | #1C2533 |
| Blanc des cartes | #FFFFFF |

### Sémantiques

| Rôle | Hex |
|---|---|
| Attention (échéance proche, dossier incomplet) | #F2A93B |
| Erreur (paiement en échec) | #E25555 |

### Règle d'or du vert

Le vert #34C794 est réservé à une seule chose : l'argent encaissé et les confirmations. Jamais en décoration. Chaque fois qu'un client voit du vert, c'est la promesse « ne chassez plus les mauvais payeurs » tenue. C'est le tic visuel de la marque.

## 2. Typographies

* Titres : Geist (gratuite, vercel.com/font), graisse 600 pour les H1 et H2, 500 pour les H3
* Texte courant : Inter (Google Fonts), graisse 400, 500 pour les emphases
* Chiffres et montants : Geist avec chiffres tabulaires (font-feature tnum) pour que les colonnes de montants s'alignent dans le dashboard
* Alternative aux titres si Geist ne convient pas : General Sans (Fontshare, gratuite)
* Jamais plus de deux graisses par écran. Pas d'italique sauf citations

## 3. Composants

* Bouton principal : fond #2E6BE6, texte blanc, coins 8px, padding 12px 24px. Hover #2456C2. Pas de pilule, le registre est sérieux
* Bouton secondaire : fond transparent, bordure 1px #E2E7EF, texte #1C2533
* Badge « payé » : fond #E0F7EE, texte #1E8A66
* Badge « en attente » : fond #FDF3E3, texte #9A6B14
* Badge « échec » : fond #FCE9E9, texte #B03A3A
* Cartes : fond blanc, bordure 1px #E2E7EF, coins 12px, ombre interdite ou quasi nulle
* Les montants en gros : sur le dashboard, le chiffre encaissé est l'élément le plus visible de l'écran, en Geist 600

## 4. Imagerie

* Photos réelles des clubs (cours, spectacles) plutôt que banques d'images, traitées sans filtre criard
* Sur fond marine, les photos passent en cartes arrondies avec bordure fine
* Illustrations : éviter le style cartoon 3D type startup, préférer des captures produit réelles. La meilleure image de marque est le dashboard lui-même

## 5. Ton de voix

* Clair, factuel, rassurant. On annonce des chiffres et des garanties, pas des promesses vagues
* Côté bureau : « 100 % des cotisations encaissées avant le premier cours »
* Côté familles : simple et accueillant, sans jargon bancaire
* Interdits : superlatifs creux (révolutionnaire, incroyable), points d'exclamation en rafale, tutoiement côté trésoriers

## 6. Logo (direction validée)

* **Wordmark** : EasyClub en sans-serif géométrique marine #0B1F3A, avec la coche verte #34C794 intégrée dans le C de Club. Référence : `brand/img/logo-explorations/logo-a4.png`
* **Icône seule** : le C marine avec la coche verte qui en déborde. Référence : `brand/img/logo-explorations/icon-4.png`. Usages : favicon, icône d'app, avatars réseaux, coin des gabarits sociaux
* Les références ci-dessus sont des images IA en pixels. Le fichier final doit être redessiné en vectoriel dans Figma ou Illustrator à partir de ces références avant tout dépôt ou impression
* Sur fond marine : wordmark en blanc, la coche reste verte
* Zone de protection : la hauteur du E autour du logo. Taille minimale 24px de haut pour le wordmark, l'icône seule descend à 16px
* Les anciens SVG (`brand/logo/easyclub-logo*.svg`, glyphe carré) sont obsolètes, remplacés par cette direction

## 7. Déclinaison i18n

La DA est identique sur les trois marchés (fr, es, en). Seuls les textes changent. Prévoir 30 % de marge de largeur sur les boutons et titres, l'espagnol et le français sont plus longs que l'anglais.
