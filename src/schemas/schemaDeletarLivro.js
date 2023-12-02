const joi = require('joi');

const schemaDeletarLivro = joi.object({
    id: joi.number().positive().integer().required()
});

module.exports = schemaDeletarLivro;