# OnClub, le noyau MVP

## Le principe

**OnClub est une plateforme opérée, pas un logiciel en libre service.**

Le club ne configure rien. Il donne son brief (son formulaire papier actuel, son fichier Excel, sa
grille de tarifs), Nico monte sa configuration, la pousse, et tout fonctionne.

Ça change tout par rapport à un SaaS classique :

* pas de constructeur de formulaire pour le club, pas d'éditeur de site, pas d'onboarding en autonomie
* les outils de configuration sont **pour Nico**, pas pour le club
* le club reçoit un lien d'inscription qui marche, et un dashboard où il suit son argent
* chaque club a un formulaire différent, et c'est normal : le formulaire est une **donnée**, pas du code

C'est plus simple à construire, plus rapide à livrer, et l'accompagnement se facture.

---

## Les trois surfaces à construire

### 1. Le moteur (générique, construit une fois)

Il ne connaît aucun club en particulier. Il sait :

* afficher n'importe quel formulaire à partir d'une configuration
* calculer n'importe quel prix à partir de règles déclarées
* encaisser, facturer, relancer, gérer une liste d'attente
* ouvrir ou fermer des fonctionnalités selon la formule souscrite

### 2. La console opérateur (pour Nico, jamais pour le club)

* créer un club, coller son brief, générer sa configuration
* prévisualiser son formulaire et son calcul de prix avant publication
* connecter son compte Stripe, son domaine d'envoi d'emails, sa marque
* choisir sa formule (EasyPay, OnClub, Max)
* publier, et republier quand le club demande un changement
* voir tous les clubs, leurs encaissements, leur commission, qui approche du minimum

### 3. Ce que voient le club et les familles

* la famille : la fiche d'inscription et son espace « mon dossier »
* le club : le dashboard de recouvrement, en lecture et en action, sans aucun réglage

---

## La configuration club, le cœur du système

C'est le fichier qui décrit un club. Tout le produit en découle.

| Bloc | Contenu |
|---|---|
| Identité | nom, logo, couleurs, langue, devise, sous domaine |
| Formule | EasyPay, OnClub ou Max, et les droits qui en découlent |
| Paiement | compte Stripe connecté, taux de commission, moyens acceptés |
| Emails | domaine d'envoi, adresse de réponse, marque appliquée aux modèles |
| Saison | dates, saison en cours, saison de préinscription |
| Catalogue | cours, créneaux, places, professeurs, salles, tarifs |
| Formulaire | sections, champs, ordre, obligatoire ou non, conditions d'affichage |
| Tarification | adhésion famille, licence, cotisation, réductions, aides publiques |
| Justificatifs | lesquels, bloquants ou non, dates de validité |
| Liste d'attente | activée ou non, fenêtre de réponse, règle de priorité |

**Règle non négociable :** cette configuration est validée par un schéma strict (Zod) avant d'entrer
en base. Une configuration invalide n'atteint jamais la production.

---

## Le rôle de l'IA, précisément

Tu as dit « grâce à l'IA ça code en fonction de multiples combinaisons ». Une précision importante,
parce qu'elle détermine si le produit tient à 100 clubs :

**L'IA ne génère pas de code. Elle génère de la configuration.**

Générer du code par client, c'est 100 bases de code à maintenir, et le premier correctif de sécurité
te prend trois semaines. Générer de la configuration, c'est un seul moteur et 100 lignes en base.

Le flux réel :

1. tu récupères le brief du club : son formulaire papier, son fichier Excel, sa grille tarifaire, le compte rendu de l'appel
2. l'IA en sort une configuration au format attendu
3. le schéma la valide, tu la prévisualises, tu corriges à la main ce qui cloche
4. tu publies

Le gain n'est pas de coder plus vite, c'est de passer de deux heures de saisie à quinze minutes de
relecture par club. Et comme le moteur est unique, un club qui découvre un cas tordu fait progresser
tous les autres.

---

## Le noyau MVP, la liste

### Moteur de formulaires
* rendu d'un formulaire depuis sa configuration
* champs conditionnels (si mineur, alors autorisation parentale et contact d'urgence)
* validation, messages d'erreur, sauvegarde automatique du brouillon
* panier **multi enfants et multi cours** en une seule commande
* mobile d'abord, les parents s'inscrivent au téléphone le soir

### Moteur de tarification
* trois portées : adhésion par famille, licence par participant, cotisation par ligne
* réductions déclarées : fratrie, multi cours
* aides publiques déduites : Pass Sport, Pass 5e, aide mairie
* **récapitulatif ligne par ligne** montré au parent, sinon le club reçoit vingt appels
* ordre de calcul verrouillé et testé

### Paiement
* Stripe Connect Express, commission prélevée automatiquement
* CB, Apple Pay, Google Pay
* trois chèques avec date d'encaissement prévue (pas de 3x carte au MVP)
* saisie des paiements hors ligne par le bureau : chèque, espèces, virement, ANCV
* facture PDF numérotée, séquence continue par club et par exercice
* remboursement déclaré dans OnClub, commission remboursée au prorata

### Dashboard du club
* accueil : reste à encaisser en très gros, encaissé cette saison, prochain virement, bloc « à faire »
* inscriptions : trois vues (toutes, impayées, dossier incomplet), recherche, sélection multiple, export CSV
* fiche d'inscription : détail et actions (relancer, rembourser, valider un justificatif, annuler)
* relance en un clic, avec aperçu de l'email
* deux rôles : administrateur et trésorier

### Liste d'attente
* file ordonnée, position visible par la famille
* proposition de place, jeton valable 48 heures, expiration automatique, passage au suivant
* déblocage manuel par le bureau

### Emails
* modèles uniques, **rendus aux couleurs et au nom du club** depuis sa configuration
* transactionnels : code de connexion, confirmation avec PDF, facture, échec de paiement, panier abandonné, relance de paiement, relance de document, place disponible
* relances d'impayés automatiques, cadence fixe
* SPF, DKIM, DMARC configurés dès la première semaine

### Justificatifs
* dépôt par lien sans connexion, depuis le téléphone
* **jamais bloquant pour le paiement**
* validation par le bureau, dates d'expiration, relance automatique

### Import du fichier Excel du club
* modèle xlsx à télécharger, aperçu avant validation, import annulable
* case « ces personnes ont déjà payé » : paiement historique non facturé, hors commission
* c'est le closing commercial, pas une fonctionnalité annexe

### Espace famille
* page « mon dossier » par lien magique, jamais de mot de passe
* montant dû, documents manquants avec bouton de dépôt, factures téléchargeables

### Console opérateur
* liste des clubs, création, édition de configuration, prévisualisation, publication
* connexion Stripe et domaine email par club
* choix et changement de formule
* vue interne : encaissements par club, commission générée, minimum de 590 euros atteint ou non

### Gestion des trois formules
* table de droits par club, une seule vérification côté serveur
* activation et désactivation des fonctionnalités selon ce que le club a pris

---

## Ce qui n'est PAS dans le MVP

| Sorti | Remplacé par | Repris quand |
|---|---|---|
| Éditeur de site et CMS | Site monté à la main dans Framer, une heure par club, facturé | Février 2027 |
| Constructeur de formulaire pour le club | C'est toi qui montes la config | Jamais, ou très tard |
| Boutique | Rien | Janvier 2027 |
| Billetterie | Rien | Mars 2027, avant les galas de juin |
| Paiement 3x par carte | Trois chèques avec date d'encaissement | Décembre, après test Alma |
| Campagnes d'emails groupés | Sélection multiple plus bouton relancer, export CSV | Décembre |
| Espace professeur et appel | Export CSV de la liste d'élèves | Janvier |
| Duplication de saison | Fait en SQL par toi devant le client | Mars 2027 |
| Espagnol et anglais publiés | Clés i18n posées, seul le français rempli | Au premier club hispanophone |
| Onboarding en autonomie | C'est toi qui onboardes, en visio de 30 minutes | Après 20 clubs |

---

## Le scope des prochains jours

### Cette semaine, avant de coder : six décisions de modèle

Prises plus tard, elles coûtent trois semaines de migration en pleine saison.

1. **Une seule table `personne`.** Le participant d'aujourd'hui est le joueur de demain. Jamais de tables séparées joueur, parent, coach.
2. **Le rôle en table datée** (personne, rôle, portée, saison, début, fin), jamais un champ `role` sur l'utilisateur.
3. **L'affectation datée** : on ne supprime jamais un lien personne vers cours, on le clôture avec un motif.
4. **Deux saisons ouvertes en même temps** entre mai et juillet, sinon impossible de vendre la réinscription.
5. **Consentement image en trois niveaux** (interne, site, réseaux), par enfant, révocable, collecté dans le tunnel.
6. **Paiement historique non facturé** dès le jour un, sinon « reste à encaisser » est faux le premier jour.

Plus quatre décisions business :

* Les taux (2,9 / 4,9 / 6,9) et le minimum de 590 euros sont **HT**, TVA en sus, écrit dans les CGV. Une association ne récupère pas la TVA, 590 HT lui coûtent 708. Le découvrir en janvier, c'est un litige avec le premier client.
* Stripe Connect Express, destination charge avec `on_behalf_of`. C'est la seule combinaison qui met le nom du club sur le relevé bancaire du parent.
* **Trois clubs pilotes nommés**, avec leurs formulaires papier et leurs fichiers Excel récupérés avant le 30 août. Ce sont eux qui définissent la forme de la configuration. Sans eux, tu la conçois à l'aveugle.
* Lancer le légal : CGV, contrat de sous traitance RGPD article 28, politique de confidentialité. Environ 2 000 euros, et ça bloque le lancement autant que le code.

### Semaine 1, du 25 au 30 août
Socle, modèle de données, format de configuration, catalogue de cours, page publique.
**Livrable** : la configuration d'un vrai club pilote est écrite à la main, poussée, et sa grille de cours est visible sur une page à son nom. Envoyable au président par WhatsApp dimanche soir.

### Semaine 2, du 31 août au 6 septembre
Moteur de formulaire et moteur de tarification, pilotés par la configuration.
**Livrable** : un parent inscrit deux enfants à trois cours depuis son téléphone, et le total est exactement celui que le club calcule à la main dans son Excel.

### Semaine 3, du 7 au 13 septembre
Stripe Connect, webhooks, facture PDF, emails de confirmation aux couleurs du club.
**Livrable** : une inscription réelle payée de bout en bout sur le compte d'un club pilote. C'est la démo qui ferme des contrats.

### Semaine 4, du 14 au 20 septembre
Dashboard de recouvrement, encaissement des chèques, export.
**Livrable** : le trésorier saisit ses quarante chèques avec leurs dates d'encaissement et exporte sa liste. L'Excel commence à mourir.

### Semaine 5, du 21 au 27 septembre
Import du fichier Excel, paiements historiques, première relance.
**Livrable** : 180 inscrits d'un vrai club chargés, leurs vrais impayés visibles, une relance qui part.

### Semaine 6, du 28 septembre au 4 octobre
Justificatifs, Pass Sport, dossier incomplet.

### Semaine 7, du 5 au 11 octobre
Liste d'attente, et **console opérateur avec génération de configuration assistée par IA**.
**Livrable** : tu colles le brief d'un club, tu obtiens sa configuration, tu la corriges en quinze minutes, tu publies. C'est ce qui rend le modèle réplicable.

### Semaine 8, du 12 au 18 octobre
Durcissement : rejeu des webhooks, réconciliation, sauvegardes testées.

### Semaine 9, du 19 au 25 octobre
Premier club en production.

### Semaine 10, du 26 au 31 octobre
Deux clubs de plus, clôture de la V1.

---

## La date

Le périmètre complet a été chiffré à 247 jours de développement, il y en a 40 à 45 de disponibles.
Le modèle opéré retire l'éditeur de site, le constructeur de formulaire et l'onboarding en autonomie,
ce qui ramène le périmètre dans la fenêtre, mais il ne la rend pas confortable.

* **Mi septembre** : une démo crédible plus un pilote que tu accompagnes toi même.
* **26 octobre** : un vrai club encaisse en autonomie, avec sa configuration poussée par toi.

À savoir : les clubs de danse encaissent entre le 25 août et le 20 septembre. Tes pilotes d'octobre
arriveront **en cours de saison**, avec des inscrits déjà encaissés ailleurs. La promesse de lancement
n'est donc pas « ouvrez vos inscriptions », c'est **« récupérez vos impayés »**.
