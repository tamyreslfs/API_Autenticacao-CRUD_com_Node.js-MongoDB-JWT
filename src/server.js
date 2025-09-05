const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const PORT = 3000;

mongoose.connect('mongodb+srv://tamyreslopes:9541@cluster0.k2mxz.mongodb.net/trabapicrudnode?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Conexão com o mongodb estabelecida com sucesso")
}).catch(error => {
    console.log("Erro ao conectar o mongodb", error);
});

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor está conectado na porta  ${PORT}`);
});