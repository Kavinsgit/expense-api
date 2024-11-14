const logger = require("../logger.js");
const Expense = require("../model/expense.model.js");

const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    if (expense) {
      logger.log({
        level: "info",
        message: `The expense ${expense._id} is added`,
      });
      return res.status(200).json({ message: "Expense added" });
    } else {
      logger.log({
        level: "error",
        message: `The expense ${expense._id} could not be added`,
      });
      return res.status(500).json({ message: "Error creating the expense" });
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `Problem adding the expense: ${error.message}`,
    });
    return res.status(500).json({ message: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    if (expenses) {
      logger.log({
        level: "info",
        message: `The expenses are obtained`,
      });
      return res.status(200).json(expenses);
    } else {
      logger.log({
        level: "error",
        message: `The expenses could not be obtained`,
      });
      return res.status(500).json({ message: "Error getting the expenses" });
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `Problem getting the expense: ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.updateOne(
      {
        _id: id,
      },
      req.body
    );
    if (updatedExpense) {
      logger.log({
        level: "info",
        message: `The expense ${id} is updated`,
      });
      return res.status(200).json({ message: "Updated" });
    } else {
      logger.log({
        level: "error",
        message: `The expense ${id} could not be updated`,
      });
      return res.status(500).json({ message: "Error updating the expense" });
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `Problem updating the expense: ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.deleteOne({
      _id: id,
    });
    if (updatedExpense) {
      logger.log({
        level: "info",
        message: `The expense ${id} is deleted`,
      });
      return res.status(200).json({ message: "Deleted" });
    } else {
      logger.log({
        level: "error",
        message: `The expense ${id} could not be delete`,
      });
      return res.status(500).json({ message: "Error deleting the expense" });
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `Problem deleting the expense: ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
