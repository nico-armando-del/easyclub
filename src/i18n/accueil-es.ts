/*
  L'ACCUEIL ESPAGNOL (/es) : LES TEXTES EN BLOC DES COMPOSANTS DU HÉROS ET DE
  LA SEMAINE, traduction fidèle des objets FR de src/components/SceneAccueil.astro
  et SemaineBureau.astro (mêmes clés, mêmes faits, « usted »). Les composants
  les prennent d'eux-mêmes sur une page espagnole. Les phrases isolées de
  l'accueil passent par t() (src/i18n/ui.ts).

  LES ÉCRANS DE L'ACCUEIL ESPAGNOL : les écrans animés de src/ecrans/ (inscription,
  tableau de bord, relance, saison suivante, compo, site) n'ont pas encore leur
  version espagnole (src/ecrans/es/<nom>.html + public/ecrans/es/<nom>.js). En
  attendant, l'accueil espagnol montre leur état final traduit, en écran fixe
  (EcranTraduit) : mêmes données fictives, mêmes libellés, sans animation.

  Les chiffres de temps viennent de src/data/temps.ts (jamais retapés).
*/
import type { TextesScene } from '../components/SceneAccueil.astro'
import type { TextesSemaine } from '../components/SemaineBureau.astro'
import type { Ecran } from './accueil'
import { ADHERENTS_REFERENCE as N, PART_RENDUE } from '../data/temps'

export const SCENE_ES: TextesScene = {
  legendes: [
    { titre: 'La familia se inscribe', phrase: 'Desde su móvil: cada hijo, su equipo o su curso, la cuota con tarjeta o fraccionada.' },
    { titre: 'El tesorero lo ve todo', phrase: 'Lo cobrado, lo pendiente y lo atrasado, sin hoja de cálculo que mantener.' },
    { titre: 'Un retraso, un recordatorio', phrase: 'El mensaje está listo: usted lo revisa y sale con un clic.' },
  ],
  groupe: 'Lo que muestra la escena',
  tableau: 'El panel del club: 28.640 euros cobrados de 40.395 previstos, el resto pendiente o atrasado. Importes ficticios.',
  relance: {
    asso: 'Club de Voleibol Demo',
    quand: 'ahora',
    objet: '110 € de pago atrasado',
    texte: 'Hola, Sophie: faltan 110 € en la inscripción de Léna; el pago del plazo del 28 de septiembre de 2026 no se ha recibido.',
    aria: 'El recordatorio que recibe la familia: Club de Voleibol Demo, 110 euros de pago atrasado. Datos ficticios.',
  },
  temps: {
    avant: 'de papeleo por temporada',
    rendu: 'que recupera la junta directiva',
    part: `es decir, un ${PART_RENDUE.es} menos de papeleo`,
    note: `Estimación para ${N} socios, no un estudio.`,
    lien: 'El cálculo',
  },
  pause: 'Pausar',
  reprise: 'Reanudar la animación',
  sports: {
    liste: [
      { texte: 'Fútbol', href: '/sport/football' },
      { texte: 'baloncesto', href: '/sport/basket' },
      { texte: 'voleibol', href: '/sport/volley' },
      { texte: 'balonmano', href: '/sport/handball' },
      { texte: 'judo', href: '/sport/judo' },
      { texte: 'tenis', href: '/sport/tennis' },
    ],
    aussi: 'y también la música y el teatro.',
  },
}

export const SEMAINE_ES: TextesSemaine = {
  titre: 'Su semana, con o sin OnClub',
  sans: 'Sin OnClub',
  avec: 'Con OnClub',
  indice: '<b>Accione el interruptor</b> para ver la misma semana con OnClub.',
  compteur: 'de papeleo por temporada',
  pour: `para ${N} socios`,
  rendu: 'que recupera la junta directiva',
  tete: 'Sus noches de la semana',
  toucher: 'Toque una noche',
  parSaison: 'Por temporada',
  groupe: 'Las noches de la junta directiva: elija una para ver el detalle',
  soirs: [
    { jour: 'Lunes por la noche', quoiSans: 'Copiar las fichas', commentSans: 'Una a una, a mano', quoiAvec: 'El entrenamiento del lunes', commentAvec: 'La familia las rellena ella misma',
      legendeSans: 'Las fichas llegan en papel; <b>un voluntario copia cada expediente.</b>', legendeAvec: '<b>La familia inscribe a su hijo desde el móvil</b>: su equipo, la cuota con tarjeta o fraccionada.' },
    { jour: 'Martes por la noche', quoiSans: 'Cuadrar los pagos', commentSans: 'Cheques y transferencias, en la hoja de cálculo', quoiAvec: 'Noche libre', commentAvec: 'La tarjeta se registra sola',
      legendeSans: 'Los cheques con fecha diferida esperan en un cajón; <b>cada pago se marca a mano.</b>', legendeAvec: '<b>Los pagos con tarjeta se registran solos</b>; un cheque se anota en el expediente con un clic.' },
    { jour: 'Miércoles por la noche', quoiSans: 'Reclamar los pagos atrasados', commentSans: 'El mismo mensaje, familia por familia', quoiAvec: 'Noche libre', commentAvec: 'Un recordatorio con un clic',
      legendeSans: 'Averiguar quién debe qué, <b>escribir el mismo mensaje, tres veces.</b>', legendeAvec: '<b>El mensaje ya está escrito</b>: usted lo revisa y sale con un clic.' },
    { jour: 'Jueves por la noche', quoiSans: 'Reclamar los justificantes', commentSans: 'Certificados, autorizaciones', quoiAvec: 'El ensayo del jueves', commentAvec: 'En foto, reclamados con un clic',
      legendeSans: 'El certificado que falta, <b>descubierto en el peor momento.</b>', legendeAvec: '<b>Los justificantes llegan en foto</b>; los que faltan se reclaman con un clic.' },
    { jour: 'Viernes por la noche', quoiSans: 'Preparar el inicio de temporada', commentSans: 'Listas, equipos, plazas', quoiAvec: 'La noche en familia', commentAvec: 'Los equipos se conservan',
      legendeSans: 'En junio, <b>todas las listas vuelven a empezar de cero.</b>', legendeAvec: '<b>Se abre la temporada siguiente</b>: las plazas quedan guardadas, el enlace llega a las familias.' },
  ],
  objets: {
    fiche: 'Ficha de inscripción', ficheNom: 'Nombre: ……………', ficheNe: 'Fecha de nacimiento: … / … / ……', aRecopier: 'Por copiar',
    message: 'Hola, ¿quedan plazas en los M11?',
    cheque: 'Cheque n.º 3 de 4', chequeDepot: 'Para ingresar el 5 de noviembre', tableur: 'cuotas_2026_FINAL(3).xlsx',
    relance3: 'Recordatorio n.º 3', relance2: 'Recordatorio n.º 2', relanceTexte: 'Cuota de septiembre, todavía nada',
    certificat: 'Certificado médico', manquant: 'Falta', autorisation: 'Autorización parental', manquante: 'Falta',
    equipes: 'Equipos 2027-2028', equipesL1: 'M15 femenino: ¿quién vuelve?', equipesL2: 'M13 masculino: … / 12', aRefaire: 'Por rehacer', tableurEquipes: 'equipos_2027_v2.xlsx',
  },
  tableau: 'El panel del club: 28.640 euros cobrados de 40.395 previstos, el resto pendiente o atrasado. Importes ficticios.',
  pieces: {
    asso: 'Club de Voleibol Demo', titre: 'Justificantes', sous: 'Temporada 2026-2027 · enviados en foto por las familias',
    lignes: [
      { nom: 'Léa Martin', detail: 'Certificado médico', statut: 'Aceptado', ton: 'ok' },
      { nom: 'Hugo Roux', detail: 'Declaración de salud', statut: 'Por revisar', ton: 'neutre' },
      { nom: 'Yanis Haddad', detail: 'Certificado médico', statut: 'Falta', ton: 'ko' },
    ],
    bouton: 'Reclamar los justificantes que faltan',
  },
  hypotheses: 'Ver las hipótesis',
  note: `Estimación para ${N} socios, no un estudio. Nombres e importes ficticios.`,
  perimetre: (g, mini, pro) => `Las ${g}: ${mini} desde Mini (fichas, pagos, recordatorios, justificantes), ${pro} más con Pro (el inicio de temporada).`,
  lien: 'Calcular para mi club',
  pause: 'Pausar',
  reprise: 'Reanudar la animación',
}

/** Les mots du calculateur compact (« 61 h recuperadas cada temporada, para [250] socios. »). */
export const MOTS_CALCUL_ES = { avant: 'recuperadas cada temporada, para', apres: 'socios.', etiquette: 'Número de socios' }

const ecran = (x: Omit<Ecran, 'famille' | 'titre' | 'texte' | 'lien' | 'lienNom' | 'legende'>): Ecran =>
  ({ famille: '', titre: '', texte: '', lien: '', lienNom: '', legende: '', ...x })

/** Les écrans de l'accueil, dans leur état final, traduits (noms et montants fictifs). */
export const ECRANS_ES = {
  inscription: ecran({
    asso: 'Su club', ecranTitre: 'Inscripción 2026-2027', ecranSous: 'Un solo formulario para toda la familia',
    lignes: [
      { nom: 'Léa Martin, nacida en 2013', detail: 'M15 femenino · lunes 18:00', statut: '4 plazas', ton: 'ok' },
      { nom: 'Pago', detail: 'En un solo pago', statut: 'Tarjeta', ton: 'neutre' },
      { nom: 'Cuestionario de salud', detail: 'Declaración firmada en línea', statut: 'Recibida', ton: 'ok' },
    ],
    pied: { libelle: 'Total', valeur: '180 €' }, bouton: 'Confirmar mi solicitud',
  }),
  tableau: ecran({
    asso: 'Su club', ecranTitre: 'Inicio', ecranSous: 'Temporada 2026-2027 · en curso',
    lignes: [
      { nom: 'Cobrado', detail: 'de 40.395 € previstos', statut: '28.640 €', ton: 'ok' },
      { nom: 'Pendiente', detail: 'plazos programados', statut: '9.870 €', ton: 'neutre' },
      { nom: 'Atrasado', detail: 'plazos vencidos', statut: '365 €', ton: 'ko' },
    ],
    bouton: 'Ver los pagos atrasados',
  }),
  relance: ecran({
    asso: 'Su club', ecranTitre: '3 familias con pagos atrasados', ecranSous: 'Temporada 2026-2027 · en curso',
    lignes: [
      { nom: 'Familia Roux', detail: 'M13 masculino · pagado 160 € de 480 €', statut: 'Atrasado', ton: 'ko' },
      { nom: 'Familia Lambert', detail: 'M15 femenino · pagado 110 € de 330 €', statut: 'Atrasado', ton: 'ko' },
      { nom: 'Familia Haddad', detail: 'M11 mixto · pagado 95 € de 285 €', statut: 'Atrasado', ton: 'ko' },
    ],
    pied: { libelle: 'Pendiente de cobro', valeur: '730 €' }, bouton: 'Enviar el recordatorio a la familia Lambert',
  }),
  reinscription: ecran({
    asso: 'Su club', ecranTitre: '2027-2028 · en preparación', ecranSous: 'Vuelven 14 de 31 antiguos jugadores · 3 plazas guardadas',
    lignes: [
      { nom: 'M15 femenino', detail: '9 de 12 · 3 antiguas sin respuesta', statut: '3 plazas libres', ton: 'neutre' },
      { nom: 'M13 femenino', detail: '8 de 12 · 4 antiguas sin respuesta', statut: '4 plazas libres', ton: 'neutre' },
      { nom: 'Léa M., nacida en 2014', detail: 'Guardada en M15 femenino por su entrenador', statut: 'Plaza guardada', ton: 'ok' },
    ],
    bouton: 'Avisar a 9 familias',
  }),
  compo: ecran({
    asso: 'Su club', ecranTitre: 'Sénior femenino · partido del sábado', ecranSous: 'Respuestas a la convocatoria',
    lignes: [
      { nom: 'Manon', detail: 'Colocadora', statut: 'Presente', ton: 'ok' },
      { nom: 'Jade', detail: 'Central', statut: 'Presente', ton: 'ok' },
      { nom: 'Lou', detail: 'Receptora-atacante', statut: 'Presente', ton: 'ok' },
      { nom: 'Clara', detail: 'Central', statut: 'Ausente', ton: 'ko' },
    ],
    pied: { libelle: 'Han respondido', valeur: '9 de 10' }, bouton: 'Guardar la alineación',
  }),
  convocations: ecran({
    asso: 'Su club', ecranTitre: 'Partido · sábado 17 de octubre, 14 h', ecranSous: 'U13 · 11 presentes · 2 ausentes · 1 sin respuesta',
    lignes: [
      { nom: 'Nathan Bernard', statut: 'Presente', ton: 'ok' },
      { nom: 'Hugo Arnaud', statut: 'Ausente', ton: 'ko' },
      { nom: 'Enzo Garcia', statut: 'Sin respuesta', ton: 'neutre' },
      { nom: 'Malo Chevalier', statut: 'Presente', ton: 'ok' },
    ],
    bouton: 'Preparar la alineación',
  }),
  site: ecran({
    asso: 'Su club', ecranTitre: 'Web del club', ecranSous: 'Horarios, precios y plazas vienen de OnClub',
    lignes: [
      { nom: 'Cursos y equipos', detail: 'desde OnClub', statut: 'Al día', ton: 'ok' },
      { nom: 'Precios y plazas', detail: 'leídos de las inscripciones', statut: 'Al día', ton: 'ok' },
      { nom: 'U13', detail: 'Inscripciones', statut: 'Completo', ton: 'neutre' },
    ],
    bouton: 'Publicar',
  }),
}
