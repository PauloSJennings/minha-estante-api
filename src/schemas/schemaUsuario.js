const joi = require('joi').extend(require('@joi/date'));

const schemaUsuario = joi.object({
    nome: joi.string().max(50).required(),
    email: joi.string().email().required(),
    senha: joi.string().min(5).required(),
    data_nascimento: joi.date().format('DD/MM/YYYY').min('01/01/1930').max('now'),
    bio: joi.string().max(200)
});

module.exports = schemaUsuario;