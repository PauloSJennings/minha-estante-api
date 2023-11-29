const { Router } = require('express');
const { pesquisaLivros } = require('./controladores/livros');
const validarCorpoReq = require('./middleware/validarCorpoReq');
const schemaUsuario = require('./validacoes/schemaUsuario');
const { cadastrarUsuario } = require('./controladores/usuarios');
const router = Router();

router.get('/pesquisa', pesquisaLivros);
router.post('/usuario', validarCorpoReq(schemaUsuario), cadastrarUsuario);

module.exports = router;