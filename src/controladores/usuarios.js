const knex = require('../dbConexao');
const axios = require('../axiosConfig');
const { verificarEmail } = require('../utils');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, data_nascimento, bio } = req.body;

    try {

        const emailIndisponivel = await verificarEmail(email);

        if (emailIndisponivel) {
            return res.status(400).json({ mensagem: 'Email indisponível.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada,
            data_nascimento,
            bio
        }).returning('*');

        return res.status(200).json(novoUsuario[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    cadastrarUsuario
}

