# OnClub, plan de développement

Le détail de ce qu'il y a à construire, dans l'ordre de construction.
Un module se termine quand son critère de fin est atteint, pas quand le code compile.

---

## Par quoi on commence, et pourquoi

**On commence par le modèle de données, parce que c'est la seule chose qu'on ne peut pas rattraper.**
Un moteur de tarification qui se trompe se corrige en une journée. Un modèle qui sépare le joueur du
participant se corrige en trois semaines de migration, en pleine saison, sur des données de production.

Mais on ne passe pas trois semaines dans la plomberie. **Chaque semaine doit produire quelque chose
qu'on peut montrer à un président de club au téléphone.** Donc on remonte le produit par tranches
verticales, jamais par couches horizontales.

L'ordre qui découle de ces deux contraintes :

```
M0 socle  →  M1 modèle  →  M2 config    →  M4 catalogue public   (semaine 1, montrable)
                              ↓
                          M5 tarifs  →  M6 tunnel                (semaine 2, montrable)
                                            ↓
                                        M7 Stripe  →  M8 factures (semaine 3, le premier euro)
                                            ↓
                                        M9 dashboard              (semaine 4)
                                            ↓
                                        M11 import Excel          (semaine 5)
```

Les modules M3, M10, M15 avancent en parallèle parce qu'ils ne bloquent personne.

---

## M0 · Socle

Une journée. Rien de visible, tout le reste en dépend.

* Dépôt Next 16, TypeScript, Tailwind 4, ESLint
* Déploiement Vercel en production **dès le premier jour**, même vide
* Supabase, base créée, région Paris
* Connexion Drizzle via Supavisor en mode transaction, `prepare: false`
* Connexion directe séparée pour les migrations
* Rôle applicatif `app_user`, **non propriétaire des tables**
* `ENABLE` puis `FORCE ROW LEVEL SECURITY` sur toutes les tables
* Sauvegarde chiffrée automatique, activée le premier jour, pas plus tard
* Sentry sur le client et le serveur
* Action GitHub : `tsc`, lint, tests sur chaque PR

**Critère de fin :** une page vide est en production, la base répond, un PR cassé est bloqué
automatiquement, et une sauvegarde chiffrée existe déjà.

---

## M1 · Modèle de données

Le module le plus important du projet. Deux jours, à ne pas comprimer.

### Les tables cœur

| Table | Rôle | Points de vigilance |
|---|---|---|
| `club` | Le tenant | Marque, langue, devise, fuseau, pays, compte Stripe, formule |
| `season` | L'unité de vie du club | **Deux saisons ouvertes en même temps** entre mai et juillet |
| `person` | **Une seule table pour tout le monde** | Le participant, le parent, le coach, le joueur. Jamais de tables séparées |
| `guardianship` | Le lien adulte vers mineur | Deux responsables légaux indépendants, adresses distinctes, jamais fusionnées |
| `account` | Le compte de connexion | Distinct de `person`. Un parent pilote une à quatre personnes |
| `role_assignment` | Le rôle, **daté** | `person`, `role`, `scope_type`, `scope_id`, `season`, `valid_from`, `valid_to`. **Jamais un champ `role` sur l'utilisateur** |
| `course` | Le modèle de cours | Capacité, `enrolled_count` avec contrainte `<= capacity` |
| `enrollment` | L'affectation, **datée** | On ne supprime jamais, on clôture avec un motif |

### Les six décisions irréversibles

1. **Une seule table `person`.** Un parent qui entraîne l'équipe de son fils serait sinon saisi trois fois.
2. **Le rôle en table datée.** Marie est trésorière, coach et mère de deux joueurs en même temps.
3. **L'affectation datée.** Sans historisation, aucune statistique de fin de saison n'est juste.
4. **Deux saisons ouvertes simultanément.** Sinon impossible de vendre la réinscription en juin.
5. **Consentement image en trois niveaux** (interne, site, réseaux), par enfant, révocable.
6. **Le paiement historique non facturé** dès le premier jour, pour les clubs qui arrivent en cours
   de saison avec 180 inscrits déjà encaissés ailleurs.

### Le reste du schéma

`registration_cart`, `cart_item`, `quote_snapshot`, `installment`, `payment`, `invoice`,
`invoice_counter`, `credit_note`, `document`, `waitlist_entry`, `job_queue`, `audit_log`,
`email_log`, `club_subscription`.

**Deux règles sur les montants :** tout est stocké en **centimes entiers**, jamais en flottant.
Et le statut de paiement se **dérive**, il ne se stocke jamais dans une colonne, sinon il diverge.

**Critère de fin :** les trois cas types passent sur papier, une école de danse, un club de foot, et
une association multi-activités. Un parent avec trois enfants dans deux disciplines se modélise
sans contorsion.

---

## M2 · Config club et console opérateur

C'est ce qui rend le modèle opéré possible. Le club ne configure rien, tu pousses sa config.

### Le schéma de config

Validé par Zod, versionné, refusé s'il est invalide.

* **Identité** : nom, sigle, logo, couleurs de marque, langue, devise, sous-domaine
* **Formule** : EasyPay, OnClub ou Max, et le taux qui va avec
* **Paiement** : compte Stripe connecté, moyens acceptés, échéances autorisées
* **Emails** : adresse de réponse, marque appliquée aux modèles
* **Saison** : dates, saison courante, saison de préinscription
* **Catalogue** : disciplines, niveaux, salles, professeurs, cours, créneaux, capacités
* **Formulaire** : sections, champs, ordre, obligatoire ou non, conditions d'affichage
* **Tarification** : adhésion famille, licence, cotisation, réductions, aides publiques
* **Justificatifs** : lesquels, bloquants ou non, durée de validité
* **Liste d'attente** : activée, fenêtre de réponse, règle de priorité

### La console opérateur

* Liste des clubs, création, duplication d'une config existante
* Éditeur de config en JSON avec validation en direct et messages d'erreur lisibles
* **Prévisualisation** du formulaire et du calcul de prix avant publication
* Publication versionnée, avec possibilité de revenir en arrière
* Connexion du compte Stripe, choix et changement de formule
* Vue interne : encaissements par club, commission générée, qui approche du minimum

### Le calcul de contraste côté serveur

Le club fournit sa couleur d'accent. **Tu ne lui demandes jamais sa couleur de contraste**, tu la
calcules par luminance au moment de l'enregistrement et tu la stockes. Sinon un club choisit un
jaune vif avec du blanc dessus et tu le découvres en production.

**Critère de fin :** tu montes la config d'un club pilote à la main en moins de trente minutes,
tu la publies, sa page est en ligne à sa marque.

---

## M3 · Design system et composants

En parallèle, ne bloque rien. Voir [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

* `app/theme.css` avec les trois couches de tokens
* Satoshi servie en local, Bricolage Grotesque depuis Google Fonts
* Cinq composants : bouton, champ, carte, pastille de montant, sélecteur
* Le thème club appliqué par attribut sur la balise racine
* Règle de lint qui refuse les hex et les valeurs arbitraires dans le JSX

**Critère de fin :** aucune couleur en dur nulle part, et le changement de club recolore tout le
produit sans qu'un composant soit modifié.

---

## M4 · Catalogue et page publique

La première chose montrable.

* Page publique par club, sur son sous-domaine, à sa marque
* Liste des cours ouverts, avec discipline, niveau, jour, heure, salle, professeur
* **Places restantes en direct**, et bascule visuelle quand un cours est complet
* Filtres par discipline, par niveau, par tranche d'âge
* **Catégorie ou niveau calculé** depuis la date de naissance, jamais depuis l'âge du jour
* Lien partageable et QR code, pour le groupe WhatsApp du club
* États de la page : brouillon, en ligne, inscriptions fermées
* Version mobile d'abord, les parents regardent le soir au téléphone

**Critère de fin :** la vraie grille de cours d'un pilote est en ligne à son nom, envoyable au
président par WhatsApp dimanche soir.

---

## M5 · Moteur de tarification

**Une fonction pure.** Elle prend une config et un panier, elle rend un devis. Elle ne touche ni à la
base, ni à Stripe, ni au temps. C'est la seule pièce que tu ne pourras jamais recalculer après coup.

### Les trois portées de facturation

* **Par famille** : adhésion à l'association, une seule fois quel que soit le nombre d'enfants
* **Par participant** : licence fédérale, pack équipement, assurance
* **Par ligne d'inscription** : la cotisation du cours

### Les règles

* Réduction fratrie : deuxième enfant, troisième enfant, montants paramétrables
* Réduction multi-cours pour une même personne
* Réduction seconde section ou seconde discipline
* Aides publiques : Pass Sport, Pass 5e, Bon CAF, coupons ANCV, aide de la commune
* **Cumulables ou non**, déclaré dans la config. Quand elles ne le sont pas, seule la plus élevée
  s'applique et les autres se grisent dans l'interface
* Ordre de calcul verrouillé et testé, jamais implicite
* Plafond : un montant ne descend jamais sous zéro

### Le devis figé

À la validation, le devis est **enregistré ligne par ligne, daté, immuable**. C'est ce qui répond au
parent qui appelle en février, et ce qui justifie une facture six mois plus tard. Le prix unitaire
est figé à l'ajout au panier, sinon un bureau qui corrige un tarif à 21 h recalcule quarante paniers
en cours de saisie.

**Le récapitulatif ligne par ligne est montré au parent.** Sans lui, le club reçoit vingt appels.

**Critère de fin :** les grilles tarifaires réelles des trois pilotes donnent exactement les montants
qu'ils calculent aujourd'hui à la main dans leur Excel. Testé avec Vitest, cas par cas.

---

## M6 · Moteur de formulaire et tunnel d'inscription

Le formulaire est **une donnée, pas du code**. Un club égale une config, pas une branche.

### Le moteur

* Rendu depuis un schéma : sections, champs, types, ordre
* **Champs conditionnels** : si mineur, alors autorisation parentale et contact d'urgence
* Validation par Zod générée depuis le même schéma
* Sauvegarde automatique du brouillon, reprise plus tard
* Messages d'erreur au niveau du champ, jamais un bloc rouge en haut de page

### Le tunnel

* **Panier multi-participants et multi-cours** en une seule commande. C'est le cas normal en danse,
  pas le cas limite
* Création du compte famille après le choix des cours, **par lien magique**, jamais de mot de passe
* Deux responsables légaux, avec le cas des parents séparés et des adresses distinctes
* Contact d'urgence, distinct des responsables
* Autorisations : soins, transport, droit à l'image en trois niveaux
* Dépôt des justificatifs, **jamais bloquant pour le paiement**
* Options payantes : pack équipement avec taille, assurance, don avec reçu fiscal
* Validations bloquantes : règlement intérieur téléchargé **avant** de pouvoir cocher, chartes, RGPD
* Reprise du panier abandonné
* **Mode saisie par le bureau**, pour la famille sans internet qui vient au club avec un chèque

**Critère de fin :** un parent inscrit deux enfants à trois cours depuis son téléphone, et le total
est exactement celui du club.

---

## M7 · Paiement

### Stripe Connect

* Comptes Express, en destination charges, avec `on_behalf_of` pour que **le nom du club apparaisse
  sur le relevé bancaire du parent**
* Commission prélevée à la source par `application_fee_amount`
* Clé d'idempotence **déterministe**, construite depuis l'identifiant du panier et le rang de
  l'échéance, jamais aléatoire
* CB, Apple Pay, Google Pay

### L'échéancier

* Il existe toujours, même pour un paiement en une fois. Une seule mécanique, moins de cas
* Trois chèques avec date d'encaissement prévue, en attendant le 3x carte
* Relance automatique sur échec de prélèvement, avec un nombre d'essais borné

### Les encaissements hors ligne

Souvent oublié, et ça casse tout le tableau de bord. Le bureau saisit à la main :
chèque avec numéro et banque, espèces, virement, coupons ANCV, aide de la mairie ou du comité
d'entreprise. Avec montant, date de réception, **date d'encaissement prévue**, et pièce jointe.

### Les webhooks

* Un endpoint unique, qui **vérifie la signature, écrit l'événement brut, puis traite**
* Rejeu possible depuis l'événement stocké
* Réconciliation quotidienne : comparaison des paiements sur 72 heures, table d'anomalies, alerte
* Remboursement : la commission suit l'argent, systématiquement, sans exception

**Critère de fin :** on coupe volontairement les webhooks pendant une heure, on encaisse, et le
lendemain le paiement est retrouvé, rattaché et facturé sans intervention humaine.

---

## M8 · Factures

* Numérotation **par une séquence sous verrou**, continue, sans trou, par club et par exercice
* Langue et devise figées à l'émission, libellés figés
* Mentions obligatoires pour une association, TVA non applicable article 293 B
* PDF généré à la demande au premier téléchargement, pas en lot
* Avoir pour tout remboursement, jamais de modification d'une facture émise
* Justificatif d'encaissement pour les paiements hors ligne

**Attention :** si la transaction échoue après avoir consommé un numéro, il y a un trou dans la
séquence, et c'est un problème légal. À traiter dès l'écriture, pas après.

**Critère de fin :** cent factures générées en concurrence, aucune numérotation en double, aucun trou.

---

## M9 · Dashboard du bureau

### Accueil

* **Reste à encaisser en très gros**, avec le nombre de familles concernées
* Encaissé cette saison
* Prochain virement Stripe, en une ligne
* Bloc « à faire » : paiements échoués, dossiers incomplets, places à proposer

### Inscriptions

* Tableau dense, trois vues : toutes, impayées, dossier incomplet
* Recherche unique sur l'enfant, le parent, l'email, le téléphone
* Sélection multiple avec la somme affichée en bas
* Export CSV de la sélection
* Fiche d'inscription : détail, historique, et actions

### Actions

Relancer, encaisser un chèque, rembourser, valider un justificatif, changer de cours, annuler,
appliquer une remise motivée, **réserver une place sans paiement** avec motif obligatoire et trace.

> Cette dernière n'est pas négociable. La règle « une place n'est réservée que payée » ne survit ni
> à l'enfant du président, ni à une famille en difficulté, ni à une mairie qui paie en novembre.
> Si le produit ne le permet pas, le bureau le contourne et retourne dans Excel.

### Cours

Vue de remplissage, création et édition d'un cours, ouverture et fermeture des inscriptions.

**Critère de fin :** le trésorier saisit ses quarante chèques avec leurs dates d'encaissement et
sort sa liste. L'Excel commence à mourir.

---

## M10 · Emails et relances

C'est la promesse produit, pas une fonctionnalité de confort.

### Les modèles transactionnels

Code de connexion, confirmation d'inscription avec PDF, facture, échéance à venir, échec de
prélèvement, relance d'impayé, place disponible en liste d'attente, justificatif manquant,
justificatif expirant, panier abandonné, confirmation de remboursement, bienvenue.

### Le rendu à la marque du club

Un seul jeu de modèles, rendus avec les couleurs et le logo du club depuis sa config. **Les emails
ne peuvent pas utiliser de variables CSS**, tout est injecté en ligne au rendu.

### Les séquences de relance

* Cadence fixe, bornée, avec un moment où on arrête et où on passe la main au trésorier
* Fenêtre horaire, jamais avant 8 h ni après 21 h
* **Une seule notification groupée par contact**, quel que soit le nombre d'enfants concernés
* Journal des envois, et jamais deux fois le même email le même jour

**Critère de fin :** une relance part sur les impayés réels d'un club sans réveiller personne
qui a déjà payé.

---

## M11 · Import du fichier Excel

Ce n'est pas une fonctionnalité annexe, **c'est le closing commercial**. Le club qui voit ses
214 lignes remontées en quatre minutes signe. Celui qui doit ressaisir ne signe jamais.

* Modèle xlsx à télécharger, trois onglets : familles, participants, inscriptions
* Import direct du fichier du club avec **association de colonnes assistée**
* Aperçu des dix premières lignes avant validation
* Détection des doublons, revue côte à côte, jamais de fusion automatique
* Case « ces personnes ont déjà payé » : paiement historique non facturé, hors commission
* Import annulable pendant trente jours

> Le fichier d'un vrai club contient quatre formats de date dont un où le mois et le jour sont
> inversés une ligne sur cinq, des cellules fusionnées, et une colonne Nom qui contient parfois
> deux enfants. **Compte cinq jours pleins, pas deux.**

**Critère de fin :** 180 inscrits d'un vrai club sont chargés, leurs vrais impayés apparaissent
au bon montant dans le dashboard.

---

## M12 · Justificatifs

* Dépôt par lien, **sans connexion**, depuis le téléphone
* **Jamais bloquant pour le paiement**, sauf l'accord du club quitté en cas de mutation
* Redimensionnement à l'envoi, gestion du HEIC iPhone et de l'orientation EXIF
* Validation par le bureau, en deux clics
* Dates de validité et relance automatique avant expiration
* **Minimisation RGPD** : on stocke la validité (conforme, date, qui a contrôlé), et on purge le
  document. Vocabulaire correct dès le formulaire : questionnaire de santé QS-Sport pour les mineurs
* Bucket privé, URL signées courtes, journal d'accès sur les documents de santé
* Aides publiques associées : Pass Sport, Pass 5e, avec leur code

---

## M13 · Liste d'attente

L'argument de vente de la formule OnClub, et le meilleur levier d'upsell depuis EasyPay.

### La machine à états

`en attente` → `place proposée` → `acceptée` | `refusée` | `expirée` → `convertie`

* Fenêtre de réponse paramétrable, 48 heures par défaut
* **Le problème à résoudre :** une file de trente personnes qui met soixante jours à se vider parce
  que chacun consomme ses 48 heures. C'est là que se joue le mot « intelligente ». Proposition à
  plusieurs en parallèle, ou fenêtre qui se raccourcit, à trancher
* Priorité paramétrable : ordre d'arrivée, fratrie d'un inscrit, adhérent de l'an dernier, résident
  de la commune. Les clubs ont des règles politiques fortes là-dessus
* Cascade : un désistement libère une place, qui déclenche la file, dont l'accepteur quitte lui-même
  une autre file
* Position visible par la famille, qui peut se retirer elle-même
* Côté bureau : voir la file, débloquer à la main, sauter quelqu'un avec justification tracée,
  ouvrir des places supplémentaires
* Expiration par tâche horaire, pas par calcul à l'affichage
* Métriques : taux de conversion, délai moyen, places perdues. C'est ce qui prouve au club que la
  fonctionnalité vaut le passage à 4,9 %

---

## M14 · Espace famille

* Page « mon dossier » par lien magique, jamais de mot de passe
* Montant dû, échéances à venir, historique
* Documents manquants avec bouton de dépôt
* Factures téléchargeables
* Mise à jour d'un certificat expiré
* Ajout d'un enfant ou d'un cours, qui repasse par le tunnel

---

## M15 · Les trois formules

* Table de droits par club, **une seule vérification côté serveur**. Aucun `if` sur le nom du plan
  dispersé dans le code
* Cartographie précise au niveau de l'écran et de l'action, pas de la promesse marketing
* Changement de formule dans les deux sens, et ce que deviennent les données quand un club redescend
* Compteur du minimum de saison
* **Moments d'upsell** : un club EasyPay qui gère trente familles en liste d'attente à la main est
  le moment parfait pour proposer OnClub
* Simulateur de coût : nombre d'adhérents et cotisation moyenne, coût par formule. Outil de vente

### La frontière exacte

| Fonctionnalité | EasyPay 2,9 % | OnClub 4,9 % | Max 6,9 % |
|---|:---:|:---:|:---:|
| Fiche d'inscription | ✓ | ✓ | ✓ |
| Tunnel multi-enfants, tarifs, réductions | ✓ | ✓ | ✓ |
| Paiement, échéances, encaissement hors ligne | ✓ | ✓ | ✓ |
| Factures automatiques | ✓ | ✓ | ✓ |
| Dashboard et suivi des impayés | ✓ | ✓ | ✓ |
| Emails transactionnels | ✓ | ✓ | ✓ |
| Relances d'impayés automatiques | ✓ | ✓ | ✓ |
| Justificatifs et espace famille | ✓ | ✓ | ✓ |
| Site du club, planning, actualités | | ✓ | ✓ |
| Liste d'attente automatique | | ✓ | ✓ |
| Campagnes d'emails groupés | | ✓ | ✓ |
| Gestion de saison et duplication | | ✓ | ✓ |
| Boutique | | | ✓ |
| Billetterie | | | ✓ |

> La zone grise à trancher : un email de confirmation de paiement est indispensable même en EasyPay.
> Ce qui distingue OnClub, ce sont les **campagnes** choisies par le bureau, pas le transactionnel.

---

## M16 · Exports

Demande explicite, et sous-estimée. Chaque organisme veut son format.

* Architecture **générique**, pas dix exports codés à la main : une définition de colonnes par
  destinataire, un moteur unique
* Destinataires : fédération, assurance, mairie et dossier de subvention, comptable, assemblée
  générale, liste des impayés, liste d'un cours pour le professeur
* Formats CSV et xlsx, encodage et séparateur adaptés à Excel français
* Génération **asynchrone** par la file de jobs, avec lien de téléchargement par email
* Jamais de document de santé dans un export

---

## M17 · Durcissement

Avant de toucher de l'argent réel.

* Rejeu quotidien des événements Stripe depuis un curseur
* Réconciliation sur 72 heures, table d'anomalies, alerte par email
* **Restauration de sauvegarde testée pour de vrai**, pas supposée
* Heures stockées en heure locale avec fuseau, jamais en UTC nu pour les récurrences
* Verrou de capacité contre webhook tardif : un 3DS repris quarante minutes plus tard ne doit pas
  vendre la place deux fois
* Journal d'audit sur les finances et les justificatifs
* Deux administrateurs minimum par club, refus de révoquer le dernier

---

## Les quatre tests non négociables

Tu n'as pas le temps d'une couverture large. Tu as le temps de ceux-là, et ils touchent tous à l'argent.

| Quoi | Pourquoi |
|---|---|
| Le moteur de tarification | Un prix faux au premier parent avec deux enfants, et le club rouvre Excel |
| Signature et idempotence des webhooks | Un webhook rejoué qui double un paiement est un litige |
| Numérotation des factures, en concurrence | Un trou dans la séquence est un problème légal |
| Le tunnel complet, paiement compris | Le seul parcours dont la casse est invisible jusqu'au premier appel |

---

## Ce qui n'est pas dans cette première version

| Sorti | Remplacé par | Repris |
|---|---|---|
| Éditeur de site et CMS | Site monté à la main, une heure par club | Février |
| Constructeur de formulaire pour le club | Tu montes la config | Très tard, ou jamais |
| Boutique | | Janvier |
| Billetterie | | Mars, avant les galas de juin |
| 3x par carte | Trois chèques avec date d'encaissement | Décembre |
| Campagnes d'emails groupés | Sélection multiple plus bouton relancer | Décembre |
| Espace professeur, appel, présences | Export CSV de la liste d'élèves | Janvier |
| Duplication de saison assistée | Fait en SQL devant le client | Mars |
| Espagnol et anglais publiés | Clés i18n posées, seul le français rempli | Au premier club hispanophone |

---

## L'ordre de coupe, si la semaine dérape

En partant du bas.

1. Moteur de tarification et devis figé · **jamais**
2. Stripe et réconciliation · **jamais**
3. Socle RLS et sauvegardes · **jamais**
4. Modèle de données · **jamais**
5. Tunnel d'inscription
6. Dashboard de recouvrement
7. Import Excel
8. Liste d'attente
9. Justificatifs
10. Exports
11. Emails groupés · coupe en premier
