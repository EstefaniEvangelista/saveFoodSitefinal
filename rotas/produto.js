const express = require('express');
const produtoRepository = require('../repository/produto_repository');

const rota = express.Router();

rota.post('/', async (req, res) => {
    const produto = req.body;

    try {
        if  (!produto.codigo_barras || !produto.nome || !produto.data_validade){
            return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
        }

        if (produto.codigo_barras) {
            const produtoExiste = await produtoRepository.getProductByBarcode(produto.codigo_barras);
            if (produtoExiste) {
                return res.status(400).json({ error: 'Já existe um produto com este código de barras.' });
            }
        }

        produtoRepository.inserirProduto(produto, (error) => {
            if (error) {
                console.error(error);
                return res.status(400).json({ error: 'Erro ao cadastrar produto, tente novamente mais tarde.' });
            }

            return res.status(200).json({ message: 'Produto cadastrado com sucesso. '});
        });
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

rota.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const produtos = await produtoRepository.buscarProduto(id);

        if (!produtos) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro interno ao buscar produto' });
    }
});


rota.get('', async (req, res) => {
    try {
        const produtos = await produtoRepository.buscarProdutos();

        res.json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno ao buscar produtos' });
    }
});

rota.post('/validate', () => {

});

rota.get('/confirmar/:hash_confirma', () => {

});


module.exports = rota;

