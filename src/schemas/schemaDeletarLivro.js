const joi = require('joi');

const schemaDeletarLivro = joi.object({
    id: joi.number().positive().integer().required().messages({
        'number.positive': 'O campo ID deve ser um número positivo.',
        'number.base': ' O campo ID deve ser um número.',
        'any.required': 'O campo ID é obrigatório.',
        'number.integer': 'O campo ID deve ser um número inteiro.'
    })
});

module.exports = schemaDeletarLivro;