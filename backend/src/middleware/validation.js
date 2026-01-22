import Joi from "joi";

export const itemValidationSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "string.empty": "Le nom de l'item est requis",
    "string.max": "Le nom ne peut pas dépasser 100 caractères",
  }),
  type: Joi.string()
    .valid(
      "Armor",
      "Weapon",
      "Accessory",
      "Consumable",
      "Crafting Material",
      "Quest Item",
      "Other",
    )
    .required()
    .messages({
      "any.only": "Type d'item invalide",
    }),
  purchasePrice: Joi.number().min(0).required().messages({
    "number.min": "Le prix d'achat doit être positif",
  }),
  purchaseDate: Joi.date().default(Date.now),
  salePrice: Joi.number().min(0).allow(null).optional(),
  saleDate: Joi.date().allow(null).optional(),
});

export const validateItem = (req, res, next) => {
  const { error } = itemValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({
      success: false,
      error: "Validation échouée",
      details: errors,
    });
  }

  next();
};
