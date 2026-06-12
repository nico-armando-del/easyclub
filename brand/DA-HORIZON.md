# EasyClub — DA alternative « Horizon » (exploration 2026)

Piste alternative à « Studio », pensée pour durer dans les années à venir. Référence d'esthétique : Payfit, Pennylane, Linear. Sobre mais designé, chaleureux mais premium. Image de renouveau : on ne ressemble pas à une banque, on ressemble à l'outil que les assos méritent en 2026.

## 1. L'intention

Studio dit « confiance bancaire ». Horizon dit « respiration ». La cible voit un produit qui va lui simplifier la vie avant même de lire une ligne. Moins de marine institutionnel, plus de lumière, une typo qui a du caractère, et le vert qui reste la signature de l'argent encaissé.

## 2. Palette

| Rôle | Nom | Hex |
|---|---|---|
| Fond principal (remplace le blanc pur) | Crème | #FAFAF7 |
| Texte et fonds sombres | Encre | #0E1116 |
| Signature, argent encaissé, CTA | Menthe | #3DDC97 |
| Menthe foncée (texte sur fond menthe clair) | Sapin | #0F6B47 |
| Accent secondaire discret (tags, illustrations) | Lavande | #C9C4F2 |
| Surfaces et cartes | Blanc | #FFFFFF |
| Texte secondaire | Gris chaud | #6E6E66 |
| Bordures | Sable | #E8E6DE |

Changements clés vs Studio : le bleu disparaît, le vert monte au rang de couleur d'action (CTA inclus), le fond devient crème chaud au lieu de gris froid, l'encre presque noire remplace le marine.

## 3. Typographies

Duo tout en grotesque, pas de serif, jamais d'italique. C'est la signature 2026 des produits qui veulent paraître nets et modernes.

* **Logo, titres et display : Bricolage Grotesque** (Google Fonts, gratuite). Graisse 600 pour les gros titres, 500 pour les H2/H3. Du caractère dans les lettres, c'est elle qui porte la personnalité de la marque. Exemple : « Ne chassez plus les mauvais payeurs. »
* **Texte courant et UI : Satoshi** (Fontshare, gratuite). Graisse 400 pour le corps, 500 pour les emphases. Grotesque géométrique propre, très lisible aux petites tailles. Poppins en secours si Satoshi indisponible.
* **Chiffres, prix et montants : Satoshi 600 en chiffres tabulaires** (font-feature tnum). Un montant doit être net et solide, lisible d'un coup d'œil. Les colonnes de prix s'alignent au pixel grâce aux chiffres tabulaires.
* Jamais plus de deux graisses par écran. Jamais d'italique, jamais de serif. L'accent se fait par la taille et le poids de Bricolage, pas par une autre police.

## 4. Principes de design

* Layout bento : les sections du site sont des cartes arrondies (20 à 24px) posées sur le crème, comme des tuiles
* Coins très arrondis, boutons pilule (contrairement à Studio qui était à 8px)
* Ombres ultra douces et diffuses, jamais de bordures dures
* Grands chiffres en display : « 0 € d'impayés » devient un élément graphique à part entière
* Lumière : un glow menthe très diffus peut éclairer un coin de section, jamais plus d'un par écran
* Grain photographique léger sur les fonds sombres
* Pictos en trait fin (Tabler ou Phosphor light)

## 5. Photographie

Base documentaire : la vraie vie des clubs (danse, mais aussi fitness, foot, judo, basket, yoga…), lumière naturelle, moments candides. Jamais de banque d'images américaine figée.

**Colorimétrie signature (le point qui nous rend reconnaissables).** Toutes les photos passent par un étalonnage unique, peu importe la scène, pour former une seule famille visuelle :
* noirs remontés vers l'encre #0E1116 (jamais bouchés), aspect matte
* hautes lumières plafonnées vers le crème #FAFAF7, ambiance claire et aérée
* légère désaturation, surexposition douce assumée
* un soupçon de menthe dans les ombres + un objet menthe discret dans le décor (gourde, tapis, plot, chasuble) pour ancrer la couleur de marque

La recette est codée dans `brand/horizon-grade.py` : `python3 horizon-grade.py *.jpg` pose la signature sur n'importe quelle image. C'est l'équivalent d'un LUT Lightroom commun, comme Payfit ou Alan. Exemples étalonnés dans `brand/img/sport/*-horizon.jpg`.

Génération : modèle Soul (Higgsfield) en 3:2, puis grade Horizon, puis export web WebP/AVIF. Sur les photos d'enfants, vérifier chaque visage ; certaines générations « enfants » sont bloquées (faux positif NSFW), reformuler en « jeunes / ados » si besoin.

## 6. Logo (direction validée)

Le logo est, pour l'instant, un **logotype seul** (pas d'icône). Choix assumé : beaucoup de marques tournent sur un wordmark pur (Linear, Vercel).

* **Wordmark** : « EasyClub » en **Bricolage Grotesque Bold (700)**, encre #0E1116 sur fond clair, crème #FAFAF7 sur fond sombre. Choisie pour son caractère, plus vivante que Space Grotesk tout en restant lisible et sérieuse. Fichiers : `brand/logo/easyclub-wordmark-light.png` et `brand/logo/easyclub-wordmark-dark.png`
* Le wordmark est composé avec la vraie police ; pour le définitif, le vectoriser (texte → tracé) dans Figma
* **Icône parkée** : une piste de badge « ec » (squircle menthe, monogramme entrelacé) existe dans `brand/img/logo-ec/` si un jour il faut un favicon ou une icône d'app, mais elle n'est pas retenue pour l'instant
* Les anciens SVG carrés et la piste « coche dans le C » sont obsolètes

## 7. Ce que ça change pour la promesse

Le vert n'est plus seulement le badge « payé », il devient la couleur que le visiteur suit partout : le CTA est vert, l'argent est vert, la réussite est verte. La règle s'inverse : au lieu de rationner le vert, on lui réserve l'exclusivité de tout ce qui est positif.

## 8. Statut

Exploration. La décision Studio vs Horizon appartient aux trois associés. Critère de choix : Studio rassure davantage les trésoriers de 60 ans, Horizon vieillira mieux et attirera plus facilement l'Espagne et les jeunes bureaux. Les deux partagent le même logo, la migration de l'un à l'autre reste donc possible.
