const knex = require("../dbConexao");
const jwt = require("jsonwebtoken");

const autenticarToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Token de autenticação necessário');
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, process.env.APIKEY);

        const usuario = await knex('usuarios').select('id', 'nome', 'email').where('id', id).first();

        if (!usuario) {
            return res.status(400).json('Usuário não encontrado.');
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json('Erro interno do servidor');
    }
}

module.exports = autenticarToken;