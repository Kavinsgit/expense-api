const jwt = require("../jwt");
const logger = require("../logger");
const accessTokenSecret = process.env.SECRET_KEY;

const verifyAuthValidity = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      logger.log({
        level: "error",
        message: "No Authentication is found in the header",
      });
      return res.status(400).json({ message: "No Authentication found" });
    }
    const jwtToken = authorizationHeader.split(" ")[1];
    const verifiedData = jwt.verifyJwt(jwtToken, accessTokenSecret);
    if (!verifiedData) {
      logger.log({
        level: "error",
        message: "Authentication could not be verified",
      }); // This condition will not be executed
      return res.status(403).json({ message: "Authorization error" });
    }
    next();
  } catch (error) {
    logger.log({
      level: "error",
      message: `Error verifying authentication validity ${error.message}`,
    });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyAuthValidity,
};
