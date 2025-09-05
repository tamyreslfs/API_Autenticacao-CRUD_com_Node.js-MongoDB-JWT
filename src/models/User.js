const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,  // mantém apenas este
      lowercase: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true, minlength: 6 },
    refreshTokens: { type: [String], default: [] },
  },
  { timestamps: true }
);

// hash automático antes de salvar quando a senha for criada/alterada
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// helper para comparar senha no login
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// remover campos sensíveis das respostas JSON
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.refreshTokens;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
