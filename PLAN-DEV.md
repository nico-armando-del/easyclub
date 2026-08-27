# OnClub, plan de développement

Ce que tu mets en place, dans quel ordre, et pourquoi.
Versions relevées sur npm le 25 août 2026.

---

## 1. Les services à ouvrir, et quand

Trois d'entre eux ont un **délai incompressible**. Si tu les lances en octobre, tu es bloqué en octobre.

| Service | Rôle | Coût | Délai | À faire |
|---|---|---|---|---|
| **Stripe** (compte plateforme + Connect) | Encaissement, commission | 1,5 % + 0,25 € | **1 à 3 semaines** de vérification | **Aujourd'hui** |
| **Domaine** `onclub.app` + sous-domaine mail | Site, emails | ~15 €/an | Propagation 24 h, mais **la réputation d'envoi se chauffe sur 3 à 4 semaines** | **Aujourd'hui** |
| **Resend** | Emails transactionnels | 20 $/mois | Vérification du domaine 1 h | **Aujourd'hui**, pour chauffer |
| Supabase | Base, auth, stockage | 25 $/mois | immédiat | Semaine 1 |
| Vercel | Hébergement | 20 $/mois | immédiat | Semaine 1 |
| Sentry | Erreurs | gratuit au départ | immédiat | Semaine 1 |
| Backblaze B2 | Sauvegardes chiffrées | ~3 $/mois | immédiat | Semaine 1 |
| Fontshare | Licence Satoshi | à vérifier | immédiat | Semaine 1 |
| Render | Worker jobs longs | 7 $/mois | immédiat | Semaine 6 |

**Total à 10 clubs : environ 110 euros par mois.**

### Les trois pièges de démarrage

**Stripe Connect pour une association loi 1901.** Ce n'est ni un particulier ni une société commerciale.
Stripe demande le numéro RNA ou le SIREN, les statuts, le récépissé de préfecture et la pièce d'identité
du président. Le président ne les a jamais sous la main. **Fais l'onboarding complet d'un vrai club
pilote cette semaine**, avant de promettre quoi que ce soit en rendez-vous.

**La délivrabilité chez Orange, Free et SFR.** Gmail et Outlook pardonnent à un domaine neuf bien
configuré, Orange non : il met en quarantaine sans te prévenir. Configure SPF, DKIM et DMARC
aujourd'hui, et envoie 20 à 50 emails réels par jour dès maintenant vers des boîtes que tu contrôles,
pour que le domaine ait un historique quand les vraies factures partiront.

**Satoshi n'est pas sur Google Fonts.** C'est une police Fontshare, à acheter et à servir en local via
`next/font/local`. Sinon elle ne charge jamais et le site retombe silencieusement sur Poppins.

---

## 2. Le dépôt

Un seul dépôt, une seule application. Pas de monorepo, pas de microservices.

```
onclub/
├─ app/
│  ├─ (public)/[club]/            fiche d'inscription, tunnel, espace famille
│  ├─ (dashboard)/[club]/         dashboard du bureau
│  ├─ (operator)/                 ta console, jamais accessible aux clubs
│  ├─ api/
│  │  ├─ webhooks/stripe/         endpoint unique, signé, idempotent
│  │  └─ tick/                    appelé chaque minute par le cron
│  ├─ theme.css                   les tokens du design system
│  └─ layout.tsx
├─ lib/
│  ├─ db/           schema.ts, migrations, client Drizzle
│  ├─ pricing/      le moteur de tarification, pur, sans effet de bord
│  ├─ forms/        le moteur de formulaire piloté par schéma
│  ├─ stripe/       Connect, échéancier, webhooks, réconciliation
│  ├─ mail/         modèles React Email, envoi, relances
│  ├─ jobs/         file de travaux, gestionnaires
│  ├─ entitlements/ les droits des trois formules
│  └─ config/       schéma Zod de la config club, validation
├─ components/ui/   bouton, champ, carte, pastille de montant, sélecteur
├─ emails/          les modèles, un fichier par email
├─ drizzle/         migrations SQL générées
└─ scripts/         sauvegarde, import Excel, outils
```

**Deux règles de structure qui évitent des semaines de dette :**

`lib/pricing` est une **fonction pure**. Elle prend une config et un panier, elle rend un devis ligne
par ligne. Elle ne touche ni à la base, ni à Stripe, ni au temps. C'est la seule façon de la tester
sérieusement, et c'est la pièce que tu ne pourras jamais recalculer après coup.

`app/(operator)` est ta console. Elle vit dans le même dépôt mais derrière une vérification de rôle
distincte. Ne la mets jamais dans le même groupe de routes que le dashboard club.

---

## 3. Les dépendances

```bash
npx create-next-app@latest onclub --typescript --app --tailwind --eslint
```

Puis :

```bash
# Base de données
npm i drizzle-orm@0.45.2 postgres@3.4.9
npm i -D drizzle-kit@0.31.10

# Supabase (auth, stockage)
npm i @supabase/supabase-js@2.112.4 @supabase/ssr@0.12.5

# Paiement
npm i stripe@22.5.0

# Emails
npm i resend@6.22.1 @react-email/components@1.0.12
npm i -D react-email@6.9.2

# Formulaires et validation
npm i zod@4.4.3 react-hook-form@7.86.0 @hookform/resolvers@5.9.1

# Internationalisation
npm i next-intl@4.13.7

# Factures PDF
npm i @react-pdf/renderer@4.8.1

# Observabilité
npm i @sentry/nextjs@10.71.0

# Tests
npm i -D vitest@4.1.11 @playwright/test@1.62.1
```

Socle : **Next 16.3**, **React 19.2**, **Tailwind 4.3**, **TypeScript 7**.

> Next 16 et TypeScript 7 sont plus récents que mes connaissances. Lis leurs notes de migration
> avant de démarrer, je ne peux pas te garantir leurs spécificités.

---

## 4. Les variables d'environnement

```bash
# Base
DATABASE_URL=                  # Supavisor, port 6543, mode transaction
DIRECT_URL=                    # port 5432, pour les migrations uniquement

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # serveur uniquement, jamais exposée

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Emails
RESEND_API_KEY=
MAIL_FROM_DOMAIN=mail.onclub.app

# Jobs
CRON_SECRET=                   # protège /api/tick

# Sauvegardes
B2_KEY_ID=
B2_APPLICATION_KEY=
BACKUP_AGE_PUBLIC_KEY=         # chiffrement des dumps

SENTRY_DSN=
```

Deux URL de base, ce n'est pas une coquille : **Supavisor en mode transaction ne supporte pas les
requêtes préparées**, donc `prepare: false` dans le client Drizzle, et les migrations passent par la
connexion directe.

---

## 5. La configuration, service par service

### Supabase

```sql
-- Sans ces trois choses, la RLS est une illusion et un club lit les données des autres.
ALTER TABLE club ENABLE ROW LEVEL SECURITY;
ALTER TABLE club FORCE ROW LEVEL SECURITY;   -- s'applique même au propriétaire
-- Toutes les vues d'export en security_invoker, sinon elles contournent la RLS
CREATE VIEW export_inscriptions WITH (security_invoker = true) AS ...;
```

L'application se connecte avec un rôle `app_user` **non propriétaire** des tables. C'est ce qui rend
la RLS réellement appliquée.

### Stripe Connect

Comptes **Express**, en **destination charges** :

```ts
await stripe.paymentIntents.create({
  amount, currency: 'eur',
  on_behalf_of: club.stripeAccountId,                    // le nom du club sur le relevé du parent
  transfer_data: { destination: club.stripeAccountId },
  application_fee_amount: Math.round(amount * club.rateBps / 10000),
}, { idempotencyKey: `pi:${cartId}:${installmentSeq}` }); // clé déterministe, jamais aléatoire
```

Webhooks à traiter : `payment_intent.succeeded`, `payment_intent.payment_failed`,
`charge.refunded`, `account.updated`, `payout.paid`.

Un seul endpoint, qui **vérifie la signature, écrit l'événement brut en base, puis traite**.
Jamais l'inverse : si le traitement échoue, tu dois pouvoir rejouer.

### Resend

Un seul domaine d'envoi, `mail.onclub.app`, avec `From` au nom du club et `Reply-To` sur l'adresse
du club :

```
From: "AS Montclar" <asm@mail.onclub.app>
Reply-To: contact@as-montclar.fr
```

Une seule réputation d'envoi que tu contrôles, au lieu de cent qui partent de zéro chaque septembre.
Le jour où un club gros voudra son propre domaine, tu ajouteras cette option, pas avant.

### La file de jobs

Pas de Redis. Une table Postgres et un verrou :

```sql
SELECT * FROM job_queue
WHERE run_at <= now() AND status = 'pending'
ORDER BY run_at
FOR UPDATE SKIP LOCKED
LIMIT 10;
```

`/api/tick` appelée chaque minute par Vercel Cron traite les jobs courts (emails, expirations de
liste d'attente). Un worker Render prend les longs (exports, PDF en lot, prélèvements).

---

## 6. Le plan de construction

### Avant tout, cette semaine, sans écrire une ligne d'application

1. Ouvrir Stripe, le domaine et Resend. **C'est le seul travail avec un délai incompressible.**
2. Faire l'onboarding Stripe Connect complet d'un vrai club pilote, en visio avec son président.
3. Récupérer les fichiers Excel et les formulaires papier des trois pilotes.
4. Lancer les CGV et le contrat de sous-traitance RGPD article 28. Environ 2 000 euros, et ça bloque
   le lancement autant que le code.
5. Trancher : les taux et le minimum de 590 euros sont **HT**, TVA en sus, écrit dans les CGV.

### Semaine 1 · le socle et quelque chose à montrer

| Jour | Contenu |
|---|---|
| 1 | Dépôt, Next, Tailwind, `theme.css`, déploiement Vercel vide en production |
| 1 | Supabase, RLS, rôle `app_user`, sauvegarde chiffrée activée **le premier jour** |
| 2 | Schéma Drizzle : `club`, `season`, `person`, `guardianship`, `role_assignment`, `course` |
| 3 | Schéma suite : `registration_cart`, `cart_item`, `quote_snapshot`, `installment`, `payment` |
| 4 | Schéma Zod de la config club, validation, chargement |
| 4 | Console opérateur v0 : créer un club, coller sa config en JSON, publier |
| 5 | Page publique du club : sa grille de cours, à sa marque, depuis sa config |
| 5 | Les cinq composants de `components/ui` |

**Livrable :** la vraie grille de cours d'un club pilote est en ligne à son nom, envoyable au
président par WhatsApp dimanche soir.

### Semaine 2 · le moteur de tarification et le tunnel

Le moteur pur d'abord, testé avec Vitest sur les cas réels des trois pilotes. Puis le formulaire
piloté par schéma, le panier multi-enfants, le devis ligne par ligne.

**Livrable :** un parent inscrit deux enfants à trois cours depuis son téléphone, et le total est
exactement celui que le club calcule à la main dans son Excel. C'est le test qui compte.

### Semaine 3 · le premier euro

Stripe Connect, échéancier, webhooks, réconciliation, facture PDF, emails de confirmation.

**Livrable :** une inscription réelle payée de bout en bout sur le compte d'un club pilote.
C'est la démo qui ferme des contrats.

### Semaine 4 · le dashboard du trésorier

Reste à encaisser, liste des inscriptions, saisie des chèques avec date d'encaissement, export CSV.

### Semaine 5 · faire entrer l'Excel

Import, paiements historiques non facturés, première relance.

> Le fichier d'un vrai club contient quatre formats de date dont un où le mois et le jour sont
> inversés une ligne sur cinq, des cellules fusionnées, et une colonne Nom qui contient parfois deux
> enfants. Compte cinq jours pleins, pas deux.

### Semaines 6 à 8

Justificatifs et Pass Sport, liste d'attente avec sa machine à états, puis durcissement :
rejeu des webhooks, restauration de sauvegarde testée pour de vrai, réconciliation quotidienne.

### Semaines 9 et 10

Premier club en production, puis deux de plus, et clôture de la V1.

---

## 7. Les tests, le minimum non négociable

Tu n'as pas le temps d'une couverture large. Tu as le temps de ces quatre-là, et tu ne peux pas
t'en passer parce qu'ils touchent à l'argent.

| Quoi | Outil | Pourquoi |
|---|---|---|
| Le moteur de tarification | Vitest | Un prix faux au premier parent avec deux enfants, et le club rouvre Excel le jour même |
| La signature et l'idempotence des webhooks | Vitest | Un webhook rejoué qui double un paiement est un litige |
| La numérotation des factures | Vitest, en concurrence | Un trou dans la séquence est un problème légal |
| Le tunnel complet, paiement compris | Playwright | Le seul parcours dont la casse est invisible jusqu'au premier appel du bureau |

Une action GitHub qui lance `tsc`, `vitest` et le lint sur chaque PR. Pas de couverture cible,
juste l'assurance que rien ne casse en silence.

---

## 8. Les commandes du quotidien

```bash
npm run dev                              # développement
npx drizzle-kit generate                 # créer une migration depuis le schéma
npx drizzle-kit migrate                  # l'appliquer (via DIRECT_URL)
npx react-email dev                      # prévisualiser les emails
stripe listen --forward-to localhost:3000/api/webhooks/stripe
npx vitest                               # tests unitaires
npx playwright test                      # parcours complet
```

---

## 9. Ce que je ne mets pas, et pourquoi

| Écarté | Raison |
|---|---|
| Monorepo, Turborepo | Une seule application. La complexité arrive avant le bénéfice. |
| Redis, BullMQ | Une table Postgres fait le travail à 100 clubs, et un service de moins à surveiller. |
| Prisma | Drizzle génère du SQL lisible, ce qui compte quand tu écris des exports et débogues la RLS. |
| tRPC | Les Server Actions de Next suffisent, et c'est une abstraction de moins à expliquer. |
| Une bibliothèque de composants | Cinq composants maison sur tes tokens, c'est deux jours et zéro dette de personnalisation. |
| Puppeteer pour les PDF | Chromium ne tient pas en serverless. `@react-pdf/renderer` rend à la demande. |
| Docker en développement | Supabase gère la base. Docker n'apporte rien et coûte du temps de démarrage. |
| Le mode test Stripe comme preuve | Il ne prouve rien : vérification instantanée, 3DS toujours réussi, webhooks dans l'ordre. Teste en production sur de petits montants réels. |

---

## 10. L'ordre de priorité, si la semaine dérape

Quand tu prends du retard, tu coupes dans cet ordre, en partant du bas :

1. Le moteur de tarification et le devis figé · **jamais**
2. Stripe et la réconciliation · **jamais**
3. Le socle RLS et les sauvegardes · **jamais**
4. Le tunnel d'inscription
5. Le dashboard de recouvrement
6. L'import Excel
7. La liste d'attente
8. Les justificatifs
9. Les emails groupés · coupe en premier
