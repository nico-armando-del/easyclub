/*
  LES SITES DE CLUB DE DÉMONSTRATION (la vitrine « faut montrer nos exemples »).

  Volta Volley Club et AS Montclar sont deux clubs INVENTÉS, branchés sur
  OnClub, pour montrer ce qu'une association peut avoir. On les présente comme
  « clubs de démonstration » : pas de badge « Exemple », pas de lien vers ces
  sites (ils ne sont pas déployés), pas d'URL dans le cadre.

  Les images vivent dans public/img/clubs/ (produites depuis les captures du
  scratchpad, maquettes §E.1) ; largeur et hauteur mesurées avec
  `magick identify`. Les photos du Volta Volley Club viennent de Freepik :
  créditées sur /credits-photos (FREEPIK_VOLTA ci-dessous).

  `cible` : le bouton « S'inscrire » du club, en % de la capture `ordi`
  (relevé sur la capture en 1400 × 875).
*/

export interface ImageClub {
  /** Chemin de la plus grande version. */
  src: string
  /** Versions pour srcset, du plus petit au plus grand. */
  tailles: { src: string; w: number }[]
  width: number
  height: number
}

export interface Club {
  id: string
  nom: string
  sport: string
  /** Le texte de l'onglet. */
  onglet: string
  /** Texte alternatif de la capture ordinateur. */
  alt: string
  /** Texte alternatif de la capture téléphone. */
  altTel: string
  ordi: ImageClub
  /** Capture longue qui défile dans le cadre (absente : la courte reste figée). */
  ordiLong?: ImageClub
  tel: ImageClub
  telLong?: ImageClub
  cible: { x: number; y: number; l: number; h: number }
}

const D = '/img/clubs/'
const ordi = (id: string): ImageClub => ({
  src: `${D}${id}-ordi-1400.webp`,
  tailles: [{ src: `${D}${id}-ordi-700.webp`, w: 700 }, { src: `${D}${id}-ordi-1400.webp`, w: 1400 }],
  width: 1400, height: 875,
})
const tel = (id: string): ImageClub => ({
  src: `${D}${id}-tel-560.webp`,
  tailles: [{ src: `${D}${id}-tel-280.webp`, w: 280 }, { src: `${D}${id}-tel-560.webp`, w: 560 }],
  width: 560, height: 1212,
})
const long = (id: string, h1400: number): ImageClub => ({
  src: `${D}${id}-ordi-long-1400.webp`,
  tailles: [{ src: `${D}${id}-ordi-long-700.webp`, w: 700 }, { src: `${D}${id}-ordi-long-1400.webp`, w: 1400 }],
  width: 1400, height: h1400,
})

const CIBLE_VOLTA = { x: 84.1, y: 1.5, l: 10.3, h: 4.9 }

export const VOLTA: Club = {
  id: 'volta', nom: 'Volta Volley Club', sport: 'volley',
  onglet: 'Volta Volley Club · volley',
  alt: 'Accueil du site de Volta Volley Club, club de démonstration : ses équipes, son agenda, et le bouton S’inscrire qui mène aux inscriptions OnClub.',
  altTel: 'Le site de Volta Volley Club, club de démonstration, sur téléphone.',
  ordi: ordi('volta'), ordiLong: long('volta', 2333), tel: tel('volta'),
  cible: CIBLE_VOLTA,
}

export const VOLTA_EQUIPES: Club = {
  id: 'volta-equipes', nom: 'Volta Volley Club', sport: 'volley',
  onglet: 'Volta · équipes',
  alt: 'Page des équipes du site de Volta Volley Club, club de démonstration, sur ordinateur.',
  altTel: 'La page des équipes de Volta Volley Club, club de démonstration, sur téléphone.',
  ordi: ordi('volta-equipes'), tel: tel('volta-equipes'),
  cible: CIBLE_VOLTA,
}

export const MONTCLAR: Club = {
  id: 'montclar', nom: 'AS Montclar', sport: 'football',
  onglet: 'AS Montclar · football',
  alt: 'Accueil du site d’AS Montclar, club de démonstration de football.',
  altTel: 'Le site d’AS Montclar, club de démonstration de football, sur téléphone.',
  ordi: ordi('montclar'), ordiLong: long('montclar', 2333), tel: tel('montclar'),
  cible: { x: 79.2, y: 5.4, l: 8.4, h: 6 },
}

/** L'accueil (A5) : deux clubs, avec leurs captures longues. */
export const CLUBS: Club[] = [VOLTA, MONTCLAR]

/** La page site-association : trois onglets (pas l'agenda de Volta, vide). */
export const CLUBS_PAGE: Club[] = [
  { ...VOLTA, onglet: 'Volta · accueil' },
  VOLTA_EQUIPES,
  MONTCLAR,
]

/** Les fonctionnalités qui posent la vitrine à la place du visuel du héros. */
export const PAGES_VITRINE: string[] = ['site-association']

export const LEGENDE_VITRINE = 'Deux clubs de démonstration, inventés pour montrer ce que votre association peut avoir.'

/** Les 12 photos Freepik du Volta Volley Club (relevées dans le dépôt site-volta-volley). */
export const FREEPIK_VOLTA = [
  'female-professional-volleyball-players-action-3d-stadium_654080-1063',
  'female-professional-volleyball-players-action-3d-stadium_654080-1089',
  'girl-playing-volleyball_23-2149450948',
  'girl-posing-with-volley-ball_23-2149450977',
  'girls-doing-high-five-volleyball-field_23-2149451044',
  'girls-hugging-volleyball-field_23-2149451033',
  'girls-playing-volleyball_23-2149450963',
  'people-playing-game-volleyball_52683-87453',
  'volleyball-ball-hands-background-net_185193-163394',
  'young-people-playing-volleyball-beach_613910-4463',
  'young-volleyball-man-player-court_23-2149492353',
  'young-volleyball-players_1098-12890',
].map((id) => `https://www.freepik.com/free-photo/${id}.htm`)
