/*
  L'ACCUEIL EN ANGLAIS ET EN ESPAGNOL (/en, /es).

  Traduction de l'accueil français (src/pages/index.astro) : mêmes sections,
  mêmes chiffres, mêmes faits. Les chiffres de temps ne sont JAMAIS retapés :
  ils viennent de src/data/temps.ts (TACHES, TOTAL, OFFRES.heures) ; seuls les
  mots qui les entourent sont traduits ici.

  Le produit est en français (interface, formulaires, e-mails : /Users/bertone/
  Dev/onclub/app/layout.tsx lang="fr", aucune bibliothèque de traduction) et
  encaisse en euros : la FAQ le dit. Toute autre page du site est en français :
  chaque lien qui y mène est signalé (étiquette « FR », hreflang="fr").

  Vocabulaire repris de public/i18n.js (ancien site), sans ce qui est devenu
  interdit (« relances automatiques »). Anglais britannique (cheque, organise).
*/
import type { CleTemps } from '../data/temps'
import type { CleOffre } from '../data/site'

export type Langue = 'en' | 'es'

type Tache = { tache: string; calcul: string; comment: string }
type Ligne = { nom: string; detail?: string; statut?: string; ton?: 'ok' | 'ko' | 'neutre' }
export type Ecran = {
  famille: string; titre: string; texte: string; lien: string; lienNom: string
  asso: string; ecranTitre: string; ecranSous?: string; lignes: Ligne[]
  pied?: { libelle: string; valeur: string }; bouton?: string; legende: string
}

export type Textes = {
  html: string; ogLocale: string; ogAlternate: string[]; inLanguage: string
  titre: string; description: string; imageAlt: string; nomPage: string; orgDescription: string
  saut: string; marqueAria: string
  nav: { aria: string; fonctions: string; temps: string; offres: string; faq: string; menu: string; demo: string; langues: string }
  versFr: string; versFrSr: string
  ouverture: {
    accroche: string; h1: string; chapo: string; villeDefaut: string; villeModele: string
    demo: string; calcul: string; pour: string; langueNote: string
  }
  scene: {
    aria: string; fiche: string; ficheNom: string; ficheNe: string; aRecopier: string
    cheque: string; chequeDepot: string; chequeMontant: string; tableur: string
    relance: string; relanceTexte: string; certificat: string; manquant: string; message: string
    range: string; rangeListe: string[]; rendues: string; moments: [string, string, string]
    cptAvant: string; cptApres: string; note: string; noteLien: string
  }
  temps: {
    surtitre: string; h2: string; intro: string; injepTexte: string; injepSource: string
    blocTitre: string; blocAria: string; aujourdhui: string; avecOnclub: string
    hypotheses: string; voirCalcul: string
  }
  taches: Partial<Record<CleTemps, Tache>>
  fonctions: { surtitre: string; h2: (n: number) => string; intro: string; tout: string }
  familles: Record<string, { nom: string; phrase: string }>
  fonctionnalites: Record<string, { nom: string; ligne: string }>
  ecrans: { surtitre: string; h2: string; intro: string; exemple: string; items: Ecran[] }
  calc: {
    surtitre: string; h2: string; intro: string; label: string; curseur: string; sansJs: string
    aujourdhui: string; avec: string; rendues: string; caption: string; tache: string; note: string; noteLien: string
  }
  points: {
    surtitre: string; h2: string
    benevole: { titre: string; chapo: string; items: [string, string][] }
    membre: { titre: string; chapo: string; items: [string, string][] }
    demo: string; transmettre: string
  }
  transmettre: {
    titre: string; texte: string; whatsapp: string; email: string; sujet: string; message: string
    outil: string
  }
  assos: {
    surtitre: string; h2: string; intro: string
    cartes: { etiquette: string; nom: string; ligne: string; cle: 'sports' | 'musique' | 'activites' | 'tresorier' | 'toutes' }[]
  }
  offres: {
    surtitre: string; h2: string; intro: string; rendues: string; leg: (boutique?: string) => string
    taux: Record<CleOffre, string>; ouvre: Record<CleOffre, string[]>; voir: (nom: string) => string
    note: string; noteLien: string; detail: string
  }
  ressources: { surtitre: string; h2: string; intro: string; tout: string; etiquettes: Record<'guides' | 'articles' | 'comparatifs', string> }
  faqTitre: string
  faq: { question: string; reponse: string }[]
  appel: { surtitre: string; titre: string; texte: string; preparer: string; whatsapp: string; email: string; sujet: string; message: string; membre: string; membreLien: string }
  pied: {
    phrase: string; demo: string; surPage: string; surSite: string; contact: string
    liens: { fonctions: string; tarifs: string; temps: string; ressources: string; pourQui: string; presentation: string; recommander: string }
    mentions: string; confidentialite: string; conditions: string; cookies: string; aria: string; note: string
  }
  consentement: { titre: string; texte: string; plus: string; refuser: string; accepter: string }
}

export const TEXTES: Record<Langue, Textes> = {
  /* ======================================================================= */
  en: {
    html: 'en',
    ogLocale: 'en_GB',
    ogAlternate: ['fr_FR', 'es_ES'],
    inLanguage: 'en',
    titre: 'Online registration and fees for associations | OnClub',
    description: 'Sick of spending your evenings on paperwork? OnClub takes your association’s registrations, fees and reminders online: sport, music, dance.',
    imageAlt: 'The OnClub logo on a mint background',
    nomPage: 'OnClub in English',
    orgDescription: 'French platform for associations that register members: online registration, membership fees, reminders, seasons, website and shop.',
    saut: 'Skip to content',
    marqueAria: 'OnClub, English home page',
    nav: { aria: 'Main', fonctions: 'Features', temps: 'Time saved', offres: 'Pricing', faq: 'FAQ', menu: 'Menu', demo: 'Book a demo', langues: 'Language' },
    versFr: 'FR',
    versFrSr: '(page in French)',
    ouverture: {
      accroche: 'Your club, all in one.',
      h1: 'Sick of spending your evenings on paperwork?',
      chapo: 'OnClub takes your association’s registrations, membership fees, reminders and next season online. Families register and pay on their own; the board stops re-typing anything.',
      villeDefaut: 'All over France, volunteers have better things to do than re-type forms.',
      villeModele: 'In {ville} as everywhere else, volunteers have better things to do than re-type forms.',
      demo: 'Book a demo',
      calcul: 'Calculate my time saved',
      pour: 'For every association that registers members: sport, music, dance, theatre, languages…',
      langueNote: 'OnClub is a French platform. This page is in English; pages marked FR are in French.',
    },
    scene: {
      aria: 'Illustration: an association’s admin clutter is tidied into OnClub. About 5 hours a season are left instead of 66, and the time given back goes to Saturday at the side of the pitch, Thursday rehearsal and the evening with family.',
      fiche: 'Registration form', ficheNom: 'Name: ……………', ficheNe: 'Born: … / … / ……', aRecopier: 'To re-type',
      cheque: 'Cheque 3 of 4', chequeDepot: 'To pay in on 5 November', chequeMontant: '€45.00',
      tableur: 'fees_2026_FINAL(3).xlsx',
      relance: 'Reminder no. 3', relanceTexte: 'September fee, still nothing',
      certificat: 'Medical certificate', manquant: 'Missing',
      message: 'Hi, is there still room on Wednesday?',
      range: 'Tidied into OnClub',
      rangeListe: ['The family registers alone', 'Paid online', 'The money up to date', 'Reminders in one click', 'Documents by photo', 'Messages to the right group'],
      rendues: 'given back, for:',
      moments: ['Saturday at the side of the pitch', 'Thursday’s rehearsal', 'the evening with family'],
      cptAvant: 'of admin per season, today',
      cptApres: 'per season with OnClub, instead of',
      note: 'OnClub estimate for 250 members, not a study.',
      noteLien: 'See the assumptions',
    },
    temps: {
      surtitre: 'The time',
      h2: '66 hours of admin per season. 5 are left.',
      intro: 'For an association of 250 members, re-typing forms, tracking payments, chasing late payers, collecting documents and preparing next season takes about 66 hours a season. With OnClub, about 5 are left: 61 hours given back for coaching, rehearsing, playing, or simply getting home earlier.',
      injepTexte: 'of volunteers in sports associations name administrative tasks among what they do: it is the activity they mention most.',
      injepSource: 'INJEP (French youth and community research institute), Analyses & synthèses no. 71, October 2023',
      blocTitre: 'Today → with OnClub, for 250 members',
      blocAria: 'The time saved',
      aujourdhui: 'Today',
      avecOnclub: 'With OnClub',
      hypotheses: 'OnClub estimate, not a study: 250 members, 6 minutes to re-type a form, 3 minutes of follow-up per file, 40 families reminded three times, 80 documents to chase, 12 hours to prepare next season.',
      voirCalcul: 'See the calculation',
    },
    taches: {
      fiches: { tache: 'Re-typing registration forms', calcul: '250 files × 6 min', comment: 'the family enters it themselves' },
      paiements: { tache: 'Tracking payments in a spreadsheet', calcul: '250 files × 3 min', comment: 'the dashboard keeps it up to date' },
      relances: { tache: 'Chasing late payments', calcul: '40 families × 3 reminders × 5 min', comment: 'a reminder in one click' },
      pieces: { tache: 'Chasing missing documents', calcul: '80 documents × 5 min', comment: 'checked by photo, chased in one click' },
      rentree: { tache: 'Preparing next season', calcul: 'lists, teams, places', comment: 'next season opens, groups are carried over' },
    },
    fonctions: {
      surtitre: 'Features',
      h2: (n) => `Everything that ate your evenings, in ${n} simple moves.`,
      intro: 'Two or three words for the name, one line for what it saves you. Each one has its own page with an example, in French.',
      tout: 'All the features, family by family',
    },
    familles: {
      Inscrire: { nom: 'Register', phrase: 'The family registers alone; the board re-enters nothing.' },
      Encaisser: { nom: 'Collect', phrase: 'Money comes in at registration; every euro owed stays visible.' },
      Organiser: { nom: 'Organise', phrase: 'The season, the groups and the teams, without starting over.' },
      Communiquer: { nom: 'Communicate', phrase: 'The right families get the right message.' },
      Vendre: { nom: 'Sell', phrase: 'Kits and workshops, sold without a separate kitty.' },
      Piloter: { nom: 'Manage', phrase: 'Figures, exports and licences, ready when you need them.' },
    },
    fonctionnalites: {
      'inscription-en-ligne': { nom: 'Online registration', ligne: '25 h less data entry per season' },
      'pieces-justificatives': { nom: 'Supporting documents', ligne: 'Sent as a photo, checked, chased in one click' },
      'seances-essai': { nom: 'Trial sessions', ligne: 'Newcomers book on their own; you know who’s coming' },
      'formulaire-sur-mesure': { nom: 'Custom form', ligne: 'Your own questions, added in one sentence' },
      'reinscriptions': { nom: 'Priority re-registration', ligne: 'Returning members first, their place kept' },
      'liste-attente': { nom: 'Waiting list', ligne: 'A freed place offered to the next in line in one click' },
      'paiement-en-ligne': { nom: 'Online payment', ligne: 'Paid at registration, in one or several instalments' },
      'relance-un-clic': { nom: 'One-click reminder', ligne: '10 h of reminders cut to 40 min' },
      'aides-deduites': { nom: 'Grants deducted', ligne: 'Pass’Sport deducted at registration, proof tracked' },
      'saison-suivante': { nom: 'Next season', ligne: 'Next season ready in 2 h instead of 12' },
      'espace-encadrant': { nom: 'Coach space', ligne: 'The register from their phone, no account' },
      'convocations': { nom: 'Online call-ups', ligne: 'Families answer in one click, no account' },
      'compo-du-match': { nom: 'Match line-up', ligne: 'One tap, and the player is in position' },
      'messages-familles': { nom: 'Messages to families', ligne: '6 h 40 less writing per season' },
      'site-association': { nom: 'Association website', ligne: '4 h of updates without an agency' },
      'assistant-cluby': { nom: 'Cluby assistant', ligne: 'You ask in one sentence; it prepares' },
      'boutique-en-ligne': { nom: 'Online shop', ligne: '12 h 30 less order handling per season' },
      'vente-au-comptoir': { nom: 'Counter sales', ligne: 'The match-day stand takes payments, counted separately' },
      'evenements-stages': { nom: 'Events and workshops', ligne: '10 h less organising per season' },
      'suivi-des-paiements': { nom: 'Payment tracking', ligne: '12 h 30 of spreadsheet work cut to 1 h' },
      'exports-comptables': { nom: 'Accounting exports', ligne: 'Accounts, registrations and licences as spreadsheets' },
      'liste-des-licences': { nom: 'Licence list', ligne: 'Who to declare, ready for the federation portal' },
      'reprise-des-fichiers': { nom: 'File import', ligne: 'Your spreadsheets imported, returning members recognised' },
    },
    ecrans: {
      surtitre: 'For real',
      h2: 'Watch it run.',
      intro: 'OnClub’s screens as families and the board see them, translated for this page. Names and amounts are fictitious.',
      exemple: 'Example',
      items: [
        {
          famille: 'Register', titre: 'The family registers from the sofa.',
          texte: 'One form for the whole family, the right classes or teams suggested from the year of birth, payment straight after. The board never re-types a form.',
          lien: '/fonctionnalites/inscription-en-ligne', lienNom: 'Online registration',
          asso: 'Demo Volley Club', ecranTitre: 'Registration 2026–2027', ecranSous: 'One form for the whole family',
          lignes: [
            { nom: 'Léa, born 2013', detail: 'Under-15 girls · Monday 6 pm · €120', statut: '4 places left', ton: 'ok' },
            { nom: 'Hugo, born 2016', detail: 'Under-11 mixed · Wednesday 2 pm · €105', statut: '6 places left', ton: 'ok' },
            { nom: 'Association membership', detail: 'Whole family · €15' },
          ],
          pied: { libelle: 'Total', valeur: '€240' }, bouton: 'Pay by card, in 3 instalments',
          legende: 'Registration as the family sees it, fictitious data.',
        },
        {
          famille: 'Collect', titre: 'One late payment, one click, one reminder.',
          texte: 'The dashboard tells you who owes what. The reminder is written with the right amount and the right payment link: you read it, it goes.',
          lien: '/fonctionnalites/relance-un-clic', lienNom: 'One-click reminder',
          asso: 'Demo Volley Club', ecranTitre: '3 families behind on payment', ecranSous: 'Season 2026–2027 · in progress',
          lignes: [
            { nom: 'Roux family', detail: 'Under-13 boys · paid €160 of €480', statut: 'Late', ton: 'ko' },
            { nom: 'Lambert family', detail: 'Under-15 girls · paid €110 of €330', statut: 'Late', ton: 'ko' },
            { nom: 'Haddad family', detail: 'Under-11 mixed · paid €95 of €285', statut: 'Late', ton: 'ko' },
          ],
          pied: { libelle: 'Left to collect', valeur: '€730' }, bouton: 'Remind the Lambert family',
          legende: 'The board’s dashboard, fictitious data.',
        },
        {
          famille: 'Organise', titre: 'Next season, without redoing everything.',
          texte: 'Last year’s groups are carried over; returning members re-register first through their own link, and their place is kept.',
          lien: '/fonctionnalites/saison-suivante', lienNom: 'Next season',
          asso: 'Demo Volley Club', ecranTitre: '2027–2028 · in preparation', ecranSous: '14 back out of 31 returning · 3 places kept',
          lignes: [
            { nom: 'Under-15 girls', detail: '9 of 12 · 3 returning players not heard from', statut: '3 places free', ton: 'neutre' },
            { nom: 'Under-13 girls', detail: '8 of 12 · 4 returning players not heard from', statut: '4 places free', ton: 'neutre' },
            { nom: 'Léa M., born 2014', detail: 'Moves up to Under-15 girls', statut: 'Place kept', ton: 'ok' },
          ],
          bouton: 'Notify 9 families',
          legende: 'Preparing next season, fictitious data.',
        },
        {
          famille: 'Organise', titre: 'On Saturday, the line-up takes one tap.',
          texte: 'The coach sees who answered the call-up and puts everyone in position from their phone, with no account.',
          lien: '/fonctionnalites/compo-du-match', lienNom: 'Match line-up',
          asso: 'Demo Volley Club', ecranTitre: 'Senior women · Saturday match', ecranSous: 'Answers to the call-up',
          lignes: [
            { nom: 'Manon', detail: 'Setter', statut: 'Present', ton: 'ok' },
            { nom: 'Jade', detail: 'Middle blocker', statut: 'Present', ton: 'ok' },
            { nom: 'Lou', detail: 'Outside hitter', statut: 'Present', ton: 'ok' },
            { nom: 'Clara', detail: 'Middle blocker', statut: 'Absent', ton: 'ko' },
          ],
          pied: { libelle: 'Answered', valeur: '9 of 10' }, bouton: 'Save the line-up',
          legende: 'The coach’s phone, fictitious data.',
        },
      ],
    },
    calc: {
      surtitre: 'The calculator',
      h2: 'How much time will your association save?',
      intro: 'Enter your number of members: the five tasks are recalculated. Four follow the number of members; preparing next season stays fixed.',
      label: 'Number of members in your association',
      curseur: 'Number of members, slider',
      sansJs: 'Calculation shown for 250 members.',
      aujourdhui: 'Today', avec: 'With OnClub', rendues: 'Given back each season',
      caption: 'The five tasks, recalculated', tache: 'Task',
      note: 'An estimate, not a promise: the method and the assumptions are on',
      noteLien: 'the time-saved page',
    },
    points: {
      surtitre: 'Two points of view',
      h2: 'The point of a club is to create moments. Not to suffer the paperwork.',
      benevole: {
        titre: 'For the volunteer',
        chapo: 'You get your evenings back.',
        items: [
          ['No more forms to re-type', ': the family enters everything.'],
          ['The money up to date without a spreadsheet', ': paid, due, late, at a glance.'],
          ['A reminder at the push of a button', ', read by you before it goes.'],
          ['Documents by photo', ', checked and chased in one click.'],
          ['Next season', ' ready in 2 hours instead of 12.'],
        ],
      },
      membre: {
        titre: 'For the member and the parent',
        chapo: 'What used to take endless back-and-forth now happens on the phone.',
        items: [
          ['Register from the sofa', ', the whole family in one form.'],
          ['Pay in instalments', ', by card.'],
          ['Answer a call-up', ' in one click, with no account.'],
          ['Upload the certificate', ' as a photo.'],
          ['Order the kit', ' online, collect it at the club.'],
        ],
      },
      demo: 'Book a demo',
      transmettre: 'Pass it on to my club',
    },
    transmettre: {
      titre: 'Pass it on to my club',
      texte: 'A short message for your board, ready to send from your phone. You choose who receives it; nothing is sent to OnClub.',
      whatsapp: 'Send on WhatsApp',
      email: 'Send an email',
      sujet: 'A tool to save the board time: OnClub',
      message: 'Hello, I came across OnClub, a French platform for associations: families register and pay online, the money stays up to date and reminders go out at the push of a button. By their estimate, about 61 hours a season are given back for an association of 250 members. Have a look: https://onclub.app/en',
      outil: 'The full tool, in French',
    },
    assos: {
      surtitre: 'For every association',
      h2: 'A football club, a music school, a theatre company.',
      intro: 'As soon as there are registrations, classes or teams, and membership fees, OnClub adapts: each class or team has its own time slots, room, places and price, and the registration form follows your catalogue.',
      cartes: [
        { cle: 'sports', etiquette: 'Sport', nom: 'Sports clubs', ligne: 'Teams, call-ups, line-ups and licences' },
        { cle: 'musique', etiquette: 'Activity', nom: 'Music schools', ligne: 'Instruments, levels, teachers and rooms' },
        { cle: 'activites', etiquette: 'Activity', nom: 'Dance, theatre, languages', ligne: 'Classes, time slots, places and trial sessions' },
        { cle: 'tresorier', etiquette: 'Your role', nom: 'Treasurer', ligne: 'The money tracked without a spreadsheet' },
        { cle: 'toutes', etiquette: 'And all the others', nom: 'Sport, music, dance, theatre, languages…', ligne: 'See every kind of association' },
      ],
    },
    offres: {
      surtitre: 'Pricing',
      h2: 'A percentage-based subscription. The more you hand over, the more time you save.',
      intro: 'A percentage of the membership fees collected online, nothing fixed. Nothing on cheques or cash.',
      rendues: 'given back per season*',
      leg: (b) => `of membership fees collected online${b ? `, + ${b} on the shop` : ''}. Nothing fixed.`,
      taux: { mini: '2.90%', pro: '4.90%', max: '6.90%' },
      ouvre: {
        mini: ['Online registration and trial sessions', 'Card payment, in one or several instalments', 'Money dashboard', 'Reminders at the push of a button', 'Supporting documents', 'Spreadsheet exports'],
        pro: ['Everything in Mini', 'Next season and re-registration', 'Waiting list', 'Messages to families', 'The association’s website', 'Cluby, the assistant: 100 questions a month'],
        max: ['Everything in Pro', 'The shop, online and at the counter', 'Events and workshops', 'Cluby, unlimited'],
      },
      voir: (nom) => `See ${nom} in a demo`,
      note: '* OnClub estimate for an association of 250 members, not a study. Mini covers the forms, payment tracking, reminders and documents (51 h). Pro adds next season (10 h), messages to families (10 messages cut from 45 to 5 minutes, 6 h 40), the waiting list (20 places cut from 10 minutes to 1, 3 h) and the website updated without an agency (4 h). Pro Max IA adds the shop (150 orders cut from 6 minutes to 1 at collection, 12 h 30) and events (4 events cut from 3 hours to 30 minutes, 10 h). Nothing is taken on cheques or cash. Card fees are paid by the association:',
      noteLien: 'see the worked example',
      detail: 'Plan details and a worked example',
    },
    ressources: {
      surtitre: 'Resources',
      h2: 'Guides for the board, without jargon.',
      intro: 'Written for French associations, in French.',
      tout: 'All guides and articles',
      etiquettes: { guides: 'Guide', articles: 'Article', comparatifs: 'Comparison' },
    },
    faqTitre: 'Frequently asked questions',
    faq: [
      { question: 'Which associations is OnClub for?', reponse: 'For every association that registers members, with classes or teams and membership fees: sports clubs, music, dance, theatre and language schools, choirs, workshops. In OnClub, each class or team has its discipline, level, coaches or teachers, room, time slots, places and price. OnClub is a French platform: the interface, the forms families fill in and the emails are in French, and payments are in euros.' },
      { question: 'How much does OnClub cost?', reponse: 'A percentage-based subscription on the membership fees collected online: 2.90% with OnClub Mini, 4.90% with Pro, 6.90% with Pro Max IA, plus 2% on the shop. Nothing fixed, and nothing on cheques or cash. Card fees are paid by the association.' },
      { question: 'Where do the 61 hours given back come from?', reponse: 'It is an OnClub estimate for an association of 250 members, not a study: 66 hours a season today to re-type forms, track payments, chase late payers, collect documents and prepare next season, against about 5 hours with OnClub. The calculation and the assumptions are on the time-saved page.' },
      { question: 'Do families need to create an account?', reponse: 'No. The family fills in a single form for all its members, from their phone. They receive a summary by email and can then find their file again through their link. For a call-up, they answer present or absent straight from the email.' },
      { question: 'How quickly is our association up and running?', reponse: 'Online in fifteen days, with a pre-delivery on day ten so we can check everything together. Your spreadsheets from last season are imported: returning members are recognised and receive their re-registration link.' },
      { question: 'I am a member or a parent: how can I suggest OnClub to my club?', reponse: 'Use the “Pass it on to my club” button on this page: it prepares a short message for the board, to send by WhatsApp or email, with what the association gains. Nothing to install and nothing to fill in for us.' },
    ],
    appel: {
      surtitre: 'Book a demo',
      titre: 'Give your volunteers their evenings back.',
      texte: 'A demo with your classes or teams, your prices and your questions. Online in fifteen days, with a pre-delivery on day ten so we can check everything together.',
      preparer: 'Prepare my demo',
      whatsapp: 'Write on WhatsApp',
      email: 'Send an email',
      sujet: 'OnClub demo',
      message: 'Hello, I would like an OnClub demo for our association.',
      membre: 'Are you a member or a parent?',
      membreLien: 'Pass it on to my club',
    },
    pied: {
      phrase: 'The point of a club is to create moments. Not to suffer the paperwork.',
      demo: 'Book a demo',
      surPage: 'On this page',
      surSite: 'The site, in French',
      contact: 'Contact',
      liens: { fonctions: 'All features', tarifs: 'Pricing', temps: 'Time saved', ressources: 'Guides and articles', pourQui: 'Who it’s for', presentation: 'The presentation', recommander: 'Pass it on to my club' },
      mentions: 'Legal notice', confidentialite: 'Privacy', conditions: 'Terms', cookies: 'Cookies and location',
      aria: 'Site map',
      note: 'Pages marked FR are in French.',
    },
    consentement: {
      titre: 'Adapt the site to your town?',
      texte: 'If you accept, we work out your approximate town from your connection. Nothing is stored, no third-party service.',
      plus: 'Learn more (in French)',
      refuser: 'Decline',
      accepter: 'Accept',
    },
  },

  /* ======================================================================= */
  es: {
    html: 'es',
    ogLocale: 'es_ES',
    ogAlternate: ['fr_FR', 'en_GB'],
    inLanguage: 'es',
    titre: 'Inscripciones y cuotas de asociaciones en línea | OnClub',
    description: '¿Harto de pasar tus noches con el papeleo? OnClub lleva en línea las inscripciones, cuotas y recordatorios de tu asociación: deporte, música, danza.',
    imageAlt: 'El logotipo de OnClub sobre fondo verde menta',
    nomPage: 'OnClub en español',
    orgDescription: 'Plataforma francesa para las asociaciones que inscriben socios: inscripciones en línea, cuotas, recordatorios, temporadas, web y tienda.',
    saut: 'Ir al contenido',
    marqueAria: 'OnClub, página de inicio en español',
    nav: { aria: 'Principal', fonctions: 'Funcionalidades', temps: 'Tiempo ganado', offres: 'Precios', faq: 'Preguntas', menu: 'Menú', demo: 'Solicitar una demo', langues: 'Idioma' },
    versFr: 'FR',
    versFrSr: '(página en francés)',
    ouverture: {
      accroche: 'Tu club, todo en uno.',
      h1: '¿Harto de pasar tus noches con el papeleo?',
      chapo: 'OnClub lleva en línea las inscripciones, las cuotas, los recordatorios y la nueva temporada de tu asociación. Las familias se inscriben y pagan solas; la directiva ya no vuelve a teclear nada.',
      villeDefaut: 'En toda Francia, los voluntarios tienen cosas mejores que hacer que copiar fichas.',
      villeModele: 'En {ville}, como en todas partes, los voluntarios tienen cosas mejores que hacer que copiar fichas.',
      demo: 'Solicitar una demo',
      calcul: 'Calcular mi tiempo ganado',
      pour: 'Para todas las asociaciones que inscriben socios: deporte, música, danza, teatro, idiomas…',
      langueNote: 'OnClub es una plataforma francesa. Esta página está en español; las páginas marcadas FR están en francés.',
    },
    scene: {
      aria: 'Ilustración: el desorden administrativo de una asociación se ordena en OnClub. Quedan unas 5 horas por temporada en lugar de 66, y el tiempo recuperado vuelve al sábado junto a la pista, al ensayo del jueves y a la noche en familia.',
      fiche: 'Ficha de inscripción', ficheNom: 'Nombre: ……………', ficheNe: 'Nacido/a: … / … / ……', aRecopier: 'Por copiar',
      cheque: 'Cheque 3 de 4', chequeDepot: 'A ingresar el 5 de noviembre', chequeMontant: '45,00 €',
      tableur: 'cuotas_2026_FINAL(3).xlsx',
      relance: 'Recordatorio n.º 3', relanceTexte: 'Cuota de septiembre, todavía nada',
      certificat: 'Certificado médico', manquant: 'Falta',
      message: 'Hola, ¿queda sitio el miércoles?',
      range: 'Ordenado en OnClub',
      rangeListe: ['La familia se inscribe sola', 'Pagado en línea', 'El dinero al día', 'Recordatorio en un clic', 'Justificantes en foto', 'Mensajes al grupo correcto'],
      rendues: 'recuperadas, para:',
      moments: ['el sábado junto a la pista', 'el ensayo del jueves', 'la noche en familia'],
      cptAvant: 'de papeleo por temporada, hoy',
      cptApres: 'por temporada con OnClub, en lugar de',
      note: 'Estimación de OnClub para 250 socios, no un estudio.',
      noteLien: 'Ver las hipótesis',
    },
    temps: {
      surtitre: 'El tiempo',
      h2: '66 horas de papeleo por temporada. Quedan 5.',
      intro: 'Para una asociación de 250 socios, copiar las fichas, seguir los pagos, reclamar los retrasos, pedir los justificantes y preparar la nueva temporada lleva unas 66 horas por temporada. Con OnClub quedan unas 5: 61 horas recuperadas para entrenar, ensayar, jugar o simplemente volver antes a casa.',
      injepTexte: 'de los voluntarios de las asociaciones deportivas citan las tareas administrativas entre lo que hacen: es la actividad que más mencionan.',
      injepSource: 'INJEP (instituto público francés de la juventud y la vida asociativa), Analyses & synthèses n.º 71, octubre de 2023',
      blocTitre: 'Hoy → con OnClub, para 250 socios',
      blocAria: 'El tiempo ganado',
      aujourdhui: 'Hoy',
      avecOnclub: 'Con OnClub',
      hypotheses: 'Estimación de OnClub, no un estudio: 250 socios, 6 minutos para copiar una ficha, 3 minutos de seguimiento por expediente, 40 familias recordadas tres veces, 80 justificantes por reclamar, 12 horas para preparar la nueva temporada.',
      voirCalcul: 'Ver el cálculo',
    },
    taches: {
      fiches: { tache: 'Copiar las fichas de inscripción', calcul: '250 expedientes × 6 min', comment: 'la familia los rellena ella misma' },
      paiements: { tache: 'Seguir los pagos en una hoja de cálculo', calcul: '250 expedientes × 3 min', comment: 'el panel lo mantiene al día' },
      relances: { tache: 'Reclamar los pagos atrasados', calcul: '40 familias × 3 recordatorios × 5 min', comment: 'un recordatorio en un clic' },
      pieces: { tache: 'Pedir los justificantes que faltan', calcul: '80 justificantes × 5 min', comment: 'revisados en foto, reclamados en un clic' },
      rentree: { tache: 'Preparar la nueva temporada', calcul: 'listas, equipos, plazas', comment: 'la temporada siguiente se abre, los grupos se mantienen' },
    },
    fonctions: {
      surtitre: 'Funcionalidades',
      h2: (n) => `Todo lo que se comía tus noches, en ${n} gestos sencillos.`,
      intro: 'Dos o tres palabras para el nombre, una línea para lo que te hace ganar. Cada una tiene su página con un ejemplo, en francés.',
      tout: 'Todas las funcionalidades, por familias',
    },
    familles: {
      Inscrire: { nom: 'Inscribir', phrase: 'La familia se inscribe sola; la directiva no vuelve a teclear nada.' },
      Encaisser: { nom: 'Cobrar', phrase: 'El dinero entra con la inscripción; cada euro pendiente queda a la vista.' },
      Organiser: { nom: 'Organizar', phrase: 'La temporada, los grupos y los equipos, sin rehacerlo todo.' },
      Communiquer: { nom: 'Comunicar', phrase: 'Las familias correctas reciben el mensaje correcto.' },
      Vendre: { nom: 'Vender', phrase: 'Equipaciones y cursillos, vendidos sin un bote aparte.' },
      Piloter: { nom: 'Gestionar', phrase: 'Las cifras, las exportaciones y las licencias, listas cuando hacen falta.' },
    },
    fonctionnalites: {
      'inscription-en-ligne': { nom: 'Inscripción en línea', ligne: '25 h menos de introducción de datos por temporada' },
      'pieces-justificatives': { nom: 'Justificantes', ligne: 'Enviados en foto, revisados, reclamados en un clic' },
      'seances-essai': { nom: 'Sesiones de prueba', ligne: 'Los nuevos reservan solos; sabes quién viene' },
      'formulaire-sur-mesure': { nom: 'Formulario a medida', ligne: 'Tus propias preguntas, añadidas en una frase' },
      'reinscriptions': { nom: 'Reinscripción prioritaria', ligne: 'Los antiguos primero, con su plaza guardada' },
      'liste-attente': { nom: 'Lista de espera', ligne: 'La plaza liberada, ofrecida al siguiente en un clic' },
      'paiement-en-ligne': { nom: 'Pago en línea', ligne: 'Pagado al inscribirse, en uno o varios plazos' },
      'relance-un-clic': { nom: 'Recordatorio en un clic', ligne: '10 h de recordatorios reducidas a 40 min' },
      'aides-deduites': { nom: 'Ayudas descontadas', ligne: 'Pass’Sport descontado al inscribirse, justificante seguido' },
      'saison-suivante': { nom: 'Temporada siguiente', ligne: 'La nueva temporada lista en 2 h en lugar de 12' },
      'espace-encadrant': { nom: 'Espacio del monitor', ligne: 'Pasar lista desde su móvil, sin cuenta' },
      'convocations': { nom: 'Convocatorias en línea', ligne: 'Las familias responden en un clic, sin cuenta' },
      'compo-du-match': { nom: 'Alineación del partido', ligne: 'Un gesto, y el jugador está en su puesto' },
      'messages-familles': { nom: 'Mensajes a las familias', ligne: '6 h 40 menos de redacción por temporada' },
      'site-association': { nom: 'Web de la asociación', ligne: '4 h de actualizaciones sin proveedor externo' },
      'assistant-cluby': { nom: 'Asistente Cluby', ligne: 'Lo pides en una frase; él lo prepara' },
      'boutique-en-ligne': { nom: 'Tienda en línea', ligne: '12 h 30 menos de pedidos por temporada' },
      'vente-au-comptoir': { nom: 'Venta en mostrador', ligne: 'El puesto del partido cobra, contado aparte' },
      'evenements-stages': { nom: 'Eventos y cursillos', ligne: '10 h menos de organización por temporada' },
      'suivi-des-paiements': { nom: 'Seguimiento de pagos', ligne: '12 h 30 de hoja de cálculo reducidas a 1 h' },
      'exports-comptables': { nom: 'Exportaciones contables', ligne: 'Contabilidad, inscripciones y licencias en hoja de cálculo' },
      'liste-des-licences': { nom: 'Lista de licencias', ligne: 'A quién declarar, listo para el espacio federativo' },
      'reprise-des-fichiers': { nom: 'Importación de archivos', ligne: 'Tus hojas de cálculo importadas, los antiguos reconocidos' },
    },
    ecrans: {
      surtitre: 'En acción',
      h2: 'Míralo funcionar.',
      intro: 'Las pantallas de OnClub tal como las ven las familias y la directiva, traducidas para esta página. Los nombres y los importes son ficticios.',
      exemple: 'Ejemplo',
      items: [
        {
          famille: 'Inscribir', titre: 'La familia se inscribe desde el sofá.',
          texte: 'Un solo formulario para toda la familia, los cursos o equipos adecuados propuestos según el año de nacimiento, y el pago a continuación. La directiva ya no copia ni una ficha.',
          lien: '/fonctionnalites/inscription-en-ligne', lienNom: 'Inscripción en línea',
          asso: 'Club de Vóley Demo', ecranTitre: 'Inscripción 2026-2027', ecranSous: 'Un solo formulario para toda la familia',
          lignes: [
            { nom: 'Léa, nacida en 2013', detail: 'Sub-15 femenino · lunes 18:00 · 120 €', statut: 'Quedan 4 plazas', ton: 'ok' },
            { nom: 'Hugo, nacido en 2016', detail: 'Sub-11 mixto · miércoles 14:00 · 105 €', statut: 'Quedan 6 plazas', ton: 'ok' },
            { nom: 'Cuota de socio', detail: 'Toda la familia · 15 €' },
          ],
          pied: { libelle: 'Total', valeur: '240 €' }, bouton: 'Pagar con tarjeta, en 3 plazos',
          legende: 'La inscripción vista por la familia, datos ficticios.',
        },
        {
          famille: 'Cobrar', titre: 'Un retraso, un clic, un recordatorio.',
          texte: 'El panel te dice quién debe qué. El recordatorio se redacta con el importe correcto y el enlace de pago correcto: lo relees y sale.',
          lien: '/fonctionnalites/relance-un-clic', lienNom: 'Recordatorio en un clic',
          asso: 'Club de Vóley Demo', ecranTitre: '3 familias con pagos atrasados', ecranSous: 'Temporada 2026-2027 · en curso',
          lignes: [
            { nom: 'Familia Roux', detail: 'Sub-13 masculino · pagado 160 € de 480 €', statut: 'Atrasado', ton: 'ko' },
            { nom: 'Familia Lambert', detail: 'Sub-15 femenino · pagado 110 € de 330 €', statut: 'Atrasado', ton: 'ko' },
            { nom: 'Familia Haddad', detail: 'Sub-11 mixto · pagado 95 € de 285 €', statut: 'Atrasado', ton: 'ko' },
          ],
          pied: { libelle: 'Pendiente de cobro', valeur: '730 €' }, bouton: 'Recordar a la familia Lambert',
          legende: 'El panel de la directiva, datos ficticios.',
        },
        {
          famille: 'Organizar', titre: 'La nueva temporada, sin rehacerlo todo.',
          texte: 'Los grupos del año pasado se mantienen; los antiguos se reinscriben primero con su propio enlace y su plaza queda guardada.',
          lien: '/fonctionnalites/saison-suivante', lienNom: 'Temporada siguiente',
          asso: 'Club de Vóley Demo', ecranTitre: '2027-2028 · en preparación', ecranSous: '14 vuelven de 31 antiguos · 3 plazas guardadas',
          lignes: [
            { nom: 'Sub-15 femenino', detail: '9 de 12 · 3 antiguas sin noticias', statut: '3 plazas libres', ton: 'neutre' },
            { nom: 'Sub-13 femenino', detail: '8 de 12 · 4 antiguas sin noticias', statut: '4 plazas libres', ton: 'neutre' },
            { nom: 'Léa M., nacida en 2014', detail: 'Sube a Sub-15 femenino', statut: 'Plaza guardada', ton: 'ok' },
          ],
          bouton: 'Avisar a 9 familias',
          legende: 'La preparación de la temporada, datos ficticios.',
        },
        {
          famille: 'Organizar', titre: 'El sábado, la alineación se hace con un gesto.',
          texte: 'El monitor ve quién ha respondido a la convocatoria y coloca a cada uno en su puesto desde su móvil, sin cuenta.',
          lien: '/fonctionnalites/compo-du-match', lienNom: 'Alineación del partido',
          asso: 'Club de Vóley Demo', ecranTitre: 'Sénior femenino · partido del sábado', ecranSous: 'Respuestas a la convocatoria',
          lignes: [
            { nom: 'Manon', detail: 'Colocadora', statut: 'Presente', ton: 'ok' },
            { nom: 'Jade', detail: 'Central', statut: 'Presente', ton: 'ok' },
            { nom: 'Lou', detail: 'Receptora-atacante', statut: 'Presente', ton: 'ok' },
            { nom: 'Clara', detail: 'Central', statut: 'Ausente', ton: 'ko' },
          ],
          pied: { libelle: 'Han respondido', valeur: '9 de 10' }, bouton: 'Guardar la alineación',
          legende: 'El móvil del monitor, datos ficticios.',
        },
      ],
    },
    calc: {
      surtitre: 'La calculadora',
      h2: '¿Cuánto tiempo va a ganar tu asociación?',
      intro: 'Indica tu número de socios: las cinco tareas se recalculan. Cuatro siguen el número de socios; la preparación de la nueva temporada es fija.',
      label: 'Número de socios de tu asociación',
      curseur: 'Número de socios, control deslizante',
      sansJs: 'Cálculo mostrado para 250 socios.',
      aujourdhui: 'Hoy', avec: 'Con OnClub', rendues: 'Recuperadas cada temporada',
      caption: 'Las cinco tareas recalculadas', tache: 'Tarea',
      note: 'Una estimación, no una promesa: el método y las hipótesis están en',
      noteLien: 'la página del tiempo ganado',
    },
    points: {
      surtitre: 'Dos puntos de vista',
      h2: 'Un club existe para crear momentos. No para sufrir el papeleo.',
      benevole: {
        titre: 'Para el voluntario',
        chapo: 'Recuperas tus noches.',
        items: [
          ['Ni una ficha más que copiar', ': la familia lo rellena todo.'],
          ['El dinero al día sin hoja de cálculo', ': pagado, por venir, atrasado, de un vistazo.'],
          ['Un recordatorio con un botón', ', que relees antes de que salga.'],
          ['Los justificantes en foto', ', revisados y reclamados en un clic.'],
          ['La nueva temporada', ' lista en 2 horas en lugar de 12.'],
        ],
      },
      membre: {
        titre: 'Para el socio y el padre o la madre',
        chapo: 'Lo que exigía idas y venidas se hace desde el móvil.',
        items: [
          ['Inscribirse desde el sofá', ', toda la familia en un solo formulario.'],
          ['Pagar a plazos', ', con tarjeta.'],
          ['Responder a una convocatoria', ' en un clic, sin cuenta.'],
          ['Subir el certificado', ' en foto.'],
          ['Pedir la equipación', ' en línea y recogerla en el club.'],
        ],
      },
      demo: 'Solicitar una demo',
      transmettre: 'Pasárselo a mi club',
    },
    transmettre: {
      titre: 'Pasárselo a mi club',
      texte: 'Un mensaje corto para tu directiva, listo para enviar desde tu móvil. Tú eliges quién lo recibe; no se envía nada a OnClub.',
      whatsapp: 'Enviar por WhatsApp',
      email: 'Enviar un e-mail',
      sujet: 'Una herramienta para que la directiva gane tiempo: OnClub',
      message: 'Hola, he descubierto OnClub, una plataforma francesa para asociaciones: las familias se inscriben y pagan en línea, el dinero está siempre al día y los recordatorios salen con un botón. Según su estimación, una asociación de 250 socios recupera unas 61 horas por temporada. Échale un vistazo: https://onclub.app/es',
      outil: 'La herramienta completa, en francés',
    },
    assos: {
      surtitre: 'Para todas las asociaciones',
      h2: 'Un club de fútbol, una escuela de música, una compañía de teatro.',
      intro: 'En cuanto hay inscripciones, cursos o equipos y cuotas, OnClub se adapta: cada curso o equipo tiene sus horarios, su sala, sus plazas y su precio, y el formulario de inscripción sigue tu catálogo.',
      cartes: [
        { cle: 'sports', etiquette: 'Deporte', nom: 'Clubes deportivos', ligne: 'Equipos, convocatorias, alineaciones y licencias' },
        { cle: 'musique', etiquette: 'Actividad', nom: 'Escuelas de música', ligne: 'Instrumentos, niveles, profesores y salas' },
        { cle: 'activites', etiquette: 'Actividad', nom: 'Danza, teatro, idiomas', ligne: 'Cursos, horarios, plazas y sesiones de prueba' },
        { cle: 'tresorier', etiquette: 'Tu papel', nom: 'Tesorero', ligne: 'El dinero seguido sin hoja de cálculo' },
        { cle: 'toutes', etiquette: 'Y todas las demás', nom: 'Deporte, música, danza, teatro, idiomas…', ligne: 'Ver todos los tipos de asociación' },
      ],
    },
    offres: {
      surtitre: 'Precios',
      h2: 'Una suscripción en porcentaje. Cuanto más confías, más tiempo ganas.',
      intro: 'Un porcentaje de las cuotas cobradas en línea, nada fijo. Nada sobre los cheques ni el efectivo.',
      rendues: 'recuperadas por temporada*',
      leg: (b) => `de las cuotas cobradas en línea${b ? `, + ${b} sobre la tienda` : ''}. Nada fijo.`,
      taux: { mini: '2,90 %', pro: '4,90 %', max: '6,90 %' },
      ouvre: {
        mini: ['Inscripciones en línea y sesiones de prueba', 'Pago con tarjeta, en uno o varios plazos', 'Panel del dinero', 'Recordatorios con un botón', 'Justificantes', 'Exportaciones en hoja de cálculo'],
        pro: ['Todo Mini', 'Temporada siguiente y reinscripciones', 'Lista de espera', 'Mensajes a las familias', 'La web de la asociación', 'Cluby, el asistente: 100 preguntas al mes'],
        max: ['Todo Pro', 'La tienda, en línea y en el mostrador', 'Eventos y cursillos', 'Cluby, sin límite'],
      },
      voir: (nom) => `Ver ${nom} en una demo`,
      note: '* Estimación de OnClub para una asociación de 250 socios, no un estudio. Mini cubre las fichas, el seguimiento de pagos, los recordatorios y los justificantes (51 h). Pro añade la nueva temporada (10 h), los mensajes a las familias (10 mensajes que pasan de 45 a 5 minutos, 6 h 40), la lista de espera (20 plazas que pasan de 10 minutos a 1, 3 h) y la web actualizada sin proveedor externo (4 h). Pro Max IA añade la tienda (150 pedidos que pasan de 6 minutos a 1 en la recogida, 12 h 30) y los eventos (4 eventos que pasan de 3 horas a 30 minutos, 10 h). No se cobra nada sobre los cheques ni el efectivo. Las comisiones de tarjeta corren a cargo de la asociación:',
      noteLien: 'ver el ejemplo con cifras',
      detail: 'El detalle de las ofertas y un ejemplo con cifras',
    },
    ressources: {
      surtitre: 'Recursos',
      h2: 'Guías para la directiva, sin jerga.',
      intro: 'Escritas para las asociaciones francesas, en francés.',
      tout: 'Todas las guías y artículos',
      etiquettes: { guides: 'Guía', articles: 'Artículo', comparatifs: 'Comparativa' },
    },
    faqTitre: 'Preguntas frecuentes',
    faq: [
      { question: '¿Para qué asociaciones es OnClub?', reponse: 'Para todas las que inscriben socios, con cursos o equipos y cuotas: clubes deportivos, escuelas de música, danza, teatro e idiomas, coros, talleres. En OnClub, cada curso o equipo tiene su disciplina, su nivel, sus monitores o profesores, su sala, sus horarios, sus plazas y su precio. OnClub es una plataforma francesa: la interfaz, los formularios que rellenan las familias y los e-mails están en francés, y los pagos se hacen en euros.' },
      { question: '¿Cuánto cuesta OnClub?', reponse: 'Una suscripción en porcentaje de las cuotas cobradas en línea: 2,90 % con OnClub Mini, 4,90 % con Pro, 6,90 % con Pro Max IA, más un 2 % sobre la tienda. Nada fijo, y nada sobre los cheques ni el efectivo. Las comisiones de tarjeta corren a cargo de la asociación.' },
      { question: '¿De dónde salen las 61 horas recuperadas?', reponse: 'Es una estimación de OnClub para una asociación de 250 socios, no un estudio: hoy, 66 horas por temporada para copiar las fichas, seguir los pagos, reclamar los retrasos, pedir los justificantes y preparar la nueva temporada, frente a unas 5 horas con OnClub. El cálculo y las hipótesis están en la página del tiempo ganado.' },
      { question: '¿Las familias tienen que crear una cuenta?', reponse: 'No. La familia rellena un solo formulario para todos sus miembros, desde su móvil. Recibe un resumen por e-mail y después encuentra su expediente con su enlace. Para una convocatoria, responde presente o ausente desde el propio e-mail.' },
      { question: '¿En cuánto tiempo está en línea nuestra asociación?', reponse: 'En línea en quince días, con una entrega previa el décimo día para validarlo todo juntos. Tus hojas de cálculo de la temporada pasada se importan: los antiguos socios son reconocidos y reciben su enlace de reinscripción.' },
      { question: 'Soy socio o padre: ¿cómo propongo OnClub a mi club?', reponse: 'Usa el botón «Pasárselo a mi club» de esta página: prepara un mensaje corto para la directiva, para enviar por WhatsApp o por e-mail, con lo que la asociación gana. No tienes nada que instalar ni nada que rellenar para nosotros.' },
    ],
    appel: {
      surtitre: 'Solicitar una demo',
      titre: 'Devuelve las noches a tus voluntarios.',
      texte: 'Una demo con tus cursos o equipos, tus precios y tus preguntas. En línea en quince días, con una entrega previa el décimo día para validarlo todo juntos.',
      preparer: 'Preparar mi demo',
      whatsapp: 'Escribir por WhatsApp',
      email: 'Enviar un e-mail',
      sujet: 'Demo de OnClub',
      message: 'Hola, me gustaría una demo de OnClub para nuestra asociación.',
      membre: '¿Eres socio o padre?',
      membreLien: 'Pasárselo a mi club',
    },
    pied: {
      phrase: 'Un club existe para crear momentos. No para sufrir el papeleo.',
      demo: 'Solicitar una demo',
      surPage: 'En esta página',
      surSite: 'El sitio, en francés',
      contact: 'Contacto',
      liens: { fonctions: 'Todas las funcionalidades', tarifs: 'Precios', temps: 'Tiempo ganado', ressources: 'Guías y artículos', pourQui: 'Para quién', presentation: 'La presentación', recommander: 'Pasárselo a mi club' },
      mentions: 'Aviso legal', confidentialite: 'Privacidad', conditions: 'Condiciones', cookies: 'Cookies y ubicación',
      aria: 'Mapa del sitio',
      note: 'Las páginas marcadas FR están en francés.',
    },
    consentement: {
      titre: '¿Adaptar el sitio a tu ciudad?',
      texte: 'Si aceptas, deducimos tu ciudad aproximada a partir de tu conexión. No se guarda nada, ningún servicio de terceros.',
      plus: 'Más información (en francés)',
      refuser: 'Rechazar',
      accepter: 'Aceptar',
    },
  },
}
