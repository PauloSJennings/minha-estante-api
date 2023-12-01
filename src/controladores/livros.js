const axios = require('../axiosConfig');
const knex = require('../dbConexao');

const pesquisaLivros = async (req, res) => {

    const { search } = req.body;
    listaLivros = []

    try {

        const result = await axios.get(`/volumes?q=${search}`);

        for (item of result.data.items) {
            listaLivros.push({
                id: item.id,
                titulo: item.volumeInfo.title,
                autor: item.volumeInfo.authors,
                genero: item.volumeInfo.categories,
                editora: item.volumeInfo.publisher,
                data_publicacao: item.volumeInfo.publishedDate,
                descricao: item.volumeInfo.description
            });
        }

        return res.status(200).json(listaLivros);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

const adicionarLivro = async (req, res) => {
    const { id, status, comentario, nota } = req.body;
    const { id: usuario_id } = req.usuario;

    try {

        const livro = await axios.get(`/volumes/${id}`);

        const novoLivro = {
            usuario_id,
            titulo: livro.data.volumeInfo.title,
            autor: livro.data.volumeInfo.authors[0],
            editora: livro.data.volumeInfo.publisher,
            data_publicacao: livro.data.volumeInfo.publishedDate,
            status,
            comentario,
            nota
        }

        await knex('livros').insert(novoLivro);

        return res.status(200).json(novoLivro);

    } catch (error) {

        console.log(error);

        if (error.code === 'ERR_BAD_REQUEST') {
            return res.status(404).json({ mensagem: 'Livro não encontrado.' });
        }

        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    pesquisaLivros,
    adicionarLivro
}