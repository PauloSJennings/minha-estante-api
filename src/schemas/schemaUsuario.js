const joi = require('joi').extend(require('@joi/date'));

const schemaUsuario = joi.object({
    nome: joi.string().max(50).required().messages({
        'any.required': 'O campo NOME é obrigatório.',
        'string.empty': 'O campo NOME é obrigatório.',
        'string.base': 'O campo NOME deve ser alfabético.',
        'string.max': 'O campo NOME deve ter no máximo 50 caracteres.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo EMAIL é obrigatório.',
        'string.email': 'EMAIL inválido.',
        'string.base': 'EMAIL inválido.',
        'string.empty': 'O campo EMAIL é obrigatório.'
    }),
    senha: joi.string().min(5).required().messages({
        'any.required': 'O campo EMAIL é obrigatório.',
        'string.base': 'O campo SENHA deve ser alfanumérico.',
        'string.empty': 'O campo SENHA é obrigatório.',
        'string.min': 'A SENHA deve conter pelo menos 5 caracteres.'
    }),
    data_nascimento: joi.date().format('DD/MM/YYYY').min('01/01/1930').max('now').messages({
        'date.format': 'DATA DE NASCIMENTO inválida.',
        'date.max': 'DATA DE NASCIMENTO inválida.',
        'date.min': 'DATA DE NASCIMENTO inválida.'
    }),
    bio: joi.string().max(200).messages({
        'string.base': 'O campo BIO deve ser um texto.',
        'string.max': 'O campo BIO deve ter no máximo 200 caracteres.'
    })
});

module.exports = schemaUsuario;