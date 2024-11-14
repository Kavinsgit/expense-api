const jwt = require("jsonwebtoken");
// require("dotenv").config();

let refreshTokens = [];

const signJwt = (username, id) => {
  const refreshToken = jwt.sign(
    {
      usr: username,
      id,
    },
    process.env.REFRESH_KEY
  );
  const accessToken = jwt.sign(
    {
      usr: username,
      id,
    },
    process.env.SECRET_KEY,
    { expiresIn: 60 * 10 }
  );
  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
};

const verifyJwt = (token, secret) => {
  return jwt.verify(token, secret);
};

const refreshJwt = (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshTokens.includes(refreshToken))
      return res.status(401).json({ message: "Invalid refresh token" });
    const data = verifyJwt(refreshToken, process.env.REFRESH_KEY);
    return res.status(200).json(signJwt(data.usr, data.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserToken = (req, res) => {
  try {
    refreshTokens = refreshTokens.filter((token) => token != req.body.token);
    res.status(204).json({ message: "Refresh token removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signJwt, verifyJwt, refreshJwt, deleteUserToken };
