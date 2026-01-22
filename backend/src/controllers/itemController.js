import Item from "../models/Item.js";

// @desc    Récupérer tous les items
// @route   GET /api/items
export const getAllItems = async (req, res, next) => {
  try {
    const { status, type } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (type) filter.type = type;

    const items = await Item.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Récupérer un item par ID
// @route   GET /api/items/:id
export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer un nouvel item
// @route   POST /api/items
export const createItem = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      data: item,
      message: "Item créé avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour un item
// @route   PUT /api/items/:id
export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé",
      });
    }

    res.json({
      success: true,
      data: item,
      message: "Item mis à jour avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un item
// @route   DELETE /api/items/:id
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé",
      });
    }

    res.json({
      success: true,
      data: {},
      message: "Item supprimé avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Récupérer les statistiques
// @route   GET /api/items/stats
export const getStats = async (req, res, next) => {
  try {
    const totalItems = await Item.countDocuments();
    const ownedItems = await Item.countDocuments({ status: "owned" });
    const soldItems = await Item.countDocuments({ status: "sold" });

    const items = await Item.find({ status: "sold" });

    const totalInvestment = await Item.aggregate([
      { $group: { _id: null, total: { $sum: "$purchasePrice" } } },
    ]);

    const totalRevenue = await Item.aggregate([
      { $match: { status: "sold" } },
      { $group: { _id: null, total: { $sum: "$salePrice" } } },
    ]);

    const totalProfit = items.reduce((sum, item) => {
      return sum + (item.salePrice - item.purchasePrice);
    }, 0);

    res.json({
      success: true,
      data: {
        totalItems,
        ownedItems,
        soldItems,
        totalInvestment: totalInvestment[0]?.total || 0,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalProfit,
      },
    });
  } catch (error) {
    next(error);
  }
};
