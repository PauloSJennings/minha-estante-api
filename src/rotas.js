const { Router } = require('express');
const { pesquisaLivros, adicionarLivro } = require('./controladores/livros');
const validarCorpoReq = require('./middleware/validarCorpoReq');
const schemaUsuario = require('./schemas/schemaUsuario');
const { cadastrarUsuario, login, detalharUsuario } = require('./controladores/usuarios');
const autenticarToken = require('./middleware/autenticarToken');
const router = Router();

//rota pesquisa
router.get('/pesquisa', pesquisaLivros);

//cadastro e login
router.post('/usuario', validarCorpoReq(schemaUsuario), cadastrarUsuario);
router.post('/login', login);

router.use(autenticarToken);

//rotas usuários
router.get('/usuario', detalharUsuario);

//rotas livros
router.get('/livros', adicionarLivro);



module.exports = router;