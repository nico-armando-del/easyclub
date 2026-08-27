# OnClub, roadmap produit

**De zéro au maximum de ce qu'on peut faire pour les clubs.**
Version planning, août 2026. Auteur : Nico (CTO). Source de vérité produit : BRIEF.md.

Principe directeur : on construit dans l'ordre où l'argent rentre. D'abord encaisser (EasyPay), ensuite mettre le club en ligne (OnClub), ensuite vendre plus par club (Max), enfin devenir la plateforme du club (applications avancées). Chaque phase correspond à une formule vendable : on ne code jamais une feature qu'aucune formule ne monétise.

La contrainte de calendrier qui commande tout : **les clubs choisissent leurs outils de mai à août pour la rentrée de septembre**. La fenêtre de vente plein régime, c'est mai à août 2027. Tout le planning remonte depuis cette date.

---

## Vue d'ensemble

| Phase | Quoi | Formule monétisée | Quand | Sortie |
|---|---|---|---|---|
| V0 | Fondations tech + légal | aucune | sept à oct 2026 | socle prêt |
| V1 | MVP encaissement | EasyPay 2,9 % | nov 2026 à janv 2027 | 1er euro encaissé |
| V1.5 | Pilotes réels | EasyPay | févr à avril 2027 | 2 ou 3 clubs pilotes actifs |
| V2 | Formule signature | OnClub 4,9 % | mars à juin 2027 | prêt pour la fenêtre mai-août |
| V3 | Boutique + billetterie | OnClub Max 6,9 % | juil à oct 2027 | Max vendable à la rentrée 2027 |
| V4 | La plateforme du club | upsells + nouvelles lignes | 2028 | booking, trésorerie, mobile, équipes |

---

## V0 — Fondations (sept à oct 2026)

Objectif : tout ce qui coûte 10 fois plus cher à rattraper plus tard.

**Tech**
* Stack et repo : monorepo, app web (Next.js ou équivalent), base Postgres, CI dès le premier commit
* Modèle de données cœur : club, saison, discipline, cours, adhérent, participant, inscription, paiement. La saison est l'unité de vie du club, tout s'y rattache
* i18n dans le code dès le jour 1 : textes, emails, factures, devises (FR, ES, EN). Non négociable, c'est dans le brief
* Stripe Connect : un compte connecté par club, la commission OnClub prélevée automatiquement sur chaque encaissement. C'est le cœur du business model, à valider techniquement avant tout le reste
* Décision paiement en 3 fois : Alma contre échéancier Stripe maison. Alma transfère le risque d'impayé, le club est payé à 100 % le jour 1. Cette décision conditionne la promesse marketing « zéro impayé », elle se prend en V0, pas en V2

**Légal et société**
* Statuts SAS + pacte de fondateurs déjà rédigé (vesting 4 ans cliff 12 mois, sortie de blocage entre deux associés à 50/50, préemption, good/bad leaver)
* Vérification nom OnClub : INPI, domaines (onclub.app ou getonclub.com avec /fr /es /en), réseaux sociaux
* RGPD : registre des traitements, DPA Stripe, mentions et CGU. On gère des données de mineurs (certificats médicaux), le sujet est sérieux dès le jour 1

**Critère de done** : un paiement test traverse Stripe Connect avec commission prélevée, le modèle de données tient les 3 cas types (danse, foot, multi-activités), la SAS est immatriculée.

---

## V1 — MVP EasyPay : encaisser (nov 2026 à janv 2027)

Objectif : un vrai club encaisse une vraie cotisation d'une vraie famille. Rien d'autre.

**Périmètre famille (côté adhérent)**
* Parcours d'inscription en ligne : participants, choix des cours, paiement
* Paiement CB, Apple Pay, Google Pay, paiement en 3 fois
* Upload des justificatifs : certificat médical, Pass Sport, Pass 5e
* Email de confirmation avec récapitulatif PDF et facture

**Périmètre bureau (côté club)**
* Dashboard v1, trois écrans seulement : inscriptions (qui a payé, qui doit), cours (places, remplissage), paramètres (tarifs, saison, compte Stripe)
* Remboursement total ou partiel en deux clics
* Export CSV pour la compta et la fédération

**Ce qu'on ne fait PAS en V1** : éditeur de site, liste d'attente automatique, emails groupés, boutique, billetterie, duplication de saison. Le piège classique du solo builder, c'est de construire la V2 avant d'avoir vendu la V1.

**Critère de done** : je peux inscrire ma fille à un cours de danse dans un club test, payer en 3 fois, recevoir ma facture, et le club voit l'argent arriver moins la commission. Sans intervention manuelle.

---

## V1.5 — Pilotes (févr à avril 2027)

Objectif : 2 ou 3 clubs pilotes nominaux, pas hypothétiques, qui utilisent EasyPay sur des inscriptions de milieu de saison (stages, trimestres, événements) avant le grand test de la rentrée.

* Onboarding club en 1h max, accompagné en visio : création du compte Stripe, saisie des cours, premier lien de paiement partagé
* Liste d'attente v1 manuelle : le bureau voit la file, débloque une place à la main
* Correction de tout ce que les pilotes cassent, c'est le vrai backlog de cette phase
* Cas client chiffré : un club vitrine documenté (heures gagnées, impayés avant/après) pour armer la vente de mai

**Critère de done** : les pilotes recommanderaient OnClub à un autre club (posez leur la question, notez la réponse). Le cas client existe en PDF.

---

## V2 — Formule OnClub : le club en ligne (mars à juin 2027)

Objectif : la formule signature à 4,9 % est complète et démontrable avant la fenêtre de vente mai-août. C'est la phase la plus lourde, elle chevauche volontairement V1.5.

**Site du club**
* Site vitrine complet : disciplines, professeurs, planning PDF, tarifs, salles avec cartes, FAQ, actualités, événements, pages légales
* Éditeur visuel pour le bureau : textes, photos, couleurs du club, sans toucher au code
* Le site du club porte la marque du club, pas la nôtre (c'est l'argument « votre propre plateforme, à votre image »)

**Gestion de saison**
* Duplication de saison en un clic : cours, tarifs, professeurs repartent pour septembre
* Liste d'attente automatique : notification quand une place se libère, expiration 48h, la place passe au suivant
* Emails groupés depuis le dashboard (rentrée, rappels, annulations de cours)

**Dashboard complet, 7 sections** : inscriptions, cours, liste d'attente, emails, actualités, éditeur de site, paramètres.

**Critère de done** : une démo de 15 minutes déroule tout le pitch anti-HelloAsso : « HelloAsso encaisse, nous on met le club entier en ligne ». Un club pilote passe de EasyPay à OnClub et son site est en production.

---

## V3 — Formule Max : boutique et billetterie (juil à oct 2027)

Objectif : monter le panier par club à 6,9 % avec ce qui se vend en plus des cotisations.

* Boutique en ligne : produits avec variantes taille et couleur, stocks, promos, commandes (tenues, justaucorps, écussons, sweats du club)
* Billetterie : galas, spectacles de fin d'année, tournois, places numérotées ou non, contrôle à l'entrée par QR code
* Les paiements boutique et billetterie arrivent au même endroit que les cotisations, un seul dashboard, un seul virement

**Critère de done** : un club vend son gala de décembre 2027 via OnClub Max.

---

## V4 — Le maximum pour les clubs (2028)

La plateforme complète, dans l'ordre de valeur constaté chez les pilotes. Rien ici ne démarre avant traction validée sur V2/V3.

| Application | Ce que ça apporte | Signal pour démarrer |
|---|---|---|
| **Booking de créneaux payants** | Réservation et paiement de terrains, salles, vestiaires. Très pertinent pour le focus foot | 3 clubs le demandent |
| **Avance de trésorerie** | Cash advance sur cotisations à venir, façon Cluber/Kaantera. Le club touche septembre en juin | volume d'encaissement suffisant + partenaire financier |
| **App mobile adhérent** | PWA d'abord, jamais du natif direct : planning perso, notifications de cours annulé, carte de membre | usage mobile > 60 % sur les sites clubs |
| **Équipes et catégories d'âge** | Gestion par équipes, convocations, présences, feuilles de match. Ouvre le multisport foot/hand/basket | premier club de foot > 200 licenciés |
| **Messagerie club** | Canal bureau vers familles et entraîneurs vers équipes, remplace le groupe WhatsApp subi | demandé par les pilotes dès V2, à confirmer |
| **Intégrations compta** | Export vers les outils des experts-comptables d'assos, FEC | demandé par les trésoriers |
| **Marché Espagne** | Lancement commercial ES, le produit est déjà trilingue | France > 50 clubs payants |
| **API publique** | Fédérations, partenaires, sites existants | > 100 clubs actifs |

---

## Transversal, en continu

* **DA Horizon** partout : crème #FAFAF7, encre #0E1116, menthe #3DDC97 réservée à l'argent encaissé et aux confirmations. Bricolage Grotesque pour les titres, Satoshi pour le texte
* **Marketing calé sur la fenêtre** : outbound trésoriers via annuaires de fédérations dès avril 2027, Google Ads sur « logiciel inscription association » et « gestion club » de mai à août, parrainage une saison offerte
* **Qualité** : tests sur les chemins qui ne peuvent pas casser (webhooks Stripe, calcul de commission, inscription, remboursement), Sentry en prod dès V1
* **Support** : le bureau d'une asso est bénévole et pas tech, chaque écran doit se comprendre sans formation

---

## Risques principaux

| # | Risque | Mitigation |
|---|---|---|
| 1 | Rater la fenêtre mai-août 2027, c'est repartir pour un an | V2 gelée fin juin 2027 quoi qu'il arrive, tout ce qui déborde glisse en V3 |
| 2 | Promesse « zéro impayé » non tenable si Stripe maison au lieu d'Alma | décision en V0, le marketing s'écrit après la décision, pas avant |
| 3 | Construire V2 avant d'avoir vendu V1 | règle : pas une ligne de l'éditeur de site tant qu'un club n'a pas payé une commission EasyPay réelle |
| 4 | HelloAsso reste « gratuit » dans la tête des bureaux | argumentaire documenté + cas client chiffré du pilote, on vend le recouvrement, pas le site |
| 5 | Minimum 590 €/saison mal perçu par les petits clubs | le pitch reste « on ne gagne que si vous encaissez », le minimum se présente comme un plancher de sérieux |

---

## Prochain pas concret (cette semaine)

1. Trancher Alma contre Stripe échéancier maison, tout le discours commercial en dépend
2. Vérifier la disponibilité OnClub : INPI, onclub.app, réseaux sociaux
3. Poser le modèle de données sur papier avec les 3 cas types (danse, foot, multi-activités) avant la première ligne de code
