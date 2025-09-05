const User = require("../models/User");
const { registerSchema, loginSchema } = require("../validation/authSchemas");
const {
  signAccessToken,
  signRefreshToken,
} = require("../utils/jwt");

exports.register = async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({ message: "Dados inválidos", errors });
  }

  const { name, email, password } = parsed.data;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email já cadastrado" });

    const user = new User({ name, email, password });
    await user.save();

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    user.refreshTokens.push(refreshToken);
    await user.save();

    return res.status(201).json({
      user: user.toJSON(),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao registrar", error: error.message });
  }
};

exports.login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({ message: "Dados inválidos", errors });
  }

  const { email, password } = parsed.data;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Credenciais inválidas" });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    user.refreshTokens.push(refreshToken);
    await user.save();

    return res.status(200).json({
      user: user.toJSON(),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao autenticar", error: error.message });
  }
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) {
    return res.status(400).json({ message: "refreshToken é obrigatório" });
  }

  const jwt = require("jsonwebtoken");
  const { REFRESH_SECRET } = require("../utils/jwt");

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "Usuário não encontrado" });

    const stillValid = user.refreshTokens.includes(refreshToken);
    if (!stillValid) {
      return res.status(401).json({ message: "refreshToken inválido ou revogado" });
    }

    // Rotaciona: remove o antigo e adiciona um novo
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);

    const newAccess = signAccessToken(user);
    const newRefresh = signRefreshToken(user);
    user.refreshTokens.push(newRefresh);
    await user.save();

    return res.status(200).json({
      user: user.toJSON(),
      accessToken: newAccess,
      refreshToken: newRefresh,
    });
  } catch (err) {
    return res.status(401).json({ message: "refreshToken inválido ou expirado" });
  }
};

exports.me = async (req, res) => {
  // req.user vem do middleware de auth
  return res.status(200).json({ user: req.user });
};
