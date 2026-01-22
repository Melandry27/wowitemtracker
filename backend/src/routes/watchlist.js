import express from "express";
import {
  getAllWatchlistItems,
  getWatchlistItemById,
  createWatchlistItem,
  updateWatchlistItem,
  deleteWatchlistItem,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.route("/").get(getAllWatchlistItems).post(createWatchlistItem);

router
  .route("/:id")
  .get(getWatchlistItemById)
  .put(updateWatchlistItem)
  .delete(deleteWatchlistItem);

export default router;
