const validate = (schema) => {
    return (req, res, next) => {
      // Valida o corpo da requisição
      const { error, value } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        // Mapeia todos os erros
        const errors = error.details.map((e) => ({
          field: e.path[0],
          message: e.message,
        }));
        return res.status(400).json({ message: "Dados inválidos", errors });
      }
  
      // Substitui o corpo da requisição pelos dados validados
      req.body = value;
  
      next();
    };
  };
  
  module.exports = validate;
  