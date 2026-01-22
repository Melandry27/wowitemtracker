import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    // Informations d'achat (obligatoires)
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
    purchasePrice: {
      type: Number,
      required: [true, "Le prix d'achat est requis"],
      min: [0, "Le prix d'achat doit être positif"],
    },
    purchaseDate: {
      type: Date,
      required: [true, "La date d'achat est requise"],
      default: Date.now,
    },

    // Informations de vente (optionnelles)
    salePrice: {
      type: Number,
      min: [0, "Le prix de vente doit être positif"],
      default: null,
    },
    saleDate: {
      type: Date,
      default: null,
    },

    // Status dérivé
    status: {
      type: String,
      enum: ["owned", "sold"],
      default: "owned",
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual pour calculer le profit
itemSchema.virtual("profit").get(function () {
  if (this.salePrice && this.purchasePrice) {
    return this.salePrice - this.purchasePrice;
  }
  return null;
});

// Middleware pre-save pour mettre à jour le status
itemSchema.pre("save", function (next) {
  if (this.saleDate && this.salePrice) {
    this.status = "sold";
  } else {
    this.status = "owned";
  }
  next();
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
