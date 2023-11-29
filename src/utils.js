const knex = require('./dbConexao');

const verificarEmail = async (email) => {
    const usuarioEncontrado = await knex('usuarios').where('email', email).first();

    return usuarioEncontrado;
}

module.exports = {
    verificarEmail
}