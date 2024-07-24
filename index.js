const express = require('express');

const app = express();
app.use(express.json()); 

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true })); 

const produtoRotas = require('./rotas/produto');
const usuarioRotas = require('./rotas/usuario');
app.use('/usuarios', usuarioRotas);
app.use('/produtos', produtoRotas);


const cron = require('node-cron');
const verificaProximoValidade = require('./utils/verificaProximoValidade')
// Especifica que a função será executada todos os dias as 8 horas da manhã
cron.schedule('0 12 * * *', () => {
    console.log('Executando verificação de produtos próximos da validade...');
    verificaProximoValidade();
});

// route.get('/usuarios', cadastroUsuarioRotas.buscarUsuarios)
// app.use('/usuarios', usuarios);


app.listen(3100, () => {
    console.log('Servidor rodando na porta 3100');
});

