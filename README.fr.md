<div align="right">
  <a href="README.md"><strong>🇬🇧 English</strong></a>
</div>

# WoW Item Tracker

Application full-stack de suivi d'inventaire/trading pour World of Warcraft Anniversary Edition.

## 📋 Vue d'ensemble

Cette application permet de suivre les achats et ventes d'items avec calcul automatique des profits. Elle se compose d'un backend API REST (Express + MongoDB) et d'un frontend React moderne.

## 🚀 Stack Technologique

### Backend

- **Express 5.1.0** - Framework serveur
- **MongoDB 8.0** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **Node.js ≥ 18** - Runtime JavaScript

### Frontend

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **TanStack Query** - Gestion des requêtes API
- **shadcn/ui** - Composants UI (Radix + Tailwind CSS v4)
- **Axios** - Client HTTP

## 📁 Structure du Projet

```
wowitemtracker/
├── backend/           # API Express
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   └── package.json
│
├── frontend/          # Application React
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── config/
│   └── package.json
│
└── bruno/            # Collection API Bruno
```

## ⚙️ Installation

### Prérequis

- Node.js >= 18
- MongoDB 8.0 (local ou distant)
- npm ou yarn

### 1. Backend

```bash
cd backend
npm install

# Créer un fichier .env
cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wow-items
CORS_ORIGIN=http://localhost:5173
EOF

# Démarrer le serveur
npm run dev
```

Le serveur sera disponible sur `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm install

# Créer un fichier .env
cat > .env << EOF
VITE_API_URL=http://localhost:5000
EOF

# Démarrer l'application
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 🎯 Fonctionnalités

- ✅ **CRUD Items** - Créer, lire, modifier, supprimer des items
- ✅ **Gestion des Ventes** - Marquer un item comme vendu avec prix et date
- ✅ **Statistiques** - Vue d'ensemble des investissements et profits
- ✅ **Filtres** - Par type d'item, statut (owned/sold), recherche textuelle
- ✅ **Interface Responsive** - Fonctionne sur desktop et mobile
- ✅ **Validation** - Validation côté client et serveur
- ✅ **Gestion d'Erreurs** - Messages d'erreur clairs et toasts de notification

## 📊 Modèle de Données

### Item

```typescript
{
  _id: string
  name: string           // Nom de l'item
  type: string           // Type (Armor, Weapon, etc.)
  purchasePrice: number  // Prix d'achat
  purchaseDate: Date     // Date d'achat
  salePrice?: number     // Prix de vente (optionnel)
  saleDate?: Date        // Date de vente (optionnel)
  status: string         // "owned" | "sold"
  createdAt: Date
  updatedAt: Date
}
```

## 🔌 API Endpoints

```
GET    /api/items              # Liste tous les items
POST   /api/items              # Crée un item
GET    /api/items/stats        # Statistiques
GET    /api/items/:id          # Récupère un item
PUT    /api/items/:id          # Met à jour un item
DELETE /api/items/:id          # Supprime un item
GET    /api/health             # Health check
```

## 🧪 Tests API

Une collection Bruno est fournie dans le dossier `bruno/` pour tester l'API facilement.

```bash
cd bruno/WoW\ Item\ Tracker\ API
# Utiliser Bruno Desktop ou CLI
```

## 🏗️ Architecture Frontend

### Hooks Personnalisés

#### Hooks de Données (API)

- `useItems()` - Liste des items avec filtres
- `useItemsStats()` - Statistiques globales
- `useCreateItem()` - Créer un item
- `useUpdateItem()` - Mettre à jour un item
- `useDeleteItem()` - Supprimer un item

#### Hooks d'État UI

- `useDialog()` - Gérer l'ouverture/fermeture des dialogs
- `useForm()` - Formulaires avec validation
- `useItemFilters()` - Filtres globaux
- `useToast()` - Notifications

### Contexts

- **QueryClientProvider** - TanStack Query
- **ToastProvider** - Notifications globales
- **ItemFiltersProvider** - Filtres partagés

## 🎨 Composants Principaux

- `Dashboard` - Vue principale
- `ItemCard` - Carte d'affichage d'un item
- `ItemList` - Liste des items avec loading states
- `ItemFormDialog` - Formulaire création/édition
- `MarkAsSoldDialog` - Dialog pour marquer comme vendu
- `StatsCards` - Cartes de statistiques
- `ItemFilters` - Barre de filtres

## 🚢 Production

### Backend

```bash
cd backend
npm run build  # Si applicable
npm start
```

### Frontend

```bash
cd frontend
npm run build
# Les fichiers seront dans dist/
```

## 📝 Variables d'Environnement

### Backend (.env)

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://user:pass@host:port/dbname
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env)

```
VITE_API_URL=https://api.yourdomain.com
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

ISC

## 👨‍💻 Auteur

Développé avec ❤️ pour la communauté WoW Anniversary Edition
