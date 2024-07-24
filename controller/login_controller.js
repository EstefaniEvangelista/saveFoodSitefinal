const express = require('express');
const loginRepository = require('../repository/login_repository');


// Inserir novo usuario
exports.inserir = (req, res) => {
    const usuario = req.body;

    loginRepository.inserir(usuario, (err, usuario) => {
        if (err || usuario == undefined) {
            res.status(500).json({msg: err})
        } else {
            res.status(200).json(usuario.id);
        }
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário existe no banco de dados
    userModel.findByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro no servidor' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        // Verificar se a senha está correta
        if (user.password !== password) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Login bem-sucedido
        // Aqui você pode inserir a lógica para registrar o login no banco de dados
        // userModel.logLogin(user.id, (err) => {
        //     if (err) {
        //         console.error('Erro ao registrar login:', err);
        //     }
        // });

        res.json({ message: 'Login bem-sucedido' });
    });
};
