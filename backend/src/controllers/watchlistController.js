import Watchlist from "../models/Watchlist.js";

// @desc    Récupérer tous les items de la watchlist
// @route   GET /api/watchlist
export const getAllWatchlistItems = async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = {};

    if (type) filter.type = type;

    const items = await Watchlist.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Récupérer un item de la watchlist par ID
// @route   GET /api/watchlist/:id
export const getWatchlistItemById = async (req, res, next) => {
  try {
    const item = await Watchlist.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé dans la watchlist",
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

// @desc    Créer un nouvel item dans la watchlist
// @route   POST /api/watchlist
export const createWatchlistItem = async (req, res, next) => {
  try {
    const item = await Watchlist.create(req.body);

    res.status(201).json({
      success: true,
      data: item,
      message: "Item ajouté à la watchlist avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour un item de la watchlist
// @route   PUT /api/watchlist/:id
export const updateWatchlistItem = async (req, res, next) => {
  try {
    const item = await Watchlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé dans la watchlist",
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

// @desc    Supprimer un item de la watchlist
// @route   DELETE /api/watchlist/:id
export const deleteWatchlistItem = async (req, res, next) => {
  try {
    const item = await Watchlist.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé dans la watchlist",
      });
    }

    res.json({
      success: true,
      data: {},
      message: "Item supprimé de la watchlist avec succès",
    });
  } catch (error) {
    next(error);
  }
};
