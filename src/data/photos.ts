/*
  LES PHOTOS DU SITE. Une entrée par photo : le fichier vit dans
  public/img/photos/<fichier>-640.webp et -<grand>.webp (recadrées 3:2).
  Les photos Unsplash (licence Unsplash : usage commercial libre, crédit
  facultatif) sont créditées sur /credits-photos. Celles sans `auteur`
  appartiennent au site depuis la première version.
  Règle : pas d'enfant identifiable, pas de club réel reconnaissable.
*/
export interface Photo {
  fichier: string
  alt: string
  grand?: 1280 | 1200
  auteur?: string
  profil?: string
  page?: string
}

const U = (id: string) => `https://unsplash.com/photos/${id}`

export const PHOTOS: Record<string, Photo> = {
  volley: { fichier: 'volley', alt: 'Match de volley en salle, un joueur au smash au-dessus du filet', auteur: 'HorseRat', profil: 'https://unsplash.com/@horseratbros', page: U('FcuE1a_pOA0') },
  handball: { fichier: 'handball', alt: 'Match de handball en gymnase, un tireur face à deux défenseurs', auteur: 'Kryštof Zajíček', profil: 'https://unsplash.com/@krystof_007', page: U('YN2xypsV_cM') },
  tennis: { fichier: 'tennis', alt: 'Joueur de tennis au service sur un court bleu', auteur: 'Andrew Heald', profil: 'https://unsplash.com/@aheald25', page: U('C1bGTi-rSus') },
  rugby: { fichier: 'rugby', alt: 'Mêlée de rugby sur un terrain en herbe', auteur: 'Olga Guryanova', profil: 'https://unsplash.com/@designer4u', page: U('ft7vJxwl2RY') },
  natation: { fichier: 'natation', alt: 'Nageurs à l’entraînement dans les lignes d’une piscine extérieure', auteur: 'Kaptured by Kasia', profil: 'https://unsplash.com/@kasiade', page: U('tG8Y8r0t4N0') },
  gymnastique: { fichier: 'gymnastique', alt: 'Gymnaste en plein saut au-dessus de la table, devant le public', auteur: 'Andre Ouellet', profil: 'https://unsplash.com/@ledoc', page: U('37X0N_UYw6k') },
  badminton: { fichier: 'badminton', alt: 'Joueur de badminton en suspension pour un smash, dans un gymnase', auteur: 'Muktasim Azlan', profil: 'https://unsplash.com/@muktasimazlan', page: U('rjWfNR_AC5g') },
  athletisme: { fichier: 'athletisme', alt: 'Coureur sur la piste d’un stade d’athlétisme', auteur: 'Hannah Coleman', profil: 'https://unsplash.com/@hvcoleman91', page: U('UFs5bKHgo4U') },
  karate: { fichier: 'karate', alt: 'Karatékas en kimono alignés à genoux pour le salut', auteur: 'Thao LEE', profil: 'https://unsplash.com/@h4x0r3', page: U('yYSY93clr4w') },
  escalade: { fichier: 'escalade', alt: 'Grimpeuse sur un mur de bloc en salle', auteur: 'Yns Plt', profil: 'https://unsplash.com/@ynsplt', page: U('NY1D4Zni7fc') },
  equitation: { fichier: 'equitation', alt: 'Cavalière au trot dans une carrière de sable', auteur: 'Oleg Didenko', profil: 'https://unsplash.com/@o_did', page: U('xFhOYE1Xk6M') },
  'ecole-de-musique': { fichier: 'ecole-de-musique', alt: 'Cours de guitare : un professeur place les doigts d’une élève', auteur: 'Vitaly Gariev', profil: 'https://unsplash.com/@silverkblack', page: U('S-vWVfbGr28') },
  chorale: { fichier: 'chorale', alt: 'Chorale en robes sur scène, face à son chef de chœur', auteur: 'John Onaeko', profil: 'https://unsplash.com/@iyinoluwaonaeko', page: U('8__esxuic9Q') },
  theatre: { fichier: 'theatre', alt: 'Répétition de théâtre : deux comédiennes travaillent une scène', auteur: 'Javad Esmaeili', profil: 'https://unsplash.com/@javad_esmaeili', page: U('ZfxAQw1ksM8') },
  'ecole-de-langues': { fichier: 'ecole-de-langues', alt: 'Salle de cours pleine d’adultes face à un écran de présentation', auteur: 'Quilia', profil: 'https://unsplash.com/@heyquilia', page: U('1-aA2Fadydc') },
  'arts-plastiques': { fichier: 'arts-plastiques', alt: 'Mains qui peignent une aquarelle dans un carnet', auteur: 'Jelleke Vanooteghem', profil: 'https://unsplash.com/@ilumire', page: U('8Arw-cEpt-Q') },
  'club-d-echecs': { fichier: 'club-d-echecs', alt: 'Échiquiers et pendules alignés pour un tournoi', auteur: 'Mitchell Johnson', profil: 'https://unsplash.com/@mitchazj', page: U('CZRNxAIYLzI') },
  'ecole-de-cirque': { fichier: 'ecole-de-cirque', alt: 'Acrobate sur un cerceau aérien au-dessus de musiciens, sur scène', auteur: 'Pierre Goiffon', profil: 'https://unsplash.com/@pir', page: U('yakyM5Ce_u4') },
  'mjc-centre-social': { fichier: 'mjc-centre-social', alt: 'Atelier créatif autour d’une table dans un centre social', auteur: 'Centre for Ageing Better', profil: 'https://unsplash.com/@ageing_better', page: U('8NDGA3RepNg') },
  'association-de-loisirs': { fichier: 'association-de-loisirs', alt: 'Partie de jeu de société entre amis autour d’une table', auteur: '2H Media', profil: 'https://unsplash.com/@2hmedia', page: U('pm7QgL2pnSQ') },
  benevole: { fichier: 'benevole', alt: 'Bénévole souriant dans un gymnase, raquette de badminton à la main', auteur: 'Centre for Ageing Better', profil: 'https://unsplash.com/@ageing_better', page: U('ZUfemVGxqFk') },
  terrain: { fichier: 'terrain', alt: 'Terrain de football éclairé à la tombée de la nuit', auteur: 'sporlab', profil: 'https://unsplash.com/@sporlab', page: U('ggUrWc5Pg9o') },
  football: { fichier: 'football', alt: 'Jeunes footballeurs à l’entraînement, ballons au pied', grand: 1200 },
  basket: { fichier: 'basket', alt: 'Entraînement de basket dans un gymnase', grand: 1200 },
  judo: { fichier: 'judo', alt: 'Judokas en kimono à l’échauffement sur le tatami', grand: 1200 },
  danse: { fichier: 'danse', alt: 'Cours de danse classique à la barre', grand: 1200 },
  yoga: { fichier: 'yoga', alt: 'Cours de yoga, bras levés sur les tapis', grand: 1200 },
  fitness: { fichier: 'fitness', alt: 'Cours collectif de gym sur tapis dans une salle lumineuse', grand: 1200 },
}

/* Les pages dont le nom diffère du fichier (variantes de slug). */
const ALIAS: Record<string, string> = {
  basketball: 'basket', 'danse-classique': 'danse', 'ecole-de-danse': 'danse', 'danse-moderne': 'danse',
  'gym': 'fitness', 'gymnastique-volontaire': 'fitness', 'volley-ball': 'volley', 'hand-ball': 'handball',
}

export const photoDe = (slug: string): Photo | undefined => PHOTOS[slug] ?? PHOTOS[ALIAS[slug] ?? '']

export const srcset = (p: Photo) => `/img/photos/${p.fichier}-640.webp 640w, /img/photos/${p.fichier}-${p.grand ?? 1280}.webp ${p.grand ?? 1280}w`
