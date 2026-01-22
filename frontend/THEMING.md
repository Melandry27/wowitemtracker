# 🎨 Système de Thèmes - WoW Item Tracker

## Vue d'ensemble

Le frontend utilise un système de thèmes modulaire permettant de personnaliser l'apparence complète de l'application. Actuellement, le thème **World of Warcraft Vanilla** est implémenté.

## Architecture du Système

### Structure des fichiers

```
frontend/src/
├── config/
│   └── theme.ts          # Définitions des thèmes
├── contexts/
│   └── ThemeContext.tsx  # Provider du thème
├── components/
│   └── ThemeSelector.tsx # Sélecteur de thème
├── theme.css             # Styles du thème actuel
└── index.css             # Styles de base Tailwind
```

## Thème WoW Vanilla

### Palette de couleurs

Le thème s'inspire de l'interface classique de World of Warcraft avec :

#### Backgrounds

- **Primary**: `#1a1410` - Fond sombre médiéval
- **Surface**: `#2a2218` - Surface pour les cartes
- **Surface Hover**: `#3a3228` - État survol

#### Texte

- **Primary**: `#f8e5b8` - Texte doré clair
- **Secondary**: `#d4b896` - Texte secondaire
- **Muted**: `#8b7355` - Texte atténué

#### Accents

- **Primary**: `#c5a563` - Or/Bronze (couleur signature WoW)
- **Secondary**: `#8b6f47` - Bronze foncé

#### Status

- **Success**: `#4a9c3f` - Vert (items vendus, profits)
- **Error**: `#cc3333` - Rouge (erreurs, pertes)
- **Owned**: `#4a8cc3` - Bleu (qualité rare dans WoW)
- **Sold**: `#4a9c3f` - Vert

### Typographie

- **Headings**: `Merriweather` - Police serif pour un look médiéval/fantasy
- **Body**: `Lato` - Police sans-serif lisible

### Effets visuels

#### Boutons

- Gradients métalliques or/bronze
- Effet de brillance au survol (animation `::before`)
- Ombres portées pour la profondeur
- Transformation 3D au clic

#### Cartes

- Bordures dorées
- Ligne décorative en haut et bas
- Ombres atmosphériques
- En-tête avec fond différencié

#### Badges

- Effet de lueur (box-shadow) selon le statut
- Bordures colorées
- Style "qualité d'item" de WoW

## Utilisation

### Dans un composant

```tsx
import { useTheme } from "@/contexts/ThemeContext";

export const MyComponent = () => {
  const { theme } = useTheme();

  // Utiliser les valeurs du thème
  const style = {
    color: theme.colors.text.primary,
    background: theme.colors.background,
  };

  return <div style={style}>Content</div>;
};
```

### Classes CSS personnalisées

Les classes suivantes sont disponibles dans `theme.css` :

#### Cartes

- `.card` - Carte stylisée
- `.card-header` - En-tête de carte
- `.card-title` - Titre de carte
- `.card-content` - Contenu de carte

#### Boutons

- `.button-primary` - Bouton principal (or/bronze)
- `.button-secondary` - Bouton secondaire
- `.button-destructive` - Bouton destructif (rouge)

#### Badges

- `.badge-owned` - Badge pour items possédés (bleu)
- `.badge-sold` - Badge pour items vendus (vert)

#### Stats

- `.stats-card` - Carte de statistique
- `.stats-value` - Valeur de statistique (grande police)
- `.stats-label` - Label de statistique
- `.profit-positive` - Profit positif (vert brillant)
- `.profit-negative` - Profit négatif (rouge)

#### Autres

- `.skeleton` - Animation de chargement
- `.dialog-overlay` - Overlay de dialog
- `.dialog-content` - Contenu de dialog
- `.toast` - Notification toast

## Ajouter un nouveau thème

### 1. Créer la définition du thème

Dans `config/theme.ts` :

```typescript
export const myNewTheme: Theme = {
  name: "My Theme",
  colors: {
    background: "#...",
    // ... définir toutes les couleurs
  },
  fonts: {
    heading: "YourFont",
    body: "YourFont",
  },
  // ... autres propriétés
};
```

### 2. Ajouter au sélecteur

```typescript
export const availableThemes = [
  { id: "wow-vanilla", name: "WoW Vanilla", theme: wowVanillaTheme },
  { id: "my-theme", name: "My Theme", theme: myNewTheme },
];
```

### 3. Mettre à jour getTheme()

```typescript
export const getTheme = (themeName: string): Theme => {
  switch (themeName) {
    case "wow-vanilla":
      return wowVanillaTheme;
    case "my-theme":
      return myNewTheme;
    default:
      return wowVanillaTheme;
  }
};
```

### 4. Créer les styles CSS (optionnel)

Si le thème nécessite des styles CSS spécifiques, créer un fichier `theme-[name].css` et l'importer conditionnellement.

## Variables CSS disponibles

Toutes les variables CSS sont définies dans `:root` dans `theme.css` :

```css
/* Exemples */
var(--bg-primary)
var(--text-primary)
var(--color-primary)
var(--border-accent)
var(--shadow-md)
var(--radius-md)
```

Ces variables peuvent être utilisées directement dans les composants ou les styles inline.

## Persistance

Le thème sélectionné est automatiquement sauvegardé dans `localStorage` et restauré au chargement de l'application.

## Responsive

Tous les styles du thème sont responsive avec des breakpoints appropriés :

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Accessibilité

Le thème WoW Vanilla maintient un bon contraste pour l'accessibilité :

- Ratio de contraste texte/fond : ≥ 4.5:1
- Indicateurs de focus visibles
- Support du mode clair/sombre (à venir)

## Exemple d'utilisation complète

```tsx
import { ThemeSelector } from "@/components/ThemeSelector";
import { useTheme } from "@/contexts/ThemeContext";

export const Dashboard = () => {
  const { theme } = useTheme();

  return (
    <div className="container">
      {/* Sélecteur de thème en haut */}
      <div className="flex justify-end mb-4">
        <ThemeSelector />
      </div>

      {/* Utiliser les classes du thème */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Mon Titre</h2>
        </div>
        <div className="card-content">
          <button className="button-primary">Action</button>
        </div>
      </div>

      {/* Utiliser les valeurs du thème directement */}
      <div
        style={{
          color: theme.colors.text.primary,
          fontFamily: theme.fonts.body,
        }}>
        Texte stylisé
      </div>
    </div>
  );
};
```

## Idées de thèmes futurs

- **WoW Burning Crusade** - Tons verts/fel
- **WoW Wrath** - Tons bleus/glacés
- **Dark Mode** - Thème sombre moderne
- **Light Mode** - Thème clair classique
- **Horde Theme** - Rouge/noir
- **Alliance Theme** - Bleu/or

## Notes de développement

- Les styles sont appliqués via une combinaison de Tailwind CSS et de CSS personnalisé
- Le ThemeProvider enveloppe toute l'application via AppProviders
- Les composants shadcn/ui sont stylisés par les variables CSS
- Tous les nouveaux thèmes doivent implémenter l'interface `Theme` complète
