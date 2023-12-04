const joi = require('joi');

const schemaLivro = joi.object({
    id: joi.string().required().messages({
        'any.required': 'O campo ID é obrigatório.',
        'string.empty': 'O campo ID não pode estar vazio.',
        'string.base': 'O campo ID deve ser alfanumérico.'
    }),
    status: joi.number().integer().min(1).max(4).required().messages({
        'any.required': 'O campo STATUS é obrigatório.',
        'number.base': 'O campo STATUS deve ser um número inteiro de 1 a 4.',
        'number.min': 'O campo STATUS deve ser um número inteiro de 1 a 4.',
        'number.max': 'O campo STATUS deve ser um número inteiro de 1 a 4.',
        'number.integer': 'O campo STATUS deve ser um número inteiro de 1 a 4.'
    }),
    comentario: joi.string().max(200).messages({
        'string.base': 'O campo COMENTÁRIO deve ser um texto.',
        'string.max': 'O campo NOME deve ter no máximo 200 caracteres.'
    }),
    nota: joi.number().min(0).max(10).messages({
        'number.base': 'O campo NOTA deve ser um número inteiro de 0 a 10.',
        'number.min': 'O campo NOTA deve ser um número inteiro de 0 a 10.',
        'number.max': 'O campo NOTA deve ser um número inteiro de 0 a 10.',
        'number.integer': 'O campo NOTA deve ser um número inteiro de 0 a 10.'
    })
});

module.exports = schemaLivro;