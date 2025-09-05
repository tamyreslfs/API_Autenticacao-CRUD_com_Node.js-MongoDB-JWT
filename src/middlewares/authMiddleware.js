const jwt = require("jsonwebtoken");
const { ACCESS_SECRET } = require("../utils/jwt");
const User = require("../models/User");

module.exports = async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Token ausente (Bearer <token>)" });
  }

  try {
    const payload = jwt.verify(token, ACCESS_SECRET);
    // anexa o usuário no request (sem campos sensíveis)
    req.userId = payload.sub;
    req.user = await User.findById(payload.sub).select("-password -refreshTokens");
    if (!req.user) return res.status(401).json({ message: "Usuário não encontrado" });
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};
