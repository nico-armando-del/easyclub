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
  /* Sports du catalogue (10 oct. 2026), Unsplash, étalonnées par brand/horizon-grade.py. */
  'aeroclub': { fichier: 'aeroclub', alt: "Petits avions d’aéroclub sur un aérodrome, montagnes au fond", auteur: "Pierre Goiffon", profil: 'https://unsplash.com/@pir', page: U('HjaS2XJr0ws') },
  'aeromodelisme': { fichier: 'aeromodelisme', alt: "Modèle réduit d’avion en vol dans un ciel bleu", auteur: "Ben Berwers", profil: 'https://unsplash.com/@benberwers', page: U('DzVljoScWZg') },
  'aikido': { fichier: 'aikido', alt: "Projection d’aïkido dans un dojo, en noir et blanc", auteur: "Nando García", profil: 'https://unsplash.com/@masklim', page: U('qBJZUtmkPJ4') },
  'alpinisme-montagne': { fichier: 'alpinisme-montagne', alt: "Alpiniste sur une arête enneigée", auteur: "Mike Markov", profil: 'https://unsplash.com/@mikemarkov', page: U('v7BkDZg7pK8') },
  'apnee': { fichier: 'apnee', alt: "Apnéiste avec palmes sous l’eau", auteur: "Israel Gil", profil: 'https://unsplash.com/@israelgilfilms', page: U('cBBLR2b58Qg') },
  'arts-martiaux-vietnamiens': { fichier: 'arts-martiaux-vietnamiens', alt: "Pratiquant d’arts martiaux sur une plage au coucher du soleil", auteur: "Thao LEE", profil: 'https://unsplash.com/@h4x0r3', page: U('igLzPKOvZNw') },
  'aviron': { fichier: 'aviron', alt: "Huit d’aviron sur l’eau au coucher du soleil", auteur: "Mitchell Luo", profil: 'https://unsplash.com/@mitchel3uo', page: U('H3htK85wwnU') },
  'ball-trap': { fichier: 'ball-trap', alt: "Tireur au fusil sur un pas de tir en plein air", auteur: "Michael Satterfield", profil: 'https://unsplash.com/@satterfieldgroup', page: U('UZVBTHZAZ0E') },
  'baseball-softball': { fichier: 'baseball-softball', alt: "Batteur de baseball devant le receveur", auteur: "Chris Chow", profil: 'https://unsplash.com/@chris_chow', page: U('BhwRQr08PcM') },
  'billard': { fichier: 'billard', alt: "Joueur penché sur une table de billard", auteur: "Klara Kulikova", profil: 'https://unsplash.com/@kkalerry', page: U('DUcVepObkXk') },
  'bmx': { fichier: 'bmx', alt: "Pilote de BMX en saut au-dessus d’une piste", auteur: "Jan Kopřiva", profil: 'https://unsplash.com/@jxk', page: U('sQ1ZfaaXKvI') },
  'bowling': { fichier: 'bowling', alt: "Boule de bowling face aux quilles", auteur: "Ella Christenson", profil: 'https://unsplash.com/@ellabella124', page: U('l6DorjudX64') },
  'boxe-anglaise': { fichier: 'boxe-anglaise', alt: "Boxeur à l’entraînement sur un sac de frappe", auteur: "Michael Starkie", profil: 'https://unsplash.com/@starkie_pics', page: U('ynaiLpRBigY') },
  'canicross': { fichier: 'canicross', alt: "Coureuse et son chien sur un chemin en forêt", auteur: "Annie Spratt", profil: 'https://unsplash.com/@anniespratt', page: U('R48fyXFiaZk') },
  'canoe-kayak': { fichier: 'canoe-kayak', alt: "Kayaks de couleur sur une eau turquoise", auteur: "Brandon McDonald", profil: 'https://unsplash.com/@colvus', page: U('_oU62drqdho') },
  'cheerleading': { fichier: 'cheerleading', alt: "Équipe de cheerleading en pyramide", auteur: "Michał Parzuchowski", profil: 'https://unsplash.com/@mparzuchowski', page: U('lHkUBtUiI2Q') },
  'corde-a-sauter': { fichier: 'corde-a-sauter', alt: "Saut à la corde dans une salle de sport", auteur: "Vitaly Gariev", profil: 'https://unsplash.com/@silverkblack', page: U('d5Q4aBfZclM') },
  'course-a-pied': { fichier: 'course-a-pied', alt: "Coureurs sur la route d’une course", auteur: "Miguel A Amutio", profil: 'https://unsplash.com/@amutiomi', page: U('Y0woUmyxGrw') },
  'course-camarguaise': { fichier: 'course-camarguaise', alt: "Taureau seul dans une arène de sable", auteur: "Piermario Eva", profil: 'https://unsplash.com/@p1mm1', page: U('YaLqaPtlZ0o') },
  'course-d-orientation': { fichier: 'course-d-orientation', alt: "Orienteur qui lit sa carte en forêt", auteur: "Annie Spratt", profil: 'https://unsplash.com/@anniespratt', page: U('JSra0N9uP1s') },
  'curling': { fichier: 'curling', alt: "Piste de curling sous les lumières de la halle", auteur: "Francis Bouffard", profil: 'https://unsplash.com/@frankbouffard', page: U('gkkmD3vsE98') },
  'cyclisme': { fichier: 'cyclisme', alt: "Peloton de cyclistes sur route", auteur: "Markus Spiske", profil: 'https://unsplash.com/@markusspiske', page: U('WUehAgqO5hE') },
  'cyclotourisme': { fichier: 'cyclotourisme', alt: "Cycliste sur un chemin de campagne", auteur: "Éole Wind", profil: 'https://unsplash.com/@eolewind', page: U('yzKVi7ypDn4') },
  'disc-golf': { fichier: 'disc-golf', alt: "Joueur qui lance un disque vers une corbeille de disc-golf", auteur: "Priscilla Du Preez", profil: 'https://unsplash.com/@priscilladupreez', page: U('y85vZTvzd2g') },
  'escrime': { fichier: 'escrime', alt: "Assaut d’escrime, en noir et blanc", auteur: "Nathanaël Desmeules", profil: 'https://unsplash.com/@nathanael240606', page: U('-Gn8f-0BuP8') },
  'football-americain': { fichier: 'football-americain', alt: "Joueurs de football américain sur le terrain", auteur: "Tim Mossholder", profil: 'https://unsplash.com/@timmossholder', page: U('2f-fY4e5-Qs') },
  'force-athletique': { fichier: 'force-athletique', alt: "Athlète de force devant une barre chargée", auteur: "Alora Griffiths", profil: 'https://unsplash.com/@aloragriffiths', page: U('E3wehabi_B4') },
  'futsal': { fichier: 'futsal', alt: "Ballon de futsal au pied d’un joueur en salle", auteur: "Abby Tait", profil: 'https://unsplash.com/@artsyant', page: U('3EBaEQ0mKPk') },
  'golf': { fichier: 'golf', alt: "Golfeur en fin de swing sur le parcours", auteur: "Mick Haupt", profil: 'https://unsplash.com/@rocinante_11', page: U('m0iXio5FF7M') },
  'gymnastique-rythmique': { fichier: 'gymnastique-rythmique', alt: "Gymnaste en saut dans une salle sombre", auteur: "Naveen Ketterer", profil: 'https://unsplash.com/@naveenketterer', page: U('qLGhEt8sVWQ') },
  'halterophilie-musculation': { fichier: 'halterophilie-musculation', alt: "Haltérophile barre au-dessus de la tête, de dos", auteur: "John Arano", profil: 'https://unsplash.com/@johnarano', page: U('h4i9G-de7Po') },
  'handisport': { fichier: 'handisport', alt: "Match de basket fauteuil", auteur: "Moses Malik Roldan", profil: 'https://unsplash.com/@mosesmroldan', page: U('pLmGSrIz5zQ') },
  'hockey-sur-gazon': { fichier: 'hockey-sur-gazon', alt: "Match de hockey sur gazon synthétique", auteur: "John Torcasio", profil: 'https://unsplash.com/@johntorcasio', page: U('Cbw_Q_3bYsA') },
  'hockey-sur-glace': { fichier: 'hockey-sur-glace', alt: "Mise en jeu de hockey sur glace devant l’arbitre", auteur: "Jerry Yu", profil: 'https://unsplash.com/@jerryyu', page: U('HRo2pfbVulQ') },
  'jujitsu': { fichier: 'jujitsu', alt: "Combat au sol de jiu-jitsu sur le tapis", auteur: "Joshua Jamias", profil: 'https://unsplash.com/@joshuajamias', page: U('qmdqe3Cs5Og') },
  'karting': { fichier: 'karting', alt: "Pilote de kart dans un virage", auteur: "Appic", profil: 'https://unsplash.com/@appic_cc', page: U('nCrQ8sMa0c8') },
  'kendo': { fichier: 'kendo', alt: "Kendoka en armure assis, masque baissé", auteur: "ARTHUR YAO", profil: 'https://unsplash.com/@fakearthur', page: U('hZmieWs0wQA') },
  'kick-boxing': { fichier: 'kick-boxing', alt: "Deux combattants de kick-boxing casqués sur le ring", auteur: "Hermes Rivera", profil: 'https://unsplash.com/@hermez777', page: U('qbf59TU077Q') },
  'kitesurf': { fichier: 'kitesurf', alt: "Kitesurfeur en saut au-dessus des vagues", auteur: "Renan Brun", profil: 'https://unsplash.com/@renan_brun', page: U('bvXm1m8cbSM') },
  'krav-maga': { fichier: 'krav-maga', alt: "Entraînement de self-défense avec gants", auteur: "Daniil Zanevskiy", profil: 'https://unsplash.com/@danil_zan', page: U('NIZS__PjZyM') },
  'kung-fu-wushu': { fichier: 'kung-fu-wushu', alt: "Groupe d’arts martiaux sur une plage au lever du jour", auteur: "Thao LEE", profil: 'https://unsplash.com/@h4x0r3', page: U('Xl-ilWBKJNk') },
  'longe-cote': { fichier: 'longe-cote', alt: "Pieds dans les vagues au bord de la mer", auteur: "Marco Biasibetti", profil: 'https://unsplash.com/@marcobias', page: U('5nagizND5Ec') },
  'lutte': { fichier: 'lutte', alt: "Lutteurs au sol dans un gymnase", auteur: "Chris Chow", profil: 'https://unsplash.com/@chris_chow', page: U('TxxSLvOvfCk') },
  'marche-nordique': { fichier: 'marche-nordique', alt: "Groupe de marcheurs avec bâtons en montagne", auteur: "MChe Lee", profil: 'https://unsplash.com/@mclee', page: U('nTs56fr_71o') },
  'mma': { fichier: 'mma', alt: "Combat d’arts martiaux mixtes dans une cage, en noir et blanc", auteur: "Diego Corona", profil: 'https://unsplash.com/@cldiego', page: U('_fljZhTXzSs') },
  'montgolfiere': { fichier: 'montgolfiere', alt: "Montgolfière colorée dans le ciel", auteur: "Aaron Burden", profil: 'https://unsplash.com/@aaronburden', page: U('h7wpIMY3O3E') },
  'motocross': { fichier: 'motocross', alt: "Pilote de motocross dans la poussière d’un virage", auteur: "Alina Rubo", profil: 'https://unsplash.com/@lubitglazami', page: U('0UPXpeKTCtc') },
  'motonautisme': { fichier: 'motonautisme', alt: "Pilote de jet-ski en mer", auteur: "Steve Donoghue", profil: 'https://unsplash.com/@steve_donoghue', page: U('ynRImHi8LnY') },
  'muay-thai': { fichier: 'muay-thai', alt: "Combat de boxe thaïe sur le ring", auteur: "Pablo Rebolledo", profil: 'https://unsplash.com/@prvelasco89', page: U('h8sl-oNcat0') },
  'natation-artistique': { fichier: 'natation-artistique', alt: "Nageuses de natation artistique dans le bassin", auteur: "Nathanaël Desmeules", profil: 'https://unsplash.com/@nathanael240606', page: U('Ne6YRz-1Osw') },
  'padel': { fichier: 'padel', alt: "Raquette de padel en main sur le court", auteur: "Manuel Pappacena", profil: 'https://unsplash.com/@manupappa', page: U('zTwzxr4BbTA') },
  'parachutisme': { fichier: 'parachutisme', alt: "Parachutiste en chute libre au-dessus des nuages", auteur: "Kamil Pietrzak", profil: 'https://unsplash.com/@kamilpphotos', page: U('ht1xt4FfmFs') },
  'parapente': { fichier: 'parapente', alt: "Parapente au décollage sur une pente au coucher du soleil", auteur: "Juliette G.", profil: 'https://unsplash.com/@julietteg', page: U('bmBLu_oAEj8') },
  'parkour': { fichier: 'parkour', alt: "Traceur de parkour en saut entre deux murs", auteur: "Daoud Abismail", profil: 'https://unsplash.com/@davfilmx', page: U('CILLYbhfWqM') },
  'patinage-artistique': { fichier: 'patinage-artistique', alt: "Patineuse en mouvement sur la glace", auteur: "Rod Long", profil: 'https://unsplash.com/@rodlong', page: U('1wDEvHfXdr4') },
  'peche-sous-marine': { fichier: 'peche-sous-marine', alt: "Chasseur sous-marin avec son fusil sous l’eau", auteur: "Michael Worden", profil: 'https://unsplash.com/@mike2244', page: U('LG9A0okYj4E') },
  'peche-sportive': { fichier: 'peche-sportive', alt: "Pêcheur au bord d’un lac", auteur: "Vitalii Khodzinskyi", profil: 'https://unsplash.com/@khodzinskyi', page: U('6xpD1s4tymA') },
  'pentathlon-moderne': { fichier: 'pentathlon-moderne', alt: "Pentathlonien franchissant un obstacle", auteur: "Omar Abozeid", profil: 'https://unsplash.com/@omar_abozeid', page: U('HAf1aC8Z01E') },
  'petanque': { fichier: 'petanque', alt: "Boules de pétanque et cochonnet sur le sable", auteur: "Caroline Hernandez", profil: 'https://unsplash.com/@carolinehdz', page: U('2MGIwPHEFyY') },
  'pickleball': { fichier: 'pickleball', alt: "Joueur de pickleball sur un court en plein air", auteur: "Jon Matthews", profil: 'https://unsplash.com/@jkmatt', page: U('FVhXFRkLcpA') },
  'plongee-sous-marine': { fichier: 'plongee-sous-marine', alt: "Plongeur au milieu d’un banc de poissons", auteur: "Sebastian Pena Lambarri", profil: 'https://unsplash.com/@sebaspenalambarri', page: U('7i5HMCGupVw') },
  'plongeon': { fichier: 'plongeon', alt: "Plongeur entrant dans l’eau d’une piscine", auteur: "Brian Matangelo", profil: 'https://unsplash.com/@bmatangelo', page: U('gRof2_Ftu7A') },
  'polo': { fichier: 'polo', alt: "Joueurs de polo au galop", auteur: "Michael Jerrard", profil: 'https://unsplash.com/@michaeljerrard', page: U('O-RtTveS8ts') },
  'randonnee-pedestre': { fichier: 'randonnee-pedestre', alt: "Randonneurs sur un sentier de montagne", auteur: "Toomas Tartes", profil: 'https://unsplash.com/@toomastartes', page: U('Yizrl9N_eDA') },
  'roller': { fichier: 'roller', alt: "Patineurs de roller de vitesse en ligne", auteur: "Indira Tjokorda", profil: 'https://unsplash.com/@indiratjokorda', page: U('Y-VYK0SDLxs') },
  'rugby-a-xiii': { fichier: 'rugby-a-xiii', alt: "Joueurs de rugby en course balle en main", auteur: "Quino Al", profil: 'https://unsplash.com/@quinoal', page: U('XAlKHW9ierw') },
  'sabre-laser': { fichier: 'sabre-laser', alt: "Pratiquant de sabre laser de nuit", auteur: "Matthew Ball", profil: 'https://unsplash.com/@tex450', page: U('BFh8vYdphzM') },
  'sauvetage-sportif': { fichier: 'sauvetage-sportif', alt: "Sauveteurs sur une plage", auteur: "isi martínez", profil: 'https://unsplash.com/@isimartinez', page: U('Fn67pOYsl1Q') },
  'savate-boxe-francaise': { fichier: 'savate-boxe-francaise', alt: "Ring de boxe vide sous les projecteurs", auteur: "David Guliciuc", profil: 'https://unsplash.com/@hypefilms', page: U('o2zrjlM5s5o') },
  'skateboard': { fichier: 'skateboard', alt: "Skateur dans le bowl d’un skatepark", auteur: "Taylor Smith", profil: 'https://unsplash.com/@whoistaylorsmith', page: U('selWWrPDkoc') },
  'ski': { fichier: 'ski', alt: "Skieur en virage sur une piste ensoleillée", auteur: "Maarten Duineveld", profil: 'https://unsplash.com/@maarten_jpg', page: U('pmfJcN7RGiw') },
  'ski-nautique-wakeboard': { fichier: 'ski-nautique-wakeboard', alt: "Wakeboardeur en saut sur un lac", auteur: "Tim Mossholder", profil: 'https://unsplash.com/@timmossholder', page: U('anUlGHuUQ7o') },
  'speleologie': { fichier: 'speleologie', alt: "Rayon de lumière au fond d’une grotte", auteur: "Intricate Explorer", profil: 'https://unsplash.com/@intricateexplorer', page: U('hlj6xJG30FE') },
  'squash': { fichier: 'squash', alt: "Raquette et balle de squash sur le parquet du court", auteur: "Thomas Park", profil: 'https://unsplash.com/@thomascpark', page: U('P9y0G14Z7wA') },
  'stand-up-paddle': { fichier: 'stand-up-paddle', alt: "Pagayeurs de stand-up paddle sur un lac", auteur: "Krzysztof Kowalik", profil: 'https://unsplash.com/@kowalikus', page: U('6QFR9t4pDIM') },
  'surf': { fichier: 'surf', alt: "Surfeur sur une vague", auteur: "Sincerely Media", profil: 'https://unsplash.com/@sincerelymedia', page: U('oC32cy4x-ZA') },
  'taekwondo': { fichier: 'taekwondo', alt: "Coup de pied sauté de taekwondo dans un dojo", auteur: "Uriel Soberanes", profil: 'https://unsplash.com/@soberanes', page: U('ngd2uo1eyZg') },
  'tai-chi-qi-gong': { fichier: 'tai-chi-qi-gong', alt: "Pratiquant de tai-chi au crépuscule en ville", auteur: "Kevin Olson", profil: 'https://unsplash.com/@kev01218', page: U('QXkoms0AnIo') },
  'tennis-de-table': { fichier: 'tennis-de-table', alt: "Table de tennis de table dans une salle", auteur: "Katja Ano", profil: 'https://unsplash.com/@katjaano', page: U('cGLfMt2T1BI') },
  'tir-a-l-arc': { fichier: 'tir-a-l-arc', alt: "Archère qui vise sur un terrain de tir", auteur: "Bill Fairs", profil: 'https://unsplash.com/@moonboyz', page: U('0iA5B6g_vXo') },
  'tir-sportif': { fichier: 'tir-sportif', alt: "Cibles d’un stand de tir sportif", auteur: "Aaron Doucett", profil: 'https://unsplash.com/@adoucett', page: U('TN4jKUjys6o') },
  'trampoline': { fichier: 'trampoline', alt: "Saut périlleux sur un trampoline en plein air", auteur: "Charles Cheng", profil: 'https://unsplash.com/@charlesc7', page: U('jVAu6BbJPro') },
  'triathlon': { fichier: 'triathlon', alt: "Triathlète à vélo pendant la course", auteur: "Tony Pham", profil: 'https://unsplash.com/@tonyphamvn', page: U('K2xGNNcQn_w') },
  'trottinette': { fichier: 'trottinette', alt: "Rideur de trottinette dans un skatepark", auteur: "Yassine Khalfalli", profil: 'https://unsplash.com/@yassine_khalfalli', page: U('f7X1vFWXLtA') },
  'ulm': { fichier: 'ulm', alt: "ULM rouge sur un terrain d’aviation", auteur: "Victor Zhuk", profil: 'https://unsplash.com/@viczhuk', page: U('LHFtqrMReOw') },
  'ultimate': { fichier: 'ultimate', alt: "Joueurs d’ultimate qui sautent pour le disque", auteur: "Stefano Zocca", profil: 'https://unsplash.com/@stefano_zocca', page: U('dG-t92hPCKA') },
  'voile': { fichier: 'voile', alt: "Dériveur dans les embruns", auteur: "Daniel Stenholm", profil: 'https://unsplash.com/@danielstenholm', page: U('Um-8U2vN6OA') },
  'voitures-radiocommandees': { fichier: 'voitures-radiocommandees', alt: "Voiture radiocommandée tout-terrain dans l’herbe", auteur: "Marsha Reid", profil: 'https://unsplash.com/@marsha_reid', page: U('GrtZPbHHLAE') },
  'vol-a-voile': { fichier: 'vol-a-voile', alt: "Planeur au-dessus des collines", auteur: "Isaac Maffeis", profil: 'https://unsplash.com/@isaacmaffeis', page: U('wXMOzSbGwYk') },
  'vtt': { fichier: 'vtt', alt: "Vététiste en descente dans une forêt", auteur: "Andhika Soreng", profil: 'https://unsplash.com/@dhika88', page: U('US06QF_sxu8') },
  'water-polo': { fichier: 'water-polo', alt: "Match de water-polo dans le bassin", auteur: "Davide Buttani", profil: 'https://unsplash.com/@dabuttare', page: U('hu7sGvswNqA') },
}

/* Les pages dont le nom diffère du fichier (variantes de slug). */
const ALIAS: Record<string, string> = {
  basketball: 'basket', 'danse-classique': 'danse', 'ecole-de-danse': 'danse', 'danse-moderne': 'danse',
  'gym': 'fitness', 'gymnastique-volontaire': 'fitness', 'volley-ball': 'volley', 'hand-ball': 'handball',
}

export const photoDe = (slug: string): Photo | undefined => PHOTOS[slug] ?? PHOTOS[ALIAS[slug] ?? '']

export const srcset = (p: Photo) => `/img/photos/${p.fichier}-640.webp 640w, /img/photos/${p.fichier}-${p.grand ?? 1280}.webp ${p.grand ?? 1280}w`
