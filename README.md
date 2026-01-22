<div align="right">
  <a href="README.fr.md"><strong>🇫🇷 Français</strong></a>
</div>

# WoW Item Tracker

Full-stack inventory/trading tracking application for World of Warcraft Anniversary Edition.

## 📋 Overview

This application allows you to track item purchases and sales with automatic profit calculation. It consists of a REST API backend (Express + MongoDB) and a modern React frontend.

## 🚀 Tech Stack

### Backend

- **Express 5.1.0** - Server framework
- **MongoDB 8.0** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Node.js ≥ 18** - JavaScript runtime

### Frontend

- **React 19** - UI library
- **TypeScript** - Static typing
- **Vite** - Ultra-fast build tool
- **TanStack Query** - API request management
- **shadcn/ui** - UI components (Radix + Tailwind CSS v4)
- **Axios** - HTTP client

## 📁 Project Structure

```
wowitemtracker/
├── backend/           # Express API
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   └── package.json
│
├── frontend/          # React Application
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── config/
│   └── package.json
│
└── bruno/            # Bruno API Collection
```

## ⚙️ Installation

### Prerequisites

- Node.js >= 18
- MongoDB 8.0 (local or remote)
- npm or yarn

### 1. Backend

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wow-items
CORS_ORIGIN=http://localhost:5173
EOF

# Start the server
npm run dev
```

The server will be available at `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000
EOF

# Start the application
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Features

- ✅ **CRUD Items** - Create, read, update, delete items
- ✅ **Sales Management** - Mark an item as sold with price and date
- ✅ **Statistics** - Overview of investments and profits
- ✅ **Filters** - By item type, status (owned/sold), text search
- ✅ **Responsive Interface** - Works on desktop and mobile
- ✅ **Validation** - Client-side and server-side validation
- ✅ **Error Handling** - Clear error messages and notification toasts

## 📊 Data Model

### Item

```typescript
{
  _id: string
  name: string           // Item name
  type: string           // Type (Armor, Weapon, etc.)
  purchasePrice: number  // Purchase price
  purchaseDate: Date     // Purchase date
  salePrice?: number     // Sale price (optional)
  saleDate?: Date        // Sale date (optional)
  status: string         // "owned" | "sold"
  createdAt: Date
  updatedAt: Date
}
```

## 🔌 API Endpoints

```
GET    /api/items              # List all items
POST   /api/items              # Create an item
GET    /api/items/stats        # Statistics
GET    /api/items/:id          # Get an item
PUT    /api/items/:id          # Update an item
DELETE /api/items/:id          # Delete an item
GET    /api/health             # Health check
```

## 🧪 API Testing

A Bruno collection is provided in the `bruno/` folder for easy API testing.

```bash
cd bruno/WoW\ Item\ Tracker\ API
# Use Bruno Desktop or CLI
```

## 🏗️ Frontend Architecture

### Custom Hooks

#### Data Hooks (API)

- `useItems()` - List items with filters
- `useItemsStats()` - Global statistics
- `useCreateItem()` - Create an item
- `useUpdateItem()` - Update an item
- `useDeleteItem()` - Delete an item

#### UI State Hooks

- `useDialog()` - Manage dialog open/close
- `useForm()` - Forms with validation
- `useItemFilters()` - Global filters
- `useToast()` - Notifications

### Contexts

- **QueryClientProvider** - TanStack Query
- **ToastProvider** - Global notifications
- **ItemFiltersProvider** - Shared filters

## 🎨 Main Components

- `Dashboard` - Main view
- `ItemCard` - Item display card
- `ItemList` - Items list with loading states
- `ItemFormDialog` - Create/edit form
- `MarkAsSoldDialog` - Dialog to mark as sold
- `StatsCards` - Statistics cards
- `ItemFilters` - Filters bar

## 🚢 Production

### Backend

```bash
cd backend
npm run build  # If applicable
npm start
```

### Frontend

```bash
cd frontend
npm run build
# Files will be in dist/
```

## 📝 Environment Variables

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

## 🤝 Contributing

1. Fork the project
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 👨‍💻 Author

Developed with ❤️ for the WoW Anniversary Edition community
