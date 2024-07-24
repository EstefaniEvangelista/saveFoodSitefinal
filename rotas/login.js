const express = require('express');
const loginController = require('../controllers/login_controller');


const rota = express.Router();

rota.post('/', loginController.inserir);
rota.get('/', loginController.busca);
rota.post('/login', loginController.login)
rota.get('/confirmar/:hash_confirma', loginController.confirma);

module.exports = rota;