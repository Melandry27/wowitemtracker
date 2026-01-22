# WoW Item Tracker - Backend API

API REST pour le suivi d'inventaire/trading World of Warcraft.

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env` basé sur `.env.example`:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wow-items
CORS_ORIGIN=http://localhost:5173
```

## Démarrage

```bash
# Production
npm start

# Développement (avec nodemon)
npm run dev
```

## Endpoints API

Voir [.copilot/wow-item-tracker.md](../.copilot/wow-item-tracker.md) pour la documentation complète.

## Stack

- Express.js 5.1.0
- MongoDB 8.0
- Mongoose 8.x
- Joi (validation)
- Helmet (sécurité)
- CORS
