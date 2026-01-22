# Contexte Projet: WoW Item Tracker

**Date de création:** 22 janvier 2026  
**Version:** 1.0

---

## 📋 Vue d'ensemble du projet

Application web de suivi d'inventaire/trading pour World of Warcraft Anniversary Edition. Permet de suivre les achats et ventes d'items avec un modèle de données simple et flexible.

### Stack Technologique

| Technologie | Version | Notes |
|-------------|---------|-------|
| **React** | 19.2.1 (latest) | Frontend - Composants hooks modernes |
| **Express.js** | 5.1.0 (latest) | Backend - API REST |
| **MongoDB** | 8.0 | Base de données NoSQL |
| **Node.js** | ≥ 18.0 | Runtime requis pour Express 5 |

---

## 🗄️ Modèle de Données

### Modèle `Item`

```javascript
{
  _id: ObjectId,           // Généré automatiquement par MongoDB
  
  // Informations d'achat (obligatoires)
  name: String,            // Nom de l'item (ex: "Épée du Chevalier")
  type: String,            // Type d'item (à détailler)
  purchasePrice: Number,   // Prix d'achat en or
  purchaseDate: Date,      // Date d'achat
  
  // Informations de vente (optionnelles)
  salePrice: Number,       // Prix de vente (null si pas vendu)
  saleDate: Date,          // Date de vente (null si pas vendu)
  
  // Métadonnées (recommandées)
  createdAt: Date,         // Timestamp de création (automatique)
  updatedAt: Date,         // Timestamp de mise à jour (automatique)
  status: String,          // "owned" | "sold" (dérivé des champs vente)
}
```

### Types d'items WoW (à documenter)

À définir selon ta classification WoW. Exemples possibles:
- Armor
- Weapon
- Accessory
- Consumable
- Crafting Material
- Quest Item
- Etc.

---

## 📁 Structure du Projet

```
wow-item-tracker/
│
├── server/
│   ├── models/
│   │   └── Item.js           # Schéma MongoDB avec Mongoose
│   │
│   ├── routes/
│   │   └── items.js          # Routes API pour items
│   │
│   ├── controllers/
│   │   └── itemController.js # Logique métier (CRUD)
│   │
│   ├── middleware/
│   │   └── errorHandler.js   # Gestion centralisée des erreurs
│   │
│   ├── config/
│   │   └── database.js       # Connexion MongoDB
│   │
│   └── server.js             # Point d'entrée Express
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemForm.jsx       # Form création/edit
│   │   │   ├── ItemList.jsx       # Liste des items
│   │   │   ├── ItemCard.jsx       # Affichage item
│   │   │   └── Dashboard.jsx      # Vue principale
│   │   │
│   │   ├── hooks/
│   │   │   └── useItems.js        # Hook personnalisé API
│   │   │
│   │   ├── services/
│   │   │   └── api.js            # Appels API fetch/axios
│   │   │
│   │   ├── App.jsx               # Composant racine
│   │   └── main.jsx              # Point d'entrée
│   │
│   └── package.json
│
├── .env.example              # Variables d'environnement
├── .gitignore
├── README.md
└── package.json (racine)
```

---

## 🔗 API REST Endpoints

### Items

```
GET    /api/items              # Récupérer tous les items
POST   /api/items              # Créer un nouvel item
GET    /api/items/:id          # Récupérer un item spécifique
PUT    /api/items/:id          # Mettre à jour un item
DELETE /api/items/:id          # Supprimer un item
GET    /api/items/stats        # Statistiques globales (profit, etc.)
```

### Réponse Standard (JSON)

```json
{
  "success": true,
  "data": { /* item object */ },
  "message": "Item créé avec succès"
}
```

Erreur:
```json
{
  "success": false,
  "error": "Item non trouvé",
  "statusCode": 404
}
```

---

## 📦 Dépendances Backend

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.x",
  "dotenv": "^16.x",
  "cors": "^2.x",
  "helmet": "^7.x",
  "joi": "^17.x"
}
```

### Middleware clés

- **CORS**: Permettre requêtes du frontend
- **Helmet**: Sécurité (headers HTTP)
- **Joi/Zod**: Validation des données
- **Error Handling**: Gestion centralisée erreurs Express 5

---

## 🎨 Dépendances Frontend

```json
{
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "axios": "^1.x",
  "react-router-dom": "^6.x"
}
```

### Outils/Bundler (selon préférence)

- **Vite** (recommandé) - Plus rapide que Create React App
- **Create React App** - Setup standard

---

## 🌍 Variables d'Environnement

### `.env` Backend

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wow-items
CORS_ORIGIN=http://localhost:5173
```

### `.env` Frontend (Vite)

```
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Fonctionnalités Priorisées

### MVP (Phase 1)
- [x] CRUD items (Create, Read, Update, Delete)
- [x] Formulaire ajout item
- [x] Liste items avec filtres basiques
- [x] Marquer item comme vendu

### Phase 2 (Futur)
- [ ] Recherche et filtres avancés
- [ ] Statistiques (profit par type, tendances)
- [ ] Export/Import CSV
- [ ] Authentification utilisateur
- [ ] Dashboard avec graphiques
- [ ] Notifications/Alertes

---

## 📝 Points d'Attention

1. **Validation côté serveur**: Vérifier présence fields obligatoires avec Joi
2. **Timestamps**: Ajouter `createdAt` et `updatedAt` auto avec Mongoose
3. **Erreurs 404**: Item inexistant = réponse appropriée
4. **Status dérivé**: `status` calculé depuis présence saleDate
5. **React 19 Hooks**: Utiliser `useState`, `useEffect`, `useCallback`
6. **Express 5 Changes**: 
   - Node 18+ requis
   - Promise support dans middleware
   - Regex patterns de routes mises à jour
7. **MongoDB 8.0**: Support amélioré des time-series (optionnel pour v1)

---

## 🔐 Bonnes Pratiques Appliquées

- ✅ Séparation concerns (Controllers, Services, Routes)
- ✅ Variables d'environnement
- ✅ Gestion centralisée des erreurs
- ✅ Validation des inputs
- ✅ CORS configuré
- ✅ Composants React réutilisables
- ✅ Hooks personnalisés pour logique API
- ✅ Async/Await pour opérations asynchrones

---

## 📚 Ressources Officielles

- [React 19 Docs](https://react.dev)
- [Express 5 Migration Guide](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [MongoDB 8.0 Release Notes](https://www.mongodb.com/docs/manual/release-notes/8.0/)

---

## 🎯 Prochaines Étapes

1. **Initialiser les repos** Git backend et frontend
2. **Configurer base de données** MongoDB locale/cloud
3. **Scaffolder application Express** avec structure
4. **Créer schéma Mongoose** pour Item
5. **Build API endpoints** CRUD
6. **Scaffolder React app** (Vite)
7. **Créer composants** principaux
8. **Intégrer API** client-serveur
9. **Tester** flux complet

---

**Status:** 🟢 Prêt pour développement  
**Maintaineur:** Copilot + Développeur  
**Mise à jour:** 22 janvier 2026
