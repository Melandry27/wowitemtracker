import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom de l'item est requis"],
      trim: true,
      maxlength: [100, "Le nom ne peut pas dépasser 100 caractères"],
    },
    type: {
      type: String,
      required: [true, "Le type d'item est requis"],
      enum: {
        values: [
          "Armor",
          "Weapon",
          "Accessory",
          "Consumable",
          "Crafting Material",
          "Quest Item",
          "Other",
        ],
        message: "{VALUE} n'est pas un type valide",
      },
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  },
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
