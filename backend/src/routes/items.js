import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getStats,
} from "../controllers/itemController.js";
import { validateItem } from "../middleware/validation.js";

const router = express.Router();

// Route stats doit être avant /:id pour éviter confusion
router.get("/stats", getStats);

router.route("/").get(getAllItems).post(validateItem, createItem);

router
  .route("/:id")
  .get(getItemById)
  .put(validateItem, updateItem)
  .delete(deleteItem);

export default router;
