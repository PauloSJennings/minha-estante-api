const knex = require('../dbConexao');
const axios = require('../axiosConfig');
const { verificarEmail } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        return res.status(201).json(novoUsuario[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuarioVerificado = await verificarEmail(email);
        const senhaVerificada = await bcrypt.compare(senha, usuarioVerificado.senha);

        if (!usuarioVerificado || !senhaVerificada) {
            return res.status(400).json({ mensagem: 'Email ou senha incorretos.' });
        }

        const token = jwt.sign({ id: usuarioVerificado.id }, process.env.APIKEY, { expiresIn: '2h' });

        const usuarioLogado = {
            usuario: {
                id: usuarioVerificado.id,
                nome: usuarioVerificado.nome,
                email
            },
            token
        }

        return res.status(200).json(usuarioLogado);

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

const detalharUsuario = async (req, res) => {
    const usuarioLogado = req.usuario;

    try {
        return res.status(200).json(usuarioLogado);
    } catch (error) {
        return res.status(500).json({ mensagem: "Falha interna do servidor!" });
    }
}

module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario
}

