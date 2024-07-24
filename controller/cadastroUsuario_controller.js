const cadastroUsuarioRepository = require('../repository/cadastroUsuario_repository');

exports.registerUser = async (req, res) => {
    const usuario = req.body;

    try {
        if  (!usuario.email || !usuario.nome || !usuario.senha){
            return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
        }

        const usuarioExiste = await cadastroUsuarioRepository.buscarUsuarioPorEmail(usuario.email);
        if (usuarioExiste) {
            return res.status(400).json({ error: 'Já existe um usuário com este e-mail.' });
        }

        cadastroUsuarioRepository.inserirUsuario(usuario, (error) => {
            if (error) {
                console.error(error);
                return res.status(400).json({ error: 'Erro ao cadastrar usuário, tente novamente mais tarde.' });
            }

            return res.status(200).json({ message: 'Usuário cadastrado com sucesso. '});
        });
    } catch (error) {
        console.error('Erro ao validar produto:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
};
