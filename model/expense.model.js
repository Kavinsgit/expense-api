const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: mongoose.Decimal128,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  Note: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: false,
  },
});

const Expense = mongoose.model("expense", ExpenseSchema);

module.exports = Expense;
