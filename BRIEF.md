# EasyClub — Brief projet

## Le produit

EasyClub est une plateforme SaaS de gestion d'associations, marché initial : les écoles et clubs de danse. Elle remplace le trio dossier papier, chèques et tableaux Excel par un système tout en ligne.

Fonctionnalités cœur :

* Site vitrine complet (disciplines, professeurs, planning PDF, tarifs, salles avec cartes, FAQ, actualités, événements, pages légales), entièrement éditable par le bureau depuis un éditeur visuel
* Parcours d'inscription en ligne : participants, choix des cours, upload des justificatifs (certificat médical, Pass Sport, Pass 5e), paiement CB, Apple Pay, Google Pay, paiement en 3 fois
* Dashboard admin en 7 sections : inscriptions, cours, liste d'attente, emails groupés, actualités, éditeur de site, paramètres
* Liste d'attente automatique : notification quand une place se libère, expiration 48h, la place passe au suivant
* Gestion par saison avec duplication des cours en un clic
* Emails automatiques : confirmation avec PDF, factures, notifications de place
* Boutique en ligne et billetterie : produits avec variantes taille et couleur, stocks, promos, commandes

## Le positionnement

Hook principal : « Ne chassez plus les mauvais payeurs. »

La promesse : chaque place est payée avant le premier cours. Zéro relance, zéro impayé, la trésorerie est sécurisée dès septembre. Le bénéfice numéro un vendu est le recouvrement, avant le confort et le site.

Concurrent principal en France : HelloAsso (gratuit au pourboire). Réponse : HelloAsso encaisse mais ne fait ni site, ni liste d'attente, ni gestion de saison, ni boutique. EasyClub met le club entier en ligne.

## Le business model : 100 % au pourcentage

Aucun frais fixe, aucun abonnement. Frais bancaires Stripe inclus dans la commission.

* EasyPay : 2,9 % des encaissements. Paiement en ligne, dashboard, factures automatiques. Porte d'entrée
* EasyClub : 4,9 % des encaissements. Tout EasyPay plus le site complet, inscriptions, liste d'attente, saisons. C'est la formule signature à pousser, badge « la plus choisie »
* EasyClub Max : 6,9 % des encaissements (cotisations plus boutique plus billetterie). Tout EasyClub plus boutique et billetterie

Garde-fous : minimum de facturation 590 €/saison. Le paiement en 3 fois (Alma ou équivalent) coûte 3 à 4 %, soit marge sacrifiée soit 1 point refacturé à la famille au checkout.

Argument de vente : « EasyClub est gratuit. On prend 4,9 % sur ce qu'on vous aide à encaisser, frais bancaires inclus. Si on ne vous fait pas gagner d'argent, on n'en gagne pas non plus. »

## La société

* Forme : SAS en France
* Équipe : un CEO (Président), Nico en CTO (Directeur Général), un troisième associé. Répartition 45 / 45 / 10
* Pacte d'associés obligatoire dès le jour 1 : vesting 4 ans avec cliff 1 an, clause anti-deadlock pour le 45/45, préemption, good leaver / bad leaver
* Marchés et langues : France d'abord, puis Espagne. Produit en 3 langues dès le départ : français, espagnol, anglais. i18n dans le code dès le jour 1 (textes, emails, factures, devises)
* Domaine : easyclub.app ou geteasyclub.com avec /fr, /es, /en

## Marketing

* Fenêtre de tir : les assos choisissent leurs outils de mai à août pour la rentrée de septembre
* Canaux : outbound par email aux trésoriers via les annuaires de fédérations, Google Ads sur les requêtes « logiciel inscription association » et « gestion club de danse », parrainage entre clubs (une saison offerte), un club vitrine comme cas client chiffré

## La direction artistique : « Studio » (validée)

Fintech, sobre, rassurante. Choix délibéré : la cible décisionnaire est le bureau et le trésorier de l'association, la DA doit inspirer confiance au moment où ils confient l'argent du club. Plus conventionnel que la piste « Tempo » (écartée), assumé.

* Palette : marine #0B1F3A, bleu électrique #2E6BE6 (CTA), vert encaissé #34C794 (succès, paiements validés), gris clair #F4F6FA
* Typographies : titres en General Sans ou Geist, texte en Inter
* Boutons : pleins bleu électrique, coins arrondis 8px (pas de pilule, registre sérieux)
* Ton : clair, factuel, rassurant. On parle chiffres et tranquillité au bureau, simplicité aux familles
* Le vert #34C794 est réservé à l'argent encaissé et aux confirmations, c'est la couleur de la promesse tenue
* Le logo : le mot EasyClub, propre et géométrique, dans cette palette

## Ce qu'il reste à faire (backlog)

1. Mini brandbook Tempo : palette complète avec déclinaisons claires et foncées, typo définitive, pistes de logo, règles d'usage (boutons, badges, photos)
2. Landing page EasyClub avec les 3 formules au pourcentage et le hook recouvrement, préparée pour fr / es / en
3. One-pager de vente PDF pour les rendez vous avec les clubs
4. Email d'outbound type pour les trésoriers (envoi en juin, angle rentrée de septembre)
5. Vérifier la disponibilité des domaines et du nom (INPI, réseaux sociaux)
6. Choisir le prestataire de paiement en 3 fois (Alma vs échéancier Stripe maison) : Alma transfère le risque d'impayé au prestataire, le club est payé à 100 % le jour 1
7. Statuts SAS et pacte d'associés (avocat ou Legalstart, budget 1 500 à 3 000 €)
8. Argumentaire anti-HelloAsso documenté

## Règles de travail

* Conversation en français, pas de tirets dans les phrases ni dans les listes
* La formule du milieu (EasyClub) est toujours celle qu'on met en avant
* Toute promesse marketing sur le « zéro impayé » dépend du choix Alma vs Stripe maison, vérifier avant d'écrire
