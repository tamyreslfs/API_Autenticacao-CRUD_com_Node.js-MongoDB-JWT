const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { createTodoSchema, updateTodoSchema } = require('../validation/todoValidation');

// Criar um novo todo
router.post("/", authMiddleware, validate(createTodoSchema), async (req, res) => {
  try {
    const { title, description, done } = req.body;

    const todo = new Todo({
      title,
      description,
      done: done || false, // padrão false se não enviar
      owner: req.user._id,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Listar todos do usuário
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Buscar um todo pelo ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo não encontrado" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Atualizar um todo
router.put("/:id", authMiddleware, validate(updateTodoSchema), async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo não encontrado" });

    const { title, description, done } = req.body;

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (done !== undefined) todo.done = done;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deletar um todo
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo não encontrado" });
    res.json({ message: "Todo deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
