const joi = require('joi');

const schemaLivro = joi.object({
    id: joi.string().required().messages({
        'any.required': 'O campo ID é obrigatório.'
    }),
    status: joi.number().integer().min(1).max(4).required(),
    comentario: joi.string().max(200),
    nota: joi.number().min(0).max(10)
});

module.exports = schemaLivro;