# Collection Bruno - WoW Item Tracker API

Collection complète pour tester l'API WoW Item Tracker avec Bruno.

## 📦 Installation de Bruno

Télécharger depuis: https://www.usebruno.com/downloads

Ou via Chocolatey (Windows):

```powershell
choco install bruno
```

## 🚀 Utilisation

1. Ouvrir Bruno
2. **File > Open Collection**
3. Sélectionner le dossier `bruno/WoW Item Tracker API`
4. Vérifier que l'environnement **local** est sélectionné
5. Démarrer votre serveur: `npm run dev`
6. Tester les requêtes!

## 📋 Requêtes Disponibles

### Basiques

- **Health Check** - Vérifier que l'API répond
- **Get All Items** - Liste tous les items (avec filtres optionnels)
- **Get Item by ID** - Récupérer un item spécifique
- **Create Item** - Ajouter un nouvel item
- **Update Item** - Modifier un item existant
- **Delete Item** - Supprimer un item
- **Get Statistics** - Statistiques globales

### Exemples

- **Create Armor Item** - Exemple de création d'armure
- **Create Sold Item** - Exemple d'item déjà vendu
- **Filter by Type** - Filtrer par type d'item
- **Filter by Status** - Filtrer par statut (owned/sold)

## 🔧 Configuration

### Environnement Local

- **baseUrl**: `http://localhost:5000`
- **apiUrl**: `http://localhost:5000/api`

Pour modifier le port, éditer `environments/local.bru`

## 📝 Workflow de Test

1. **Health Check** - Vérifier la connexion
2. **Create Item** - Créer quelques items de test
3. **Get All Items** - Vérifier qu'ils apparaissent
4. **Get Item by ID** - Remplacer `:id` par un vrai ID MongoDB
5. **Update Item** - Marquer un item comme vendu
6. **Get Statistics** - Voir les stats mises à jour
7. **Delete Item** - Nettoyer

## 💡 Tips

- Les IDs MongoDB ont ce format: `679151c8e4b0a1234567890a` (24 caractères hexadécimaux)
- Copier un vrai ID depuis la réponse de **Get All Items** pour tester les routes avec `:id`
- Les query params avec `~` dans Bruno sont désactivés par défaut (les activer selon besoin)
- Le champ `profit` est calculé automatiquement (virtual field)

## 🐛 Résolution de Problèmes

**Erreur ECONNREFUSED**

- Vérifier que MongoDB est démarré: `sudo systemctl start mongod`
- Vérifier que le serveur Express tourne: `npm run dev`

**404 Not Found**

- Vérifier que l'URL est correcte
- Pour les routes avec `:id`, remplacer par un vrai ObjectId

**Validation Error**

- Vérifier que tous les champs requis sont présents
- Types valides: Armor, Weapon, Accessory, Consumable, Crafting Material, Quest Item, Other
