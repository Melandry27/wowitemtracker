import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/database.js";
import itemRoutes from "./routes/items.js";
import watchlistRoutes from "./routes/watchlist.js";
import errorHandler from "./middleware/errorHandler.js";

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "WoW Item Tracker API", version: "1.0.0" });
});

app.use("/api/items", itemRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route non trouvée",
  });
});

// Gestionnaire d'erreurs
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📂 URL de l'API: http://localhost:${PORT}/api/items`);
  console.log(`📍 Environnement: ${process.env.NODE_ENV || "development"}`);
});

export default app;
