import express from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  last60DaysExpense,
  updateExpense,
} from "../controller/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createExpense);
router.get("/", protect, getAllExpenses);
router.get("/last60DaysExpense", protect, last60DaysExpense);
router.get("/:id", protect, getExpense);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;
