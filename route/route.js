const express = require("express");
const router = express.Router();

const {
  addUser,
  getUsers,
  getUserById,
  loginUser,
  checkUsername,
} = require("../controller/user.controller.js");

const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controller/expense.controller.js");

const { verifyAuthValidity } = require("../utils/authOperations.js");

const { refreshJwt, deleteUserToken } = require("../jwt.js");

router.post("/user", addUser);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.post("/login", loginUser);

router.get("/check-username/:username", checkUsername);

router.post("/add-expense", verifyAuthValidity, addExpense);

router.get("/get-expense", verifyAuthValidity, getExpenses);

router.post("/update-expense/:id", verifyAuthValidity, updateExpense);

router.delete("/delete-expense/:id", verifyAuthValidity, deleteExpense);

router.post("/token", refreshJwt);

router.delete("/token", deleteUserToken);

module.exports = router;
