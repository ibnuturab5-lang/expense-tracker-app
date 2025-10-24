import moment from "moment/moment.js";
import Income from "../models/Income.js";

export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    if (!incomes) {
      return res.status(404).json({ message: "incomes not found!" });
    }
    return res.status(200).json(incomes);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
//get one income
export const getIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.json({ message: "income not found" });
    }
    return res.status(200).json(income);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
//get last 30 days income
export const last30DaysIncome = async (req, res) => {
  const thirtyDaysAgo = moment().subtract(30, "days").toDate();
  try {
    const incomes = await Income.find({
      user: req.user._id,
      date: { $gte: thirtyDaysAgo },
    }).sort({date:-1});
    res.status(200).json(incomes);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//create income
export const createIncome = async (req, res) => {
  const { amount, source, date, description } = req.body;
  try {
    const income = await Income.create({
      amount,
      source,
      date: new Date(date),
      description,
      user: req.user._id,
    });
    return res
      .status(201)
      .json( income);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
//update income
export const updateIncome = async (req, res) => {
  const { amount, source, date, description } = req.body;
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "income not found" });
    }
    if (req.user._id.toString() !== income.user.toString()) {
      return res.status(401).json({ message: "Not authorized to update" });
    }
    income.amount = amount || income.amount;
    income.source = source || income.source;
    income.description = description || income.description;
    income.date = date || income.date;
    const updatedIncome = await income.save();
    return res.status(201).json(updatedIncome);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
//delete income
//get one income
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.json({ message: "income not found" });
    }
    if (req.user._id.toString() !== income.user.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this!" });
    }

    await income.deleteOne();
    return res.status(200).json({ message: "income deleted!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
