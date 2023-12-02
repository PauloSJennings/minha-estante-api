const joi = require('joi').extend(require('@joi/date'));

const schemaEditarUsuario = joi.object({
    nome: joi.string().max(50),
    email: joi.string().email(),
    senha: joi.string().min(5),
    data_nascimento: joi.date().format('DD/MM/YYYY').min('01/01/1930').max('now'),
    bio: joi.string().max(200)
});

module.exports = schemaEditarUsuario;