const logger = require("../logger.js");
const jwt = require("../jwt.js");
const User = require("../model/user.model.js");
const usernameNotAvailableErrorMessage =
  "Username is not available. Please try different name";

const addUser = async (req, res) => {
  try {
    if (!(await isUsernameAvailable(req.body.username))) {
      logger.log({
        level: "info",
        message: `User has requested an username ${req.body.username} which already exists`,
      });
      res.status(200).json({
        message: usernameNotAvailableErrorMessage,
      });
    } else {
      const user = await User.create(req.body);
      if (user) {
        logger.log({
          level: "info",
          message: `A new user with username ${user.username} has been created`,
        });
        res.status(201).json(user);
      } else {
        logger.log({
          level: "error",
          message: `Problem creating the user ${user.username}`,
        });
        res.status(500).json({ message: "Cannot create user" });
      }
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `The user can not be added: ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    logger.log({
      level: "info",
      message: `Users were obtained`,
    });
    res.status(200).json(users);
  } catch (error) {
    logger.log({
      level: "error",
      message: `Cannot get the users: ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find({
      _id: id,
    });
    if (user.length == 0) {
      logger.log({
        level: "error",
        message: `Cannot find the requested user`,
      });
      res.status(404).json({ message: "No user" });
    }
    logger.log({
      level: "info",
      message: `The user with id:${id} was obtained`,
    });
    res.status(200).json(user);
  } catch (error) {
    logger.log({
      level: "error",
      message: `Cannot get the requested user: ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await User.find({});
    const user = users.filter((user) => user.username == username);
    if (user.length == 0 || user[0].password != password) {
      res.status(404).send("User Not Found!");
    }
    const token = jwt.signJwt(username, user[0]._id);
    logger.log({
      level: "info",
      message: `user ${username} logged in`,
    });
    res.status(200).json(token);
  } catch (error) {
    logger.log({
      level: "error",
      message: `Cannot get login the user: ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

const isUsernameAvailable = async (username) => {
  try {
    const usernames = await User.find(
      { username: username },
      { username: true, _id: false }
    );
    return usernames.length == 0 ? true : false;
  } catch (error) {
    throw error;
  }
};

const checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    if (await isUsernameAvailable(username)) {
      logger.log({
        level: "info",
        message: `The ${username} is available`,
      });
      res.status(200).json({ message: "Username is available" });
    } else {
      logger.log({
        level: "info",
        message: `${usernameNotAvailableErrorMessage}`,
      });
      res.status(200).json({
        message: usernameNotAvailableErrorMessage,
      });
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `Cannot check the username: ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  loginUser,
  checkUsername,
};
