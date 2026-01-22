# WoW Item Tracker - Frontend

Frontend React pour l'application de suivi d'items World of Warcraft.

## Stack Technique

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **TanStack Query** - Gestion des requêtes API et cache
- **shadcn/ui** - Composants UI (basés sur Radix UI + Tailwind CSS)
- **Axios** - Client HTTP
- **Tailwind CSS** - Framework CSS utility-first

## Architecture

### Structure des Dossiers

```
src/
├── components/         # Composants React
│   ├── ui/            # Composants shadcn/ui de base
│   ├── Dashboard.tsx  # Composant principal
│   ├── ItemCard.tsx   # Carte d'affichage d'item
│   ├── ItemList.tsx   # Liste des items
│   ├── ItemFilters.tsx # Filtres
│   ├── ItemFormDialog.tsx # Formulaire création/édition
│   ├── MarkAsSoldDialog.tsx # Dialog pour marquer vendu
│   ├── StatsCards.tsx # Cartes de statistiques
│   └── ToastContainer.tsx # Container pour les notifications
├── contexts/          # React Contexts et Providers
│   ├── AppProviders.tsx # Provider principal
│   ├── ToastContext.tsx # Context pour notifications
│   └── ItemFiltersContext.tsx # Context pour filtres
├── hooks/             # Custom hooks
│   ├── useItemsData.ts # Hooks pour API (TanStack Query)
│   ├── useDialog.ts   # Hook pour gérer l'état d'un dialog
│   ├── useForm.ts     # Hook pour gérer les formulaires
│   ├── useToast.ts    # Hook pour notifications
│   └── useItemFilters.ts # Hook pour filtres
├── services/          # Services API
│   └── api.ts         # Client API Axios
├── types/             # Types TypeScript
│   └── item.ts        # Types pour les items
├── config/            # Configuration
│   └── constants.ts   # Constantes de l'app
├── lib/               # Utilitaires
│   └── utils.ts       # Fonctions utilitaires
├── App.tsx            # Composant racine
└── main.tsx           # Point d'entrée
```

### Organisation des Hooks

#### Hooks de Données (API)

- `useItemsData.ts` : Contient tous les hooks liés aux requêtes API
  - `useItems()` - Liste des items
  - `useItem(id)` - Item unique
  - `useItemsStats()` - Statistiques
  - `useCreateItem()` - Créer un item
  - `useUpdateItem()` - Mettre à jour
  - `useDeleteItem()` - Supprimer
  - `useMarkItemAsSold()` - Marquer comme vendu

#### Hooks d'État UI

- `useDialog.ts` - Gérer l'ouverture/fermeture des dialogs
- `useForm.ts` - Gérer l'état des formulaires avec validation
- `useItemFilters.ts` - Gérer les filtres (type, status, recherche)
- `useToast.ts` - Gérer les notifications toast

### Contexts et Providers

L'application utilise des contexts pour partager l'état global :

1. **AppProviders** - Provider principal qui englobe tous les autres
   - QueryClientProvider (TanStack Query)
   - ToastProvider
   - ItemFiltersProvider

2. **ToastContext** - Gère les notifications
3. **ItemFiltersContext** - Gère les filtres globaux

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env` à la racine :

```
VITE_API_URL=http://localhost:5000
```

## Développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## Build

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

## Fonctionnalités

- ✅ Créer, éditer, supprimer des items
- ✅ Marquer un item comme vendu
- ✅ Filtrer par type, statut et recherche
- ✅ Voir les statistiques (investissement, revenue, profit)
- ✅ Interface responsive
- ✅ Notifications toast
- ✅ Validation des formulaires
- ✅ Gestion optimiste des requêtes (TanStack Query)

## Composants shadcn/ui Utilisés

- Button
- Card
- Input
- Label
- Select
- Dialog
- Table
- Badge

## Bonnes Pratiques Appliquées

1. **Séparation des préoccupations** - Hooks de données vs hooks d'UI
2. **Réutilisabilité** - Hooks et composants réutilisables
3. **Type Safety** - TypeScript strict
4. **Performance** - Mémoïsation avec useMemo, optimisation TanStack Query
5. **UX** - Loading states, error handling, optimistic updates
6. **Accessibilité** - Composants shadcn/ui basés sur Radix UI (accessible)
