const { Router } = require('express');
const { pesquisaLivros, adicionarLivro, listarMeusLivros, deletarLivro, editarLivro } = require('./controladores/livros');
const validarCorpoReq = require('./middleware/validarCorpoReq');
const schemaUsuario = require('./schemas/schemaUsuario');
const { cadastrarUsuario, login, detalharUsuario } = require('./controladores/usuarios');
const autenticarToken = require('./middleware/autenticarToken');
const schemaLivro = require('./schemas/schemaLivro');
const schemaEditarLivro = require('./schemas/schemaEditarLivro');
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
router.post('/livros', validarCorpoReq(schemaLivro), adicionarLivro);
router.get('/livros', listarMeusLivros);
router.delete('/livros', deletarLivro);
router.put('/livros', validarCorpoReq(schemaEditarLivro), editarLivro);



module.exports = router;