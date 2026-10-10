/*
  L'ACCUEIL TRADUIT, NOUVELLE STRUCTURE (refonte du 10 octobre 2026) :
  les mots arrêtés dans textes.md d) et les arbitrages du plan (h1 et h2 sans
  point final, « Et chez vous ? » puis le chiffre géant, etc.). Les autres
  textes (objets de la scène, familles, écrans, FAQ, offres) restent dans
  src/i18n/accueil.ts. Mêmes faits, mêmes chiffres (src/data/temps.ts).
*/
import type { Langue, Ecran } from './accueil'
import type { TextesScene } from '../components/SceneAccueil.astro'
import type { TextesSemaine } from '../components/SemaineBureau.astro'
import { ADHERENTS_REFERENCE as N } from '../data/temps'

export type TextesRefonte = {
  h1: string
  phrase: string
  bouton: string
  noteLangue: string
  /** Le héros (concept A, 10 oct.) : légendes, relance reçue, carte du temps. */
  scene: TextesScene
  /** Avec ou sans OnClub (concept C). */
  semaine: TextesSemaine
  /** Les écrans traduits propres à la refonte : le tableau de bord, les convocations, le site du club. */
  ecrans: { tableau: Ecran; convocations: Ecran; site: Ecran }
  temps: { titre: string; note: string; lien: string; mots: { avant: string; apres: string; etiquette: string } }
  bento: { titre: string; lien: (n: number) => string }
  onglets: { titre: string; libelles: [string, string, string, string]; legende: string; pause: string; reprise: string }
  vitrine: { titre: string; phrase: string; legende: string; lien: string; mots: { aria: string; site: string; credit: string; onglets: Record<string, string> } }
  bande: { titre: string; phrase: string; derniere: string; derniereNom: string; precedent: string; suivant: string }
  offres: { h2: string; intro: string; rendues: string; ouvre: (n: string) => string; note: string; comment: string; boutique: string; detail: string }
  faq: { titre: string; guides: string; toutes: string }
  appel: { titre: string; phrase: string; bouton: string; membre: string }
}

export const REFONTE: Record<Langue, TextesRefonte> = {
  en: {
    h1: 'Sports club or association? Paperwork is over',
    phrase: 'OnClub puts your club’s registrations and fees online. Your volunteers get their evenings back.',
    bouton: 'Book a demo',
    noteLangue: 'OnClub is a French platform: the product is in French and takes payments in euros.',
    scene: {
      legendes: [
        { titre: 'The family registers', phrase: 'From their phone: each child, their team or class, the fee in one or several payments.' },
        { titre: 'The treasurer sees everything', phrase: 'What is collected, upcoming or late, with no spreadsheet to keep.' },
        { titre: 'One late payment, one reminder', phrase: 'The message is ready: you read it, it goes in one click.' },
      ],
      groupe: 'What the scene shows',
      tableau: 'The club’s dashboard: €28,640 collected out of €40,395 expected, the rest upcoming or late. Fictitious amounts.',
      relance: {
        asso: 'Demo Volley Club', quand: 'now', objet: '€110 overdue',
        texte: 'Hello Sophie, €110 is missing on Léa’s registration: the 28 September 2026 instalment has not arrived.',
        aria: 'The reminder the family receives: Demo Volley Club, €110 overdue. Fictitious data.',
      },
      temps: { avant: 'of admin per season', rendu: 'given back to the board', note: `Estimate for ${N} members, not a study.`, lien: 'The calculation' },
      pause: 'Pause', reprise: 'Play the animation',
      sports: { liste: [{ texte: 'Football' }, { texte: 'basketball' }, { texte: 'volleyball' }, { texte: 'handball' }, { texte: 'judo' }, { texte: 'tennis' }], aussi: 'and music and drama too.' },
    },
    semaine: {
      titre: 'Your week, with or without OnClub',
      sans: 'Without OnClub', avec: 'With OnClub',
      indice: '<b>Flip the switch</b> to see the same week with OnClub.',
      compteur: 'of admin per season', pour: `for ${N} members`, rendu: 'given back to the board',
      tete: 'Your evenings this week', toucher: 'Tap an evening', parSaison: 'Per season',
      groupe: 'The board’s evenings: choose one to see the detail',
      soirs: [
        { jour: 'Monday evening', quoiSans: 'Re-typing forms', commentSans: 'One by one, by hand', quoiAvec: 'Monday training', commentAvec: 'The family fills it in',
          legendeSans: 'Forms arrive on paper; <b>a volunteer re-types every file.</b>', legendeAvec: '<b>The family registers their child from their phone</b>: the team, the fee in one or several payments.' },
        { jour: 'Tuesday evening', quoiSans: 'Checking payments', commentSans: 'Cheques and transfers, in the spreadsheet', quoiAvec: 'Free evening', commentAvec: 'The dashboard keeps it up to date',
          legendeSans: 'Dated cheques sit in a drawer; <b>each payment is ticked off by hand.</b>', legendeAvec: '<b>The dashboard keeps itself up to date</b>: collected, upcoming, late.' },
        { jour: 'Wednesday evening', quoiSans: 'Chasing late payments', commentSans: 'The same message, family by family', quoiAvec: 'Free evening', commentAvec: 'A reminder in one click',
          legendeSans: 'Finding out who owes what, <b>writing the same message, three times.</b>', legendeAvec: '<b>The message is already written</b>: you read it, it goes in one click.' },
        { jour: 'Thursday evening', quoiSans: 'Chasing documents', commentSans: 'Certificates, consent forms', quoiAvec: 'Thursday rehearsal', commentAvec: 'By photo, chased in one click',
          legendeSans: 'The missing certificate, <b>found at the worst moment.</b>', legendeAvec: '<b>Documents arrive by photo</b>; missing ones are requested in one click.' },
        { jour: 'Friday evening', quoiSans: 'Preparing next season', commentSans: 'Lists, teams, places', quoiAvec: 'The evening with family', commentAvec: 'Teams are carried over',
          legendeSans: 'In June, <b>every list starts from scratch.</b>', legendeAvec: '<b>Next season opens</b>: places are kept, the link goes to families.' },
      ],
      objets: {
        fiche: 'Registration form', ficheNom: 'Name: ……………', ficheNe: 'Born: … / … / ……', aRecopier: 'To re-type',
        message: 'Hi, any places left in the under-11s?',
        cheque: 'Cheque 3 of 4', chequeDepot: 'To bank on 5 November', tableur: 'fees_2026_FINAL(3).xlsx',
        relance3: 'Reminder no. 3', relance2: 'Reminder no. 2', relanceTexte: 'September fee, still nothing',
        certificat: 'Medical certificate', manquant: 'Missing', autorisation: 'Parental consent', manquante: 'Missing',
        equipes: 'Teams 2027-2028', equipesL1: 'Under-15 girls: who is back?', equipesL2: 'Under-13 boys: … / 12', aRefaire: 'To redo', tableurEquipes: 'teams_2027_v2.xlsx',
      },
      tableau: 'The club’s dashboard: €28,640 collected out of €40,395 expected, the rest upcoming or late. Fictitious amounts.',
      pieces: {
        asso: 'Demo Volley Club', titre: 'Documents', sous: 'Season 2026–2027 · sent by photo by families',
        lignes: [
          { nom: 'Léa Martin', detail: 'Medical certificate', statut: 'Accepted', ton: 'ok' },
          { nom: 'Hugo Roux', detail: 'Health declaration', statut: 'To check', ton: 'neutre' },
          { nom: 'Yanis Haddad', detail: 'Medical certificate', statut: 'Missing', ton: 'ko' },
        ],
        bouton: 'Chase missing documents',
      },
      hypotheses: 'See the assumptions',
      note: `Estimate for ${N} members, not a study. Names and amounts are fictitious.`,
      perimetre: (g, mini, pro) => `The ${g}: ${mini} from Mini (forms, payments, reminders, documents), ${pro} more with Pro (next season).`,
      lien: 'Calculate for my club',
      pause: 'Pause', reprise: 'Play the animation',
    },
    ecrans: {
      tableau: {
        famille: 'Collect', titre: '', texte: '', lien: '/fonctionnalites/suivi-des-paiements', lienNom: 'Payment tracking', legende: '',
        asso: 'Demo Volley Club', ecranTitre: 'Home', ecranSous: 'Season 2026–2027 · in progress',
        lignes: [
          { nom: 'Collected', detail: 'out of €40,395 expected', statut: '€28,640', ton: 'ok' },
          { nom: 'Upcoming', detail: 'scheduled instalments', statut: '€9,870', ton: 'neutre' },
          { nom: 'Late', detail: 'instalments past due', statut: '€365', ton: 'ko' },
        ],
        bouton: 'See late payments',
      },
      convocations: {
        famille: 'Organise', titre: 'Families answer present or absent from the email, with no account.', texte: '', lien: '/fonctionnalites/convocations', lienNom: 'Online call-ups', legende: '',
        asso: 'Demo Volley Club', ecranTitre: 'Call-up: Saturday match', ecranSous: 'Under-15 girls · answers from the email',
        lignes: [
          { nom: 'Léa', detail: 'Outside hitter', statut: 'Present', ton: 'ok' },
          { nom: 'Inès', detail: 'Setter', statut: 'Present', ton: 'ok' },
          { nom: 'Chloé', detail: 'Middle blocker', statut: 'Absent', ton: 'ko' },
          { nom: 'Maëlys', detail: 'Libero', statut: 'Not answered yet', ton: 'neutre' },
        ],
        pied: { libelle: 'Answered', valeur: '9 of 10' }, bouton: 'Make the line-up',
      },
      site: {
        famille: 'Show', titre: 'The club website stays up to date, with no web agency.', texte: '', lien: '/fonctionnalites/site-association', lienNom: 'Association website', legende: '',
        asso: 'Demo Volley Club', ecranTitre: 'Club website', ecranSous: 'Teams, calendar and registrations come from OnClub',
        lignes: [
          { nom: 'Teams', detail: 'from OnClub', statut: 'Up to date', ton: 'ok' },
          { nom: 'Calendar', detail: 'Saturday matches', statut: 'Up to date', ton: 'ok' },
          { nom: 'Under-15 girls', detail: 'Registrations', statut: 'Full', ton: 'neutre' },
        ],
        bouton: 'Publish',
      },
    },
    temps: {
      titre: 'And yours?',
      note: 'Change the number: the calculation follows. OnClub estimate, not a study.',
      lien: 'The full calculation',
      mots: { avant: 'given back each season, for', apres: 'members.', etiquette: 'Number of members' },
    },
    bento: { titre: 'Everything that ate your evenings', lien: (n) => `All ${n} features` },
    onglets: { titre: 'Watch it run', libelles: ['Next season', 'Match line-up', 'Call-ups', 'Club website'], legende: 'Names and amounts are fictitious.', pause: 'Pause', reprise: 'Play the animation' },
    vitrine: {
      titre: 'The club website, plugged into OnClub',
      phrase: 'Teams, calendar and registrations come from OnClub. A full class shows as full, without anyone updating it.',
      legende: 'Two demonstration clubs, invented to show what your association can have.',
      mots: { aria: 'Demonstration club websites', site: 'demonstration website', credit: 'Club photos: Freepik', onglets: { volta: 'Volta Volley Club · volleyball', montclar: 'AS Montclar · football' } },
      lien: 'The association website, from Pro',
    },
    bande: {
      titre: 'Football, basketball, judo, tennis. And the rest',
      phrase: 'Sports clubs first. Music and theatre too: wherever there are registrations and fees.',
      derniere: 'And yours?', derniereNom: 'And yours? Every association',
      precedent: 'Previous', suivant: 'Next',
    },
    offres: {
      h2: 'A percentage. Nothing fixed',
      intro: 'A percentage of fees collected online. Nothing on cheques or cash. Card fees are paid by the association.',
      rendues: 'given back per season',
      ouvre: (n) => `What ${n} includes`,
      note: 'OnClub estimate for 250 members, not a study.',
      comment: 'How we count these hours',
      boutique: 'on the shop',
      detail: 'Plan details and a worked example',
    },
    faq: { titre: 'The board’s questions', guides: 'Guides for the board:', toutes: 'All resources' },
    appel: {
      titre: 'Give your volunteers their evenings back',
      phrase: 'Five questions, and the demo starts with what takes you the most time.',
      bouton: 'Book a demo',
      membre: 'Member or parent? Pass it on to my club',
    },
  },
  es: {
    h1: '¿Club deportivo o asociación? Se acabó el papeleo',
    phrase: 'OnClub pone en línea las inscripciones y las cuotas de tu club. Tus voluntarios recuperan sus noches.',
    bouton: 'Solicitar una demo',
    noteLangue: 'OnClub es una plataforma francesa: el producto está en francés y cobra en euros.',
    scene: {
      legendes: [
        { titre: 'La familia se inscribe', phrase: 'Desde el móvil: cada hijo, su equipo o su clase, la cuota en uno o varios pagos.' },
        { titre: 'El tesorero lo ve todo', phrase: 'Lo cobrado, lo pendiente y lo atrasado, sin hoja de cálculo que llevar.' },
        { titre: 'Un retraso, un recordatorio', phrase: 'El mensaje está listo: lo relees y sale en un clic.' },
      ],
      groupe: 'Lo que muestra la escena',
      tableau: 'El panel del club: 28.640 € cobrados de 40.395 € esperados, el resto pendiente o atrasado. Importes ficticios.',
      relance: {
        asso: 'Club de Vóley Demo', quand: 'ahora', objet: '110 € de pago atrasado',
        texte: 'Hola Sophie, faltan 110 € en la inscripción de Léa: el plazo del 28 de septiembre de 2026 no ha llegado.',
        aria: 'El recordatorio que recibe la familia: Club de Vóley Demo, 110 € de pago atrasado. Datos ficticios.',
      },
      temps: { avant: 'de papeleo por temporada', rendu: 'recuperadas por la directiva', note: `Estimación para ${N} socios, no un estudio.`, lien: 'El cálculo' },
      pause: 'Pausar', reprise: 'Reanudar la animación',
      sports: { liste: [{ texte: 'Fútbol' }, { texte: 'baloncesto' }, { texte: 'voleibol' }, { texte: 'balonmano' }, { texte: 'judo' }, { texte: 'tenis' }], aussi: 'y también la música y el teatro.' },
    },
    semaine: {
      titre: 'Tu semana, con o sin OnClub',
      sans: 'Sin OnClub', avec: 'Con OnClub',
      indice: '<b>Cambia el interruptor</b> para ver la misma semana con OnClub.',
      compteur: 'de papeleo por temporada', pour: `para ${N} socios`, rendu: 'recuperadas por la directiva',
      tete: 'Tus noches de la semana', toucher: 'Toca una noche', parSaison: 'Por temporada',
      groupe: 'Las noches de la directiva: elige una para ver el detalle',
      soirs: [
        { jour: 'Lunes por la noche', quoiSans: 'Copiar las fichas', commentSans: 'Una a una, a mano', quoiAvec: 'El entrenamiento del lunes', commentAvec: 'La familia las rellena',
          legendeSans: 'Las fichas llegan en papel; <b>un voluntario copia cada expediente.</b>', legendeAvec: '<b>La familia inscribe a su hijo desde el móvil</b>: su equipo, la cuota en uno o varios pagos.' },
        { jour: 'Martes por la noche', quoiSans: 'Cuadrar los pagos', commentSans: 'Cheques y transferencias, en la hoja de cálculo', quoiAvec: 'Noche libre', commentAvec: 'El panel lo mantiene al día',
          legendeSans: 'Los cheques fechados duermen en un cajón; <b>cada pago se marca a mano.</b>', legendeAvec: '<b>El panel se mantiene al día</b>: cobrado, pendiente, atrasado.' },
        { jour: 'Miércoles por la noche', quoiSans: 'Reclamar los retrasos', commentSans: 'El mismo mensaje, familia por familia', quoiAvec: 'Noche libre', commentAvec: 'Un recordatorio en un clic',
          legendeSans: 'Averiguar quién debe qué, <b>escribir el mismo mensaje, tres veces.</b>', legendeAvec: '<b>El mensaje ya está escrito</b>: lo relees y sale en un clic.' },
        { jour: 'Jueves por la noche', quoiSans: 'Reclamar los documentos', commentSans: 'Certificados, autorizaciones', quoiAvec: 'El ensayo del jueves', commentAvec: 'En foto, reclamados en un clic',
          legendeSans: 'El certificado que falta, <b>descubierto en el peor momento.</b>', legendeAvec: '<b>Los documentos llegan en foto</b>; los que faltan se reclaman en un clic.' },
        { jour: 'Viernes por la noche', quoiSans: 'Preparar la próxima temporada', commentSans: 'Listas, equipos, plazas', quoiAvec: 'La noche en familia', commentAvec: 'Los equipos se mantienen',
          legendeSans: 'En junio, <b>todas las listas vuelven a empezar de cero.</b>', legendeAvec: '<b>Se abre la temporada siguiente</b>: las plazas se guardan, el enlace llega a las familias.' },
      ],
      objets: {
        fiche: 'Ficha de inscripción', ficheNom: 'Nombre: ……………', ficheNe: 'Nacido/a el: … / … / ……', aRecopier: 'Por copiar',
        message: 'Hola, ¿quedan plazas en sub-11?',
        cheque: 'Cheque 3 de 4', chequeDepot: 'Para ingresar el 5 de noviembre', tableur: 'cuotas_2026_FINAL(3).xlsx',
        relance3: 'Recordatorio n.º 3', relance2: 'Recordatorio n.º 2', relanceTexte: 'Cuota de septiembre, todavía nada',
        certificat: 'Certificado médico', manquant: 'Falta', autorisation: 'Autorización parental', manquante: 'Falta',
        equipes: 'Equipos 2027-2028', equipesL1: 'Sub-15 femenino: ¿quién vuelve?', equipesL2: 'Sub-13 masculino: … / 12', aRefaire: 'Por rehacer', tableurEquipes: 'equipos_2027_v2.xlsx',
      },
      tableau: 'El panel del club: 28.640 € cobrados de 40.395 € esperados, el resto pendiente o atrasado. Importes ficticios.',
      pieces: {
        asso: 'Club de Vóley Demo', titre: 'Justificantes', sous: 'Temporada 2026-2027 · enviados en foto por las familias',
        lignes: [
          { nom: 'Léa Martin', detail: 'Certificado médico', statut: 'Aceptado', ton: 'ok' },
          { nom: 'Hugo Roux', detail: 'Declaración de salud', statut: 'Por revisar', ton: 'neutre' },
          { nom: 'Yanis Haddad', detail: 'Certificado médico', statut: 'Falta', ton: 'ko' },
        ],
        bouton: 'Reclamar los que faltan',
      },
      hypotheses: 'Ver las hipótesis',
      note: `Estimación para ${N} socios, no un estudio. Nombres e importes ficticios.`,
      perimetre: (g, mini, pro) => `Las ${g}: ${mini} desde Mini (fichas, pagos, recordatorios, justificantes), ${pro} más con Pro (la nueva temporada).`,
      lien: 'Calcular para mi club',
      pause: 'Pausar', reprise: 'Reanudar la animación',
    },
    ecrans: {
      tableau: {
        famille: 'Cobrar', titre: '', texte: '', lien: '/fonctionnalites/suivi-des-paiements', lienNom: 'Seguimiento de pagos', legende: '',
        asso: 'Club de Vóley Demo', ecranTitre: 'Inicio', ecranSous: 'Temporada 2026-2027 · en curso',
        lignes: [
          { nom: 'Cobrado', detail: 'de 40.395 € esperados', statut: '28.640 €', ton: 'ok' },
          { nom: 'Pendiente', detail: 'plazos programados', statut: '9.870 €', ton: 'neutre' },
          { nom: 'Atrasado', detail: 'plazos vencidos', statut: '365 €', ton: 'ko' },
        ],
        bouton: 'Ver los retrasos',
      },
      convocations: {
        famille: 'Organizar', titre: 'La familia responde presente o ausente desde el correo, sin cuenta.', texte: '', lien: '/fonctionnalites/convocations', lienNom: 'Convocatorias en línea', legende: '',
        asso: 'Club de Vóley Demo', ecranTitre: 'Convocatoria: partido del sábado', ecranSous: 'Sub-15 femenino · respuestas desde el correo',
        lignes: [
          { nom: 'Léa', detail: 'Receptora-atacante', statut: 'Presente', ton: 'ok' },
          { nom: 'Inès', detail: 'Colocadora', statut: 'Presente', ton: 'ok' },
          { nom: 'Chloé', detail: 'Central', statut: 'Ausente', ton: 'ko' },
          { nom: 'Maëlys', detail: 'Líbero', statut: 'Sin respuesta', ton: 'neutre' },
        ],
        pied: { libelle: 'Respuestas', valeur: '9 de 10' }, bouton: 'Hacer la alineación',
      },
      site: {
        famille: 'Mostrar', titre: 'La web del club se mantiene al día, sin agencia.', texte: '', lien: '/fonctionnalites/site-association', lienNom: 'Web de la asociación', legende: '',
        asso: 'Club de Vóley Demo', ecranTitre: 'Web del club', ecranSous: 'Equipos, agenda e inscripciones vienen de OnClub',
        lignes: [
          { nom: 'Equipos', detail: 'desde OnClub', statut: 'Al día', ton: 'ok' },
          { nom: 'Agenda', detail: 'partidos del sábado', statut: 'Al día', ton: 'ok' },
          { nom: 'Sub-15 femenino', detail: 'Inscripciones', statut: 'Completo', ton: 'neutre' },
        ],
        bouton: 'Publicar',
      },
    },
    temps: {
      titre: '¿Y en tu caso?',
      note: 'Cambia el número: el cálculo se actualiza. Estimación de OnClub, no un estudio.',
      lien: 'El cálculo completo',
      mots: { avant: 'recuperadas cada temporada, para', apres: 'socios.', etiquette: 'Número de socios' },
    },
    bento: { titre: 'Todo lo que se comía tus noches', lien: (n) => `Las ${n} funcionalidades` },
    onglets: { titre: 'Míralo funcionar', libelles: ['Próxima temporada', 'Alineación del partido', 'Convocatorias', 'Web del club'], legende: 'Nombres e importes ficticios.', pause: 'Pausar', reprise: 'Reanudar la animación' },
    vitrine: {
      titre: 'La web del club, conectada a OnClub',
      phrase: 'Equipos, agenda e inscripciones vienen de OnClub. Una clase completa aparece completa, sin que nadie la actualice.',
      legende: 'Dos clubes de demostración, inventados para mostrar lo que tu asociación puede tener.',
      mots: { aria: 'Webs de clubes de demostración', site: 'web de demostración', credit: 'Fotos de los clubes: Freepik', onglets: { volta: 'Volta Volley Club · voleibol', montclar: 'AS Montclar · fútbol' } },
      lien: 'La web de la asociación, desde Pro',
    },
    bande: {
      titre: 'Fútbol, baloncesto, judo, tenis. Y todos los demás',
      phrase: 'Primero los clubes deportivos. También la música y el teatro: allí donde hay inscripciones y cuotas.',
      derniere: '¿Y la tuya?', derniereNom: '¿Y la tuya? Todas las asociaciones',
      precedent: 'Anterior', suivant: 'Siguiente',
    },
    offres: {
      h2: 'Un porcentaje. Nada fijo',
      intro: 'Un porcentaje de las cuotas cobradas en línea. Nada sobre cheques ni efectivo. Las comisiones de tarjeta corren a cargo de la asociación.',
      rendues: 'recuperadas por temporada',
      ouvre: (n) => `Lo que incluye ${n}`,
      note: 'Estimación de OnClub para 250 socios, no un estudio.',
      comment: 'Cómo contamos estas horas',
      boutique: 'sobre la tienda',
      detail: 'El detalle de las ofertas y un ejemplo con cifras',
    },
    faq: { titre: 'Las preguntas de la directiva', guides: 'Guías para la directiva:', toutes: 'Todos los recursos' },
    appel: {
      titre: 'Devuelve las noches a tus voluntarios',
      phrase: 'Cinco preguntas, y la demo empieza por lo que más tiempo te quita.',
      bouton: 'Solicitar una demo',
      membre: '¿Socio o padre o madre? Pásalo a mi club',
    },
  },
}
