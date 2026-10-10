/*
  L'ACCUEIL TRADUIT, NOUVELLE STRUCTURE (refonte du 10 octobre 2026) :
  les mots arrêtés dans textes.md d) et les arbitrages du plan (h1 et h2 sans
  point final, « Et chez vous ? » puis le chiffre géant, etc.). Les autres
  textes (objets de la scène, familles, écrans, FAQ, offres) restent dans
  src/i18n/accueil.ts. Mêmes faits, mêmes chiffres (src/data/temps.ts).
*/
import type { Langue } from './accueil'

export type TextesRefonte = {
  h1: string
  phrase: string
  bouton: string
  noteLangue: string
  scene: {
    fenetre: string
    lignes: [string, string, string, string, string, string]
    vide: string
    compteurAvant: string
    compteurApres: string
    rendu: string
    moments: [string, string, string]
    barres: [string, string, string]
    note: string
    hypotheses: string
  }
  temps: { titre: string; note: string; lien: string; mots: { avant: string; apres: string; etiquette: string } }
  bento: { titre: string; lien: (n: number) => string }
  onglets: { titre: string; libelles: [string, string, string, string]; legende: string }
  vitrine: { titre: string; phrase: string; legende: string; lien: string; mots: { aria: string; site: string; credit: string; onglets: Record<string, string> } }
  bande: { titre: string; phrase: string; derniere: string; derniereNom: string; precedent: string; suivant: string }
  offres: { h2: string; intro: string; rendues: string; ouvre: (n: string) => string; note: string; comment: string; boutique: string; detail: string }
  faq: { titre: string; guides: string; toutes: string }
  appel: { titre: string; phrase: string; bouton: string; membre: string }
}

export const REFONTE: Record<Langue, TextesRefonte> = {
  en: {
    h1: 'Sports or arts association? Paperwork is over',
    phrase: 'Registrations, fees, reminders: it all happens online. Your volunteers get their evenings back.',
    bouton: 'Book a demo',
    noteLangue: 'OnClub is a French platform: the product is in French and takes payments in euros.',
    scene: {
      fenetre: 'OnClub · Season 2026-2027',
      lignes: ['The family registers alone', 'Paid online', 'The money up to date', 'Reminder in one click', 'Documents by photo', 'Messages to the right group'],
      vide: 'Your association',
      compteurAvant: 'of admin per season, today',
      compteurApres: 'of admin per season, with OnClub',
      rendu: '61 h given back',
      moments: ['Saturday on the touchline', 'Thursday’s rehearsal', 'the evening with family'],
      barres: ['Before', 'Tidied', 'Given back'],
      note: 'OnClub estimate for 250 members, not a study.',
      hypotheses: 'See the assumptions',
    },
    temps: {
      titre: 'And yours?',
      note: 'Change the number: the calculation follows. OnClub estimate, not a study.',
      lien: 'The full calculation',
      mots: { avant: 'given back each season, for', apres: 'members.', etiquette: 'Number of members' },
    },
    bento: { titre: 'Everything that ate your evenings', lien: (n) => `All ${n} features` },
    onglets: { titre: 'Watch it run', libelles: ['Registration', 'Reminder', 'Next season', 'Match line-up'], legende: 'Names and amounts are fictitious.' },
    vitrine: {
      titre: 'The club website, plugged into OnClub',
      phrase: 'Teams, calendar and registrations come from OnClub. A full class shows as full, without anyone updating it.',
      legende: 'Two demonstration clubs, invented to show what your association can have.',
      mots: { aria: 'Demonstration club websites', site: 'demonstration website', credit: 'Club photos: Freepik', onglets: { volta: 'Volta Volley Club · volleyball', montclar: 'AS Montclar · football' } },
      lien: 'The association website, from Pro',
    },
    bande: {
      titre: 'Football, music, theatre. And all the others',
      phrase: 'Wherever there are registrations, classes or teams, and membership fees.',
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
    h1: '¿Asociación deportiva o artística? Se acabó el papeleo',
    phrase: 'Inscripciones, cuotas, recordatorios: todo se hace en línea. Tus voluntarios recuperan sus noches.',
    bouton: 'Solicitar una demo',
    noteLangue: 'OnClub es una plataforma francesa: el producto está en francés y cobra en euros.',
    scene: {
      fenetre: 'OnClub · Temporada 2026-2027',
      lignes: ['La familia se inscribe sola', 'Pagado en línea', 'El dinero al día', 'Recordatorio en un clic', 'Documentos en foto', 'Mensajes al grupo correcto'],
      vide: 'Tu asociación',
      compteurAvant: 'de papeleo por temporada, hoy',
      compteurApres: 'de papeleo por temporada, con OnClub',
      rendu: '61 h recuperadas',
      moments: ['el sábado junto al campo', 'el ensayo del jueves', 'la noche en familia'],
      barres: ['Antes', 'Ordenado', 'Recuperado'],
      note: 'Estimación de OnClub para 250 socios, no un estudio.',
      hypotheses: 'Ver las hipótesis',
    },
    temps: {
      titre: '¿Y en tu caso?',
      note: 'Cambia el número: el cálculo se actualiza. Estimación de OnClub, no un estudio.',
      lien: 'El cálculo completo',
      mots: { avant: 'recuperadas cada temporada, para', apres: 'socios.', etiquette: 'Número de socios' },
    },
    bento: { titre: 'Todo lo que se comía tus noches', lien: (n) => `Las ${n} funcionalidades` },
    onglets: { titre: 'Míralo funcionar', libelles: ['Inscripción', 'Recordatorio', 'Próxima temporada', 'Alineación del partido'], legende: 'Nombres e importes ficticios.' },
    vitrine: {
      titre: 'La web del club, conectada a OnClub',
      phrase: 'Equipos, agenda e inscripciones vienen de OnClub. Una clase completa aparece completa, sin que nadie la actualice.',
      legende: 'Dos clubes de demostración, inventados para mostrar lo que tu asociación puede tener.',
      mots: { aria: 'Webs de clubes de demostración', site: 'web de demostración', credit: 'Fotos de los clubes: Freepik', onglets: { volta: 'Volta Volley Club · voleibol', montclar: 'AS Montclar · fútbol' } },
      lien: 'La web de la asociación, desde Pro',
    },
    bande: {
      titre: 'Fútbol, música, teatro. Y todas las demás',
      phrase: 'Allí donde hay inscripciones, clases o equipos, y cuotas.',
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
