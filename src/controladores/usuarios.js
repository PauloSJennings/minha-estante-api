const knex = require('../dbConexao');
const { verificarEmail } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const enviarEmail = require('../nodemailer');

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

        enviarEmail(email, 'Bem Vindo!', 'Cadastro feito com sucesso!');

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

        const token = jwt.sign({ id: usuarioVerificado.id }, process.env.APIKEY, { expiresIn: '1h' });

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
    const { id } = req.usuario;

    try {
        const dadosUsuario = await knex('usuarios').select('id', 'nome', 'email', 'data_nascimento', 'bio').where('id', id).first();

        const estante = {
            lidos: Number((await knex('livros').count('*').where('usuario_id', id).andWhere('status', 3))[0]['count']),
            lendo: Number((await knex('livros').count('*').where('usuario_id', id).andWhere('status', 2))[0]['count']),
            pretende_ler: Number((await knex('livros').count('*').where('usuario_id', id).andWhere('status', 1))[0]['count']),
            desistidos: Number((await knex('livros').count('*').where('usuario_id', id).andWhere('status', 4))[0]['count'])
        }

        return res.status(200).json({ dadosUsuario, estante });
    } catch (error) {
        return res.status(500).json({ mensagem: "Falha interna do servidor!" });
    }
}

const editarUsuario = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, senha, data_nascimento, bio } = req.body;

    try {
        if (email) {
            const emailIndisponivel = await knex('usuarios').whereNot('id', id).andWhere('email', email);

            if (emailIndisponivel) {
                return res.status(400).json({ mensagem: 'Email indisponível.' })
            }
        }

        const usuarioAtualizado = await knex('usuarios').update({
            nome,
            email,
            senha,
            data_nascimento,
            bio
        }).where('id', id).returning(['id', 'nome', 'email', 'data_nascimento', 'bio']);

        return res.status(200).json(usuarioAtualizado[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Falha interna do servidor!" });
    }

}

module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario,
    editarUsuario
}

