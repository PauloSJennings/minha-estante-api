const joi = require('joi');

const schemaEditarLivro = joi.object({
    id: joi.number().positive().required(),
    status: joi.number().integer().min(1).max(4),
    comentario: joi.string().max(200),
    nota: joi.number().min(0).max(10)
});

module.exports = schemaEditarLivro;