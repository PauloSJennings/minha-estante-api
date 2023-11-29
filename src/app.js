const app = require('./servidor');
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}`);
})