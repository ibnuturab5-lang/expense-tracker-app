import express from "express";
import {
  createIncome,
  deleteIncome,
  getAllIncomes,
  getIncome,
  last30DaysIncome,
  updateIncome,
} from "../controller/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createIncome);
router.get("/", protect, getAllIncomes);
router.get("/last30DaysIncome", protect, last30DaysIncome);
router.get("/:id", protect, getIncome);
router.put("/:id", protect, updateIncome);
router.delete("/:id", protect, deleteIncome);

export default router;
