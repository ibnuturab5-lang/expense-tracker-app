import moment from "moment/moment.js";
import Expense from "../models/Expense.js";

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    if (!expenses) {
      return res.status(404).json({ message: "expenses not found!" });
    }
    return res.status(200).json( expenses );
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
//get one expense
export const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.json({ message: "expense not found" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
//get last 60 days expense
export const last60DaysExpense = async (req, res) => {
  const sixtyDaysAgo = moment().subtract(60, "days").toDate();
  try {
    const expenses = await Expense.find({
      user: req.user._id,
      date: { $gte: sixtyDaysAgo },
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//create expense
export const createExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;
  try {
    const expense = await Expense.create({
      amount,
      category,
      date,
      description,
      user: req.user._id,
    });
    return res
      .status(201)
      .json(expense );
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
//update expense
export const updateExpense = async (req, res) => {
  const { amount, source, date, description } = req.body;
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "expense not found" });
    }
    if (req.user._id.toString() !== expense.user.toString()) {
      return res.status(401).json({ message: "Not authorized to update" });
    }
    expense.amount = amount || expense.amount;
    expense.source = source || expense.source;
    expense.description = description || expense.description;
    expense.date = date || expense.date;
    const updatedExpense = await expense.save();
    return res.status(201).json(updatedExpense);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
//delete expense
//get one expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.json({ message: "expense not found" });
    }
    if (req.user._id.toString() !== expense.user.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this!" });
    }

    await expense.deleteOne();
    return res.status(200).json({ message: "expense deleted!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
