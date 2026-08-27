# OnClub, le socle technique

Décisions tranchées, pas une liste d'options. Contexte : un développeur seul, assisté par IA,
cible octobre 2026.

---

## La stack

| Couche | Choix | Pourquoi | Coût |
|---|---|---|---|
| Base de données | **Supabase Pro**, projet unique, région Paris | Postgres standard plus Auth, Storage et Studio livrés le jour 1. Tu ne codes ni back office ni stockage, et tu pars quand tu veux avec un `pg_dump`. | 30 $/mois |
| Multi tenant | **RLS Postgres**, rôle applicatif non propriétaire, `FORCE ROW LEVEL SECURITY`, vues en `security_invoker` | Sans ces trois lignes la RLS est ignorée par l'ORM et par les vues d'export, et un club lit les encaissements des autres. | 0 € |
| Connexions | **Supavisor** en mode transaction, port 6543, `prepare:false` | Vercel ouvre une connexion par invocation, Supabase plafonne vers 60. Sans pooler, tout tombe le premier soir de rentrée. | inclus |
| ORM | **Drizzle** plus drizzle-kit | Schéma TypeScript typé, migrations SQL lisibles, contrôle total sur les requêtes d'export. | 0 € |
| Application | **Next.js App Router sur Vercel Pro**, fonctions épinglées en région cdg1 | Une seule stack TypeScript du site public au dashboard aux emails, et les fonctions restent à côté de la base. | 30 $/mois |
| Jobs | Table `job_queue` Postgres avec `FOR UPDATE SKIP LOCKED`, route `/api/tick` en cron, plus un worker Render pour exports et PDF | Zéro Redis, zéro service à surveiller. Les jobs de plusieurs minutes ne tiennent pas dans une fonction serverless. | 10 $/mois |
| Paiement | **Stripe Connect Express en destination charges** (`transfer_data.destination`, `on_behalf_of`, `application_fee_amount`) | Le club encaisse en son nom, tu prélèves ta commission à la source, et tu n'es jamais encaisseur pour compte de tiers, donc pas d'agrément ACPR. | inclus dans le taux |
| Emails | **Resend** plus **React Email**, un seul domaine `mail.onclub.app`, `From` au nom du club et `Reply-To` du club | Une seule réputation d'envoi que tu contrôles, au lieu de cent qui partent de zéro en septembre. | 20 $/mois |
| Fichiers | **Supabase Storage**, buckets privés, URL signées 60 secondes | Inclus. Une colonne `storage_provider` te laisse déporter un bucket sensible plus tard sans migration. | inclus |
| Factures PDF | **@react-pdf/renderer**, généré au premier téléchargement | Pas de Chromium en serverless. Tu passes de 40 000 rendus concentrés en septembre à quelques milliers étalés. | 0 € |
| i18n | **next-intl** pour l'interface et les emails, table `i18n_label` pour les référentiels | Les clés fr, es et en existent dès le jour 1 avec repli sur fr. Tu ne rédiges que le français. | 0 € |
| Sauvegardes | `pg_dump` chiffré toutes les 6 h vers Backblaze B2, plus un `rclone` du Storage | Les sauvegardes chez ton hébergeur ne sont pas des sauvegardes. | 3 $/mois |
| Monitoring | Sentry région EU, UptimeRobot, heartbeat sur `/api/tick` | Un tick qui ne tourne plus, c'est 300 offres de place qui expirent en silence. | 0 € au départ |

**Total infra : environ 110 euros par mois à 10 clubs**, soit 11 euros par club. Ce n'est pas ton problème.

---

## Ton vrai problème : EasyPay n'a pas de marge

Il faut le dire au CEO avant de vendre.

Une cotisation de 100 euros payée en trois fois te rapporte 2,90 euros. Stripe prend trois fois
(0,50 + 0,25), soit 2,25 euros, plus 0,25 de frais Connect. **Il te reste 0,40 euro, soit 0,4 % net.**

Un club EasyPay de 200 familles à 300 euros génère environ 240 euros net sur la saison. C'est moins
que le minimum de 590 euros, et moins que ses 11 euros par mois d'infrastructure.

**Sur EasyPay, la marge n'est pas le pourcentage, c'est le minimum de 590 euros.** EasyPay est en
réalité un forfait annuel à 590 euros, avec le pourcentage qui prend le relais au delà. Il faut
soit l'assumer dans le discours, soit remonter le taux, soit facturer le 3x à part.

À l'inverse, un club OnClub à 600 000 euros encaissés génère 29 400 euros de commission, dont environ
12 000 partent chez Stripe. Il reste 17 400 euros net sur la saison. La formule signature, elle, tient.

---

## L'ordre de construction

| # | Étape | Jours | Ce que ça débloque |
|---|---|---|---|
| 1 | Fondations RLS, tenant, sauvegardes | 3 | Tout le reste peut s'écrire sans risque de fuite entre clubs. La seule étape non rattrapable. |
| 2 | Identité, rôles, `guardianship` | 2 | Un parent qui inscrit trois enfants, un coach qui est aussi parent, un mineur sans email. |
| 3 | Catalogue de plans et gating des trois formules | 2 | Ta demande n°1, et l'essai de 30 jours sans une ligne de logique métier. Aucun `if` sur le nom du plan. |
| 4 | Moteur de tarification et devis figé | 5 | Le formulaire, les factures, la liste d'attente. La seule pièce que tu ne pourras jamais recalculer après coup. |
| 5 | Formulaire piloté par schéma | 4 | Le cas le plus dur, plus le mode saisie par le bureau. |
| 6 | Stripe Connect, échéancier, webhooks | 6 | Le premier euro. Sans la réconciliation, une famille est débitée sans inscription. |
| 7 | Factures, avoirs, paiements manuels | 3 | Le trésorier abandonne son Excel, et tu arrêtes de relancer des familles qui ont déjà payé. |
| 8 | File de jobs et emails transactionnels | 5 | La promesse « ne chassez plus les mauvais payeurs ». La brique de temps resservira pour les convocations. |
| 9 | Exports asynchrones | 2 | Ta demande n°3 : le comptable, la fédération, la mairie. |
| 10 | Liste d'attente | 4 | L'argument de vente d'OnClub et le meilleur levier d'upsell depuis EasyPay. |
| 11 | Dashboard trésorier et minimum de saison | 3 | Le renouvellement, et la fin de la facture surprise de juin qui est ton churn n°1. |
| 12 | Site du club et planning | 7 | En octobre. La bascule commerciale d'EasyPay vers OnClub. |
| 13 | Campagnes emails | 4 | En novembre, hors période critique, sans risquer la délivrabilité des factures. |
| 14 | Boutique et billetterie | 10 | En décembre, prêt pour les galas de mai et juin. |

Les étapes 1 à 11 font 39 jours de première écriture. Sans tests, sans recette, sans support, sans
import Excel. Le périmètre réel est plutôt **85 jours**.

---

## Les huit murs, ceux qui coûtent trois jours chacun

1. **L'onboarding Stripe Connect d'une association loi 1901.** Ni un particulier ni une société commerciale. Stripe demande le RNA ou le SIREN, les statuts, le récépissé de préfecture et la pièce du représentant légal. Le président ne les a pas sous la main. À tester sur un vrai club avant de promettre quoi que ce soit.
2. **La délivrabilité chez Orange, Free et SFR.** Gmail et Outlook pardonnent à un domaine neuf bien configuré. Orange non : il met en quarantaine sans feedback loop. Il faut chauffer le domaine dès maintenant, pas en octobre.
3. **Le PDF qui marche en local et pas en production.** Les polices doivent être lisibles depuis le système de fichiers, et Next.js ne les embarque pas dans le bundle serverless sans configuration.
4. **Les photos depuis un téléphone.** Les HEIC d'iPhone ne se décodent pas dans un canvas sur Chrome Android ni sur plusieurs Safari, et l'orientation EXIF retourne les images.
5. **Le fichier Excel du club.** 380 lignes, quatre formats de date dont un où le mois et le jour sont inversés une ligne sur cinq, des cellules fusionnées, une colonne Nom qui contient parfois deux enfants.
6. **Le mode test Stripe ne prouve rien.** En test, la vérification Connect est instantanée, le 3DS réussit toujours, les webhooks arrivent dans l'ordre en 200 ms. En production, rien de tout ça.
7. **La course entre le verrou de capacité et le webhook.** Un 3DS repris quarante minutes plus tard sur un autre onglet confirme après l'expiration du verrou, et la place est vendue deux fois.
8. **La numérotation de facture sans trou face aux rejeux Stripe.** Si la transaction échoue après avoir consommé un numéro, il y a un trou, et c'est un problème légal.

---

## Le verdict, sans emballage

**Le plan tel qu'écrit ne sort pas mi septembre.** Une seule chose est atteignable : la première
inscription payée d'un vrai parent, autour du 10 au 15 octobre, sur deux clubs pilotes accompagnés
à la main.

Condition non négociable : **geler le périmètre par écrit à cinq briques** (fondations, identité,
tarification, formulaire, Stripe) et ne rien ajouter avant que le premier euro soit encaissé.
