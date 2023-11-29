const joi = require('joi');

const schemaUsuario = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().min(5).required(),
    data_nascimento: joi.date(),
    bio: joi.string()
});

module.exports = schemaUsuario;