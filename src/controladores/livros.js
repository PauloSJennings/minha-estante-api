const axios = require('../axiosConfig');

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
                editora: item.volumeInfo.publisher,
                dataPublicacao: item.volumeInfo.publishedDate
            });
        }

        return res.status(200).json(listaLivros);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    pesquisaLivros
}