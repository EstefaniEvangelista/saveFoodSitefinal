const express = require('express');
const router = express.Router();
const usuarioRepository = require('../repository/usuario_repository');
const bcrypt = require('bcryptjs');

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const usuarios = await usuarioRepository.buscarUsuario(id);

        if (!usuarios) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao buscar usuário' });
    }
});


router.get('', async (req, res) => {
    try {
        const usuarios = await usuarioRepository.buscarUsuarios();

        if (!usuarios) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao buscar usuário' });
    }
});

router.post('', async (req, res) => {
    const usuario = req.body;

    try {
        if  (!usuario.email || !usuario.nome || !usuario.senha){
            return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
        }

        // criptografando a senha
        usuario.senha = bcrypt.hashSync(usuario.senha);
        console.log(usuario.senha);

        const usuarioExiste = await usuarioRepository.buscarUsuarioPorEmail(usuario.email);
        if (usuarioExiste) {
            return res.status(400).json({ error: 'Já existe um usuário com este e-mail.' });
        }

        usuarioRepository.inserirUsuario(usuario, (error) => {
            if (error) {
                console.error(error);
                return res.status(400).json({ error: 'Erro ao cadastrar usuário, tente novamente mais tarde.' });
            }

            return res.status(200).json({ message: 'Usuário cadastrado com sucesso. '});
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;