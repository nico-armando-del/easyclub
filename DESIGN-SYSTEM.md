# OnClub, design system

Cible : **Tailwind v4** (configuration CSS, plus de `tailwind.config.js`).
Source de vérité : ce document, puis le fichier `app/theme.css` qu'il décrit.

---

## 1. Les trois couches, et pourquoi

Un design system qui tient se lit en trois étages. Sauter le deuxième est l'erreur qui coûte le plus cher.

| Couche | Contient | Exemple | Qui l'utilise |
|---|---|---|---|
| **Primitives** | Les valeurs brutes, sans intention | `--oc-mint-400: #3DDC97` | Personne, sauf la couche 2 |
| **Sémantique** | L'intention, pas l'apparence | `--color-money-received` | Tout le produit |
| **Composant** | Les décisions locales à un composant | `--oc-field-height` | Ce composant seul |

**La règle qui découle de tout ça :** on n'écrit jamais `bg-mint-400` dans une page. On écrit
`bg-money-received`. Le jour où le vert change, on modifie une ligne et non deux cents.

Corollaire important pour OnClub : **un club est un thème, pas un mode.** Ce sont deux axes
indépendants. Le mode clair et le mode sombre existent à l'intérieur de chaque thème club.

---

## 2. La palette, telle qu'elle existe déjà

Relevée sur le site en production. Rien d'inventé sur les couleurs de marque.

### Couleurs de marque

| Rôle | Hex | Usage réel sur le site |
|---|---|---|
| Crème | `#FAFAF7` | Fond de page |
| Encre | `#0E1116` | Texte principal, sections sombres |
| Menthe | `#3DDC97` | Boutons principaux, surlignage, argent encaissé |
| Menthe profonde | `#0F6B47` | Texte menthe sur fond clair (contraste) |
| Menthe nuit | `#0F3D2A` | Texte sur bouton menthe |
| Sable | `#E8E6DE` | Bordures, séparateurs, fonds de contrôles |
| Gris | `#6E6E66` | Texte secondaire |
| Gris sombre | `#5C5C54` | Texte tertiaire |
| Lavande | `#C9C4F2` | Accent secondaire, illustrations |
| Lavande profonde | `#4A4290` | Texte lavande sur fond clair |
| Ambre | `#92600A` | Texte d'avertissement |

### Échelles complètes

Les échelles remplissent les trous. Les valeurs déjà en production sont marquées.

```
neutral   0  #FFFFFF      mint   50  #EAFBF3      lavender 100 #EFEDFB
         50  #FAFAF7 ◆          100  #CDF5E3               300 #C9C4F2 ◆
        100  #F2F1EB           200  #9DEBC8               500 #7D75C9
        200  #E8E6DE ◆         300  #6BE2AE               700 #4A4290 ◆
        300  #D6D3C8           400  #3DDC97 ◆
        400  #A8A49A           500  #22B77A      amber    100 #FDF3DC
        500  #6E6E66 ◆         600  #16915F               400 #E0A62A
        600  #5C5C54 ◆         700  #0F6B47 ◆             700 #92600A ◆
        700  #43433D           800  #0D5238
        800  #2A2C2C           900  #0F3D2A ◆    red      100 #FDECEC
        900  #191C20                                      500 #E0544F
        950  #0E1116 ◆                                    700 #9B2C28
```

`◆` = déjà utilisé en production. Le rouge est ajouté, il manquait : le produit gère de l'argent
et n'avait aucune couleur d'erreur.

---

## 3. La règle de marque, non négociable

**La menthe est la couleur de l'argent encaissé et des confirmations. Rien d'autre.**

C'est ce qui rend la marque lisible en une seconde dans le dashboard : quand un trésorier voit du
vert, il sait que c'est rentré. Si la menthe sert aussi aux liens, aux titres et aux icônes
décoratives, ce signal disparaît et le produit perd son argument principal.

Concrètement, cette règle crée un concept de tokens que la plupart des design systems n'ont pas :

```
--color-money-received   la menthe, l'argent qui est arrivé
--color-money-due        l'ambre, l'argent attendu
--color-money-overdue    le rouge, l'argent en retard
--color-money-neutral    le gris, un montant sans jugement
```

Ces quatre tokens sont l'identité du produit. Ils passent avant tous les autres.

---

## 4. Le fichier `app/theme.css`

À créer tel quel. C'est la seule définition de tokens du projet.

```css
@import "tailwindcss";

/* Le mode sombre est piloté par une classe sur <html>, pas par le système seul,
   parce que le trésorier doit pouvoir choisir. */
@custom-variant dark (&:where(.dark, .dark *));

/* ==========================================================================
   COUCHE 1 · PRIMITIVES
   Valeurs brutes. Jamais utilisées directement dans un composant.
   Hors de @theme : elles ne doivent générer aucune classe utilitaire.
   ========================================================================== */
:root {
  --oc-neutral-0:   #FFFFFF;
  --oc-neutral-50:  #FAFAF7;
  --oc-neutral-100: #F2F1EB;
  --oc-neutral-200: #E8E6DE;
  --oc-neutral-300: #D6D3C8;
  --oc-neutral-400: #A8A49A;
  --oc-neutral-500: #6E6E66;
  --oc-neutral-600: #5C5C54;
  --oc-neutral-700: #43433D;
  --oc-neutral-800: #2A2C2C;
  --oc-neutral-900: #191C20;
  --oc-neutral-950: #0E1116;

  --oc-mint-50:  #EAFBF3;
  --oc-mint-100: #CDF5E3;
  --oc-mint-200: #9DEBC8;
  --oc-mint-300: #6BE2AE;
  --oc-mint-400: #3DDC97;
  --oc-mint-500: #22B77A;
  --oc-mint-600: #16915F;
  --oc-mint-700: #0F6B47;
  --oc-mint-800: #0D5238;
  --oc-mint-900: #0F3D2A;

  --oc-lavender-100: #EFEDFB;
  --oc-lavender-300: #C9C4F2;
  --oc-lavender-500: #7D75C9;
  --oc-lavender-700: #4A4290;

  --oc-amber-100: #FDF3DC;
  --oc-amber-400: #E0A62A;
  --oc-amber-700: #92600A;

  --oc-red-100: #FDECEC;
  --oc-red-300: #F0918C;
  --oc-red-500: #E0544F;
  --oc-red-700: #9B2C28;
}

/* ==========================================================================
   COUCHE 2 · SÉMANTIQUE, MODE CLAIR
   Ce sont ces noms que le produit utilise. Ils décrivent une intention.
   ========================================================================== */
:root {
  /* Surfaces */
  --surface-page:     var(--oc-neutral-50);
  --surface-raised:   var(--oc-neutral-0);
  --surface-sunken:   var(--oc-neutral-100);
  --surface-inverse:  var(--oc-neutral-950);
  --surface-accent:   var(--oc-mint-400);

  /* Contenu. Les valeurs sont fixées par la mesure de contraste, pas au jugé :
     neutral-400 ne passe pas le 4,5:1 sur crème, il est réservé au désactivé. */
  --content-primary:    var(--oc-neutral-950);  /* 18,1:1 */
  --content-secondary:  var(--oc-neutral-600);  /*  6,7:1 */
  --content-muted:      var(--oc-neutral-500);  /*  5,1:1 */
  --content-disabled:   var(--oc-neutral-400);  /*  exempt WCAG, décoratif seulement */
  --content-inverse:    var(--oc-neutral-50);
  --content-on-accent:  var(--oc-mint-900);

  /* Bordures */
  --border-subtle:  var(--oc-neutral-200);
  --border-strong:  var(--oc-neutral-950);
  --border-focus:   var(--oc-mint-400);

  /* Action · l'accent du club, surchargé par le thème club */
  --action-primary:        var(--oc-mint-400);
  --action-primary-hover:  var(--oc-mint-500);
  --action-on-primary:     var(--oc-mint-900);
  --action-quiet:          transparent;
  --action-quiet-hover:    var(--oc-neutral-100);

  /* Argent · le concept qui porte l'identité du produit */
  --money-received:  var(--oc-mint-700);
  --money-due:       var(--oc-amber-700);
  --money-overdue:   var(--oc-red-700);
  --money-neutral:   var(--oc-neutral-500);
  --money-received-surface: var(--oc-mint-50);
  --money-due-surface:      var(--oc-amber-100);
  --money-overdue-surface:  var(--oc-red-100);

  /* Retours système */
  --feedback-success: var(--oc-mint-700);
  --feedback-warning: var(--oc-amber-700);
  --feedback-error:   var(--oc-red-700);
  --feedback-info:    var(--oc-lavender-700);
  --feedback-success-surface: var(--oc-mint-50);
  --feedback-warning-surface: var(--oc-amber-100);
  --feedback-error-surface:   var(--oc-red-100);
  --feedback-info-surface:    var(--oc-lavender-100);
}

/* ==========================================================================
   COUCHE 2 bis · MODE SOMBRE
   On redéfinit uniquement les tokens sémantiques. Jamais les primitives.
   ========================================================================== */
.dark {
  --surface-page:     var(--oc-neutral-950);
  --surface-raised:   var(--oc-neutral-900);
  --surface-sunken:   #090B0F;
  --surface-inverse:  var(--oc-neutral-50);
  --surface-accent:   var(--oc-mint-400);

  --content-primary:    var(--oc-neutral-50);   /* 18,1:1 */
  --content-secondary:  var(--oc-neutral-300);  /* 11,4:1 */
  --content-muted:      var(--oc-neutral-400);  /*  6,9:1 */
  --content-disabled:   var(--oc-neutral-600);
  --content-inverse:    var(--oc-neutral-950);
  --content-on-accent:  var(--oc-mint-900);

  --border-subtle:  var(--oc-neutral-800);
  --border-strong:  var(--oc-neutral-300);

  /* Sur fond sombre, les couleurs profondes deviennent illisibles.
     On remonte l'échelle. C'est tout l'intérêt d'avoir une échelle. */
  --money-received:  var(--oc-mint-300);
  --money-due:       var(--oc-amber-400);
  --money-overdue:   var(--oc-red-300);      /* red-500 tombe à 4,0:1 sur fond sombre */
  --money-neutral:   var(--oc-neutral-400);  /* neutral-500 tombe à 3,8:1 */
  --money-received-surface: rgb(61 220 151 / .12);
  --money-due-surface:      rgb(224 166 42 / .12);
  --money-overdue-surface:  rgb(224 84 79 / .12);

  --feedback-success: var(--oc-mint-300);
  --feedback-warning: var(--oc-amber-400);
  --feedback-error:   var(--oc-red-300);
  --feedback-info:    var(--oc-lavender-300);
  --feedback-success-surface: rgb(61 220 151 / .12);
  --feedback-warning-surface: rgb(224 166 42 / .12);
  --feedback-error-surface:   rgb(224 84 79 / .12);
  --feedback-info-surface:    rgb(201 196 242 / .12);

  --action-quiet-hover: var(--oc-neutral-800);
}

/* ==========================================================================
   COUCHE 2 ter · THÈME CLUB
   Chaque club a ses couleurs. Un attribut sur <html> et quatre variables.
   Le thème est orthogonal au mode : un club a son clair et son sombre.
   ========================================================================== */
[data-club] {
  --action-primary:       var(--club-accent);
  --action-primary-hover: var(--club-accent-hover);
  --action-on-primary:    var(--club-accent-contrast);
  --border-focus:         var(--club-accent);
}

/* ==========================================================================
   COUCHE 2 quater · EXPOSITION À TAILWIND
   `inline` est obligatoire : sans lui, Tailwind copie la valeur au moment de la
   compilation et le mode sombre comme le thème club cessent de fonctionner.
   ========================================================================== */
@theme inline {
  --color-surface-page:    var(--surface-page);
  --color-surface-raised:  var(--surface-raised);
  --color-surface-sunken:  var(--surface-sunken);
  --color-surface-inverse: var(--surface-inverse);
  --color-surface-accent:  var(--surface-accent);

  --color-content-primary:   var(--content-primary);
  --color-content-secondary: var(--content-secondary);
  --color-content-muted:     var(--content-muted);
  --color-content-disabled:  var(--content-disabled);
  --color-content-inverse:   var(--content-inverse);
  --color-content-on-accent: var(--content-on-accent);

  --color-border-subtle: var(--border-subtle);
  --color-border-strong: var(--border-strong);
  --color-border-focus:  var(--border-focus);

  --color-action-primary:       var(--action-primary);
  --color-action-primary-hover: var(--action-primary-hover);
  --color-action-on-primary:    var(--action-on-primary);
  --color-action-quiet-hover:   var(--action-quiet-hover);

  --color-money-received: var(--money-received);
  --color-money-due:      var(--money-due);
  --color-money-overdue:  var(--money-overdue);
  --color-money-neutral:  var(--money-neutral);
  --color-money-received-surface: var(--money-received-surface);
  --color-money-due-surface:      var(--money-due-surface);
  --color-money-overdue-surface:  var(--money-overdue-surface);

  --color-feedback-success: var(--feedback-success);
  --color-feedback-warning: var(--feedback-warning);
  --color-feedback-error:   var(--feedback-error);
  --color-feedback-info:    var(--feedback-info);
  --color-feedback-success-surface: var(--feedback-success-surface);
  --color-feedback-warning-surface: var(--feedback-warning-surface);
  --color-feedback-error-surface:   var(--feedback-error-surface);
  --color-feedback-info-surface:    var(--feedback-info-surface);
}

/* ==========================================================================
   TYPOGRAPHIE, ESPACEMENT, FORMES, MOUVEMENT
   Valeurs figées, pas d'`inline` : elles ne changent ni au mode ni au club.
   ========================================================================== */
@theme {
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body:    'Satoshi', 'Poppins', system-ui, sans-serif;
  --font-mono:    ui-monospace, 'SF Mono', Menlo, monospace;

  --text-2xs: 0.6875rem;  --text-2xs--line-height: 1.4;
  --text-xs:  0.75rem;    --text-xs--line-height: 1.5;
  --text-sm:  0.875rem;   --text-sm--line-height: 1.55;
  --text-base:1rem;       --text-base--line-height: 1.6;
  --text-lg:  1.125rem;   --text-lg--line-height: 1.55;
  --text-xl:  1.375rem;   --text-xl--line-height: 1.35;
  --text-2xl: 1.75rem;    --text-2xl--line-height: 1.2;
  --text-3xl: 2.25rem;    --text-3xl--line-height: 1.15;
  --text-4xl: 2.875rem;   --text-4xl--line-height: 1.12;
  --text-5xl: 3.75rem;    --text-5xl--line-height: 1.05;

  /* Base d'espacement. Tailwind génère p-1 … p-96 par multiples de celle-ci. */
  --spacing: 0.25rem;

  --radius-chip:   8px;
  --radius-field:  12px;
  --radius-card:   22px;
  --radius-sheet:  28px;
  --radius-pill:   999px;

  --shadow-soft: 0 20px 60px rgb(14 17 22 / .08);
  --shadow-deep: 0 30px 80px rgb(14 17 22 / .14);

  --ease-brand: cubic-bezier(.22, 1, .36, 1);
  --animate-duration-quick: 150ms;
  --animate-duration-base:  250ms;
  --animate-duration-slow:  400ms;
}

/* ==========================================================================
   SOCLE
   ========================================================================== */
@layer base {
  html { scroll-behavior: smooth; }

  body {
    background-color: var(--color-surface-page);
    color: var(--color-content-primary);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  /* Tout montant affiché, sans exception. Sans chiffres tabulaires, une colonne
     de prix danse d'une ligne à l'autre et le dashboard a l'air amateur. */
  .tabular, td.amount, .amount {
    font-variant-numeric: tabular-nums;
  }

  :focus-visible {
    outline: 3px solid var(--color-border-focus);
    outline-offset: 3px;
    border-radius: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

---

## 5. Le thème club, en pratique

C'est la pièce qui rend le modèle opéré possible. Chaque club a ses couleurs, un seul moteur.

**Dans la config du club, quatre valeurs :**

```json
{ "marque": {
    "accent":          "#FF7A3D",
    "accentHover":     "#E8632A",
    "accentContrast":  "#0A1826",
    "logoUrl":         "https://…/asm.svg"
} }
```

**Au rendu, sur `<html>` :**

```tsx
<html
  data-club={club.slug}
  style={{
    '--club-accent':          club.marque.accent,
    '--club-accent-hover':    club.marque.accentHover,
    '--club-accent-contrast': club.marque.accentContrast,
  } as React.CSSProperties}
>
```

Tout le produit se re-colore. Aucun composant n'est modifié.

**Le piège à éviter, et il est sérieux :** un club peut choisir un accent illisible, un jaune vif
avec du texte blanc dessus. Ne demande jamais au club de fournir `accentContrast`.
**Calcule-le côté serveur** au moment où tu enregistres sa config, avec un test de luminance, et
stocke le résultat. Sinon tu découvres le problème en production sur le formulaire d'inscription
d'un club en pleine rentrée.

---

## 6. Les composants de base

Écrits une fois, en composants React, jamais en classes recopiées de page en page.

### Bouton

| Variante | Classes | Quand |
|---|---|---|
| `primary` | `bg-action-primary text-action-on-primary hover:bg-action-primary-hover rounded-pill px-7 py-3.5 font-bold` | L'action principale d'un écran, une seule |
| `outline` | `border-[1.5px] border-border-strong text-content-primary hover:bg-action-quiet-hover rounded-pill px-7 py-3.5 font-bold` | L'action secondaire |
| `quiet` | `text-content-primary hover:text-money-received px-4 py-3.5 font-medium` | Les actions tertiaires, les liens de navigation |
| `danger` | `text-feedback-error border border-feedback-error hover:bg-feedback-error-surface rounded-pill px-7 py-3.5` | Rembourser, annuler, supprimer |

Tous partagent : `inline-flex items-center justify-center gap-2 transition-colors duration-[250ms] ease-brand whitespace-nowrap`.

### Champ de formulaire

```
bg-surface-raised border border-border-subtle text-content-primary
rounded-field px-3.5 py-2.5 w-full
placeholder:text-content-muted
focus-visible:outline-3 focus-visible:outline-border-focus
aria-invalid:border-feedback-error
```

Le libellé est en `text-xs font-semibold text-content-secondary`. Le message d'aide en
`text-xs text-content-muted`. Le message d'erreur en `text-xs text-feedback-error`.

### Carte

```
bg-surface-raised border border-border-subtle rounded-card p-6
```
L'ombre `shadow-soft` est réservée aux éléments qui flottent réellement au-dessus du contenu
(modale, panier collant, menu). Une carte posée dans le flux n'a pas d'ombre.

### Pastille de montant

Le composant le plus important du dashboard.

| État | Classes |
|---|---|
| Encaissé | `bg-money-received-surface text-money-received` |
| Attendu | `bg-money-due-surface text-money-due` |
| En retard | `bg-money-overdue-surface text-money-overdue` |

Toutes avec `rounded-chip px-2.5 py-1 text-xs font-bold tabular` et le montant formaté en
`fr-FR` avec l'espace insécable avant l'euro.

---

## 7. Les règles non négociables

1. **Jamais de valeur en dur.** Pas de `#3DDC97`, pas de `bg-[#FAFAF7]`, pas de `p-[13px]`.
   S'il n'y a pas de token, on crée le token d'abord.
2. **Jamais de primitive dans un composant.** `bg-mint-400` est interdit, `bg-action-primary`
   est correct. La primitive n'existe que pour être aliasée.
3. **Jamais catégorie plus propriété seules.** `--color-background` ne veut rien dire.
   Il faut un concept (`surface`, `money`, `feedback`) ou une variante.
4. **La menthe ne sert qu'à l'argent encaissé et aux confirmations.** C'est la règle de marque,
   elle prime sur le confort d'écriture.
5. **Toute couleur fonctionne en clair et en sombre.** Une couleur définie uniquement dans `.dark`
   est un bug, pas un choix.
6. **Le thème n'est pas le mode.** Le club est un thème, le clair et le sombre sont des modes.
   Un club possède les deux.
7. **On nomme par l'intention, jamais par l'apparence.** `bg-surface-sunken`, pas `bg-gray-100`.
   La classe ne doit pas mentir le jour où la couleur change.
8. **Chaque montant est en chiffres tabulaires.** Sans exception.
9. **Tout token qui se pose SUR l'accent bascule avec lui.** Le bloc `[data-club]` doit redéfinir
   non seulement `--action-primary` et `--surface-accent`, mais aussi **toutes** les couleurs de
   texte qui les accompagnent (`--action-on-primary`, `--content-on-accent`). Cas réel rencontré :
   le sigle du club restait en vert menthe foncé sur un fond lavande, à 2,9:1, alors que le bouton
   juste à côté était correct. Un accent sans sa couleur d'accompagnement est un accent cassé.
10. **La couleur de contraste est calculée, jamais saisie.** Elle est marquée facultative en entrée
   et systématiquement recalculée au chargement de la config. Une valeur écrite à la main finit
   toujours par être fausse : celle d'un club lavande avait été mise en blanc, à 3,99:1, quand
   l'encre donnait 4,93:1.
11. **L'accent du club ne sert JAMAIS de couleur de texte.** C'est une couleur arbitraire, choisie
   par un bénévole, et rien ne garantit qu'elle soit lisible sur une surface. Elle n'existe que
   comme **fond**, toujours accompagnée de `--action-on-primary`, sa couleur de contraste calculée.
   Pour du texte mis en valeur, on prend un token de la palette OnClub, qui est fixe et mesurée.
   Cas concret rencontré : l'astérisque des champs obligatoires en `text-action-primary` tombait à
   2,59:1 sur le thème orange d'un club. Corrigé en `text-feedback-error`, la convention universelle.
   Même règle pour les survols de lien : on souligne, on ne colore pas.
10. **Tout texte tient le 4,5:1 dans les quatre combinaisons** (clair et sombre, thème OnClub et
   thème club). Ce n'est pas une intention, c'est mesuré. Les valeurs de `--content-*` et de
   `--money-overdue` en mode sombre ont été fixées par cette mesure, pas au jugé.
   `--content-disabled` est le seul token exempté, parce qu'un contrôle désactivé l'est aussi
   dans la norme.

---

## 8. Ce qu'il faut faire, dans l'ordre

1. **Acheter et héberger Satoshi.** C'est une police Fontshare, pas Google Fonts. Elle doit être
   servie en local via `next/font/local`, sinon elle ne charge pas et le site retombe sur Poppins
   sans prévenir. Bricolage Grotesque, elle, est sur Google Fonts.
2. **Créer `app/theme.css`** avec le contenu de la section 4, et l'importer dans le layout racine.
3. **Calculer et stocker `accentContrast`** côté serveur au moment de l'enregistrement d'une config club.
4. **Écrire les cinq composants de base** (bouton, champ, carte, pastille de montant, sélecteur)
   dans `components/ui/`, et interdire par convention l'écriture de classes de couleur ailleurs.
5. **Ajouter une règle de lint** qui refuse les hex et les valeurs arbitraires dans le JSX. C'est
   la seule chose qui empêche le système de se déliter au bout de trois semaines.
6. **Reprendre la landing** pour qu'elle consomme ces tokens plutôt que ses variables actuelles.
   Elle en est déjà très proche, c'est une heure de travail et ça garantit qu'un seul système existe.

---

## 9. Ce que ce document ne couvre pas encore

À traiter quand le besoin arrivera, pas avant :

* la grille et les points de rupture, une fois les premiers écrans du dashboard dessinés
* les tokens des emails, qui ne peuvent pas utiliser de variables CSS et devront être injectés
  en ligne au rendu depuis la même config club
* les icônes, à figer sur une seule bibliothèque et une seule épaisseur de trait
* les graphiques du dashboard financier, qui auront besoin d'une palette de visualisation distincte
  de la palette de marque
