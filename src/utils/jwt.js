const jwt = require("jsonwebtoken");

// valores default para dev; depois podemos mover para .env
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "dev-access-secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";

const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN || "15m";
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || "7d";

function signAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
}

function signRefreshToken(user) {
  return jwt.sign({ sub: user._id.toString() }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  ACCESS_SECRET,
  REFRESH_SECRET,
};
