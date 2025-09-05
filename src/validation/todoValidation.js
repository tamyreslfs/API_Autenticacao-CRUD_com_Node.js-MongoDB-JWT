const Joi = require("joi");

// Validação para criar um TODO
const createTodoSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": "O título é obrigatório",
    "string.min": "O título deve ter pelo menos 3 caracteres",
  }),
  description: Joi.string().allow("").optional().messages({
    "string.base": "A descrição deve ser um texto",
  }),
  done: Joi.boolean().optional().messages({
    "boolean.base": "O campo done deve ser verdadeiro ou falso",
  }),
});

// Validação para atualizar um TODO
const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    "string.min": "O título deve ter pelo menos 3 caracteres",
  }),
  description: Joi.string().allow("").optional().messages({
    "string.base": "A descrição deve ser um texto",
  }),
  done: Joi.boolean().optional().messages({
    "boolean.base": "O campo done deve ser verdadeiro ou falso",
  }),
});

module.exports = { createTodoSchema, updateTodoSchema };
