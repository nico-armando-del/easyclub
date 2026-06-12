# EasyClub — AI image generation prompts

All prompts in English (image models perform better). Art direction locked to the « Studio » DA: navy #0B1F3A, electric blue #2E6BE6, green #34C794 reserved for money and confirmations, light gray #F4F6FA. Tone: documentary, real, trustworthy. Never: 3D cartoon mascots, neon, glossy startup illustrations.

## Color grading suffix (append to every photo prompt)

```
muted color grading, deep navy shadows, soft natural light, documentary photography style, shot on 35mm, realistic, no oversaturation
```

## 1. Hero landing page (la photo principale)

Concept : la vraie vie d'un club, traitée sobre. Le produit (dashboard) sera incrusté par dessus en HTML, pas généré.

Midjourney :
```
documentary photograph of a dance class in a French community studio, children in line waiting their turn, teacher smiling in background, warm wooden floor, large windows with soft daylight, candid moment, muted color grading, deep navy shadows, shot on 35mm, realistic --ar 16:9 --style raw
```

Variante adultes (pour la page tarifs adultes) :
```
documentary photograph of an adult evening dance class, diverse group laughing between exercises, mirror wall, soft tungsten light mixed with daylight, candid, muted color grading, deep navy shadows, shot on 35mm, realistic --ar 16:9 --style raw
```

## 2. Le moment douleur (campagnes trésoriers)

```
documentary photograph of a tired volunteer treasurer at a kitchen table at night, piles of paper registration forms and bank cheques, laptop glow, single warm lamp, realistic, candid, muted tones, deep navy shadows, shot on 35mm --ar 4:5 --style raw
```

Usage : gabarit « La douleur », LinkedIn. Contraste maximal avec la promesse.

## 3. Le moment soulagement

```
documentary photograph of a smiling middle-aged woman closing her laptop in a bright living room, relaxed posture, evening light, cup of tea, sense of relief and free time, muted color grading, realistic, shot on 35mm --ar 4:5 --style raw
```

## 4. Textures et fonds abstraits (sections du site, stories)

Fond marine pour les sections sombres :
```
minimal abstract background, deep navy blue #0B1F3A, very subtle diagonal light gradient, smooth matte texture, no objects, no noise, clean fintech aesthetic --ar 16:9
```

Fond clair :
```
minimal abstract background, very light cool gray #F4F6FA, soft paper texture, almost invisible geometric grid, clean, calm, fintech aesthetic --ar 16:9
```

## 5. Photos boutique (EasyClub Max, fiches produit de démo)

```
product photography of a plain black hoodie on a clean light gray background #F4F6FA, soft studio lighting, slight shadow, centered, e-commerce style, realistic fabric texture --ar 1:1
```

## 6. Espagne (déclinaison marché ES)

```
documentary photograph of a flamenco dance class in a Spanish cultural association, students practicing, wooden floor, afternoon light through tall windows, candid, muted color grading, deep navy shadows, shot on 35mm, realistic --ar 16:9 --style raw
```

## 7. Logo (génération IA, puis vectorisation du gagnant)

Concept A, la coche dans le C de Club :
```
minimalist logo for "EasyClub", modern geometric sans-serif wordmark in navy blue #0B1F3A on pure white background, the counter of the letter C in "Club" forms a subtle green checkmark #34C794, fintech brand identity, flat vector style, no gradients, no shadows, no 3D, generous white space, professional, timeless
```

Concept B, le glyphe bouclier :
```
minimalist logo for "EasyClub", clean geometric wordmark in navy #0B1F3A with a small flat shield icon containing a green checkmark #34C794 on the left, white background, fintech trust brand, flat vector style, no gradients, no shadows, swiss design, professional
```

Concept C, le E monogramme :
```
minimalist abstract logo mark, letter E monogram built from three horizontal bars, the bottom bar transforms into a green checkmark #34C794, navy blue #0B1F3A, white background, flat vector, geometric, fintech brand, paired with the wordmark "EasyClub" in a modern sans-serif below, no gradients, no shadows
```

Règles logo :

* Toujours fond blanc pur, jamais de mockup 3D ni de carte de visite en scène
* Le gagnant sera redessiné en vectoriel dans Figma ou Illustrator, l'image IA sert de référence, jamais de fichier final
* Vérifier que la coche reste lisible en 16px (taille favicon) avant de valider un concept

## Pipeline de production (l'ordre des outils)

1. **Midjourney** génère en 4 variantes minimum (les prompts ci-dessus)
2. **Tri** selon les règles ci-dessous, on garde 1 image sur 8
3. **Magnific** upscale les retenues. Réglages pour notre style documentaire :
   * Scale x2 pour le web, x4 pour l'impression
   * Creativity entre 1 et 3 maximum (au delà, Magnific réinvente les visages et on perd le réalisme)
   * HDR bas, Resemblance haut (vers 7 ou 8) pour rester fidèle à l'original
   * Preset « Films & Photography », jamais « Illustration »
   * Sur les photos avec enfants : creativity à 1, vérifier chaque visage après upscale
4. **Grading commun** (Lightroom ou même filtre) pour unifier la lumière de toute la série
5. Export web en AVIF ou WebP, jamais le PNG brut de Magnific (trop lourd pour la landing)

## Règles de tri des générations

* Rejeter toute image avec des visages déformés ou des mains fausses, c'est rédhibitoire pour la confiance
* Rejeter tout ce qui ressemble à une banque d'images américaine (sourires figés, bureaux en open space)
* Les bonnes images ont l'air prises par un parent doué en photo pendant un vrai cours
* Passer les retenues dans un grading commun (Lightroom ou le même filtre) pour unifier la lumière
* Toujours générer en 4 variantes minimum et ne garder qu'une image sur huit
