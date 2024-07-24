const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
/*const jsbarcode = require('jsbarcode');*/
/*const pool = require('../config/database');*/
/*const cadastro = require('./rotas/cadastro');*/


const app = express();

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'saveFood',
    password: 'postgress',
    port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*app.use('/api/cadastro', cadastro);*/


exports.getProductByBarcode = async (barcode) => {
    try {
        const query = 'SELECT * FROM produtos WHERE codigo_barras = $1';
        const { rows } = await pool.query(query, [barcode]);
        return rows[0];
    } catch (error) {
        throw error;
    }
    
};

exports.inserirProduto = async (produto, callback = () => {}) => {
    const query = 'INSERT INTO produtos (nome, codigo_barras, data_validade) VALUES ($1, $2, $3)';
        const values = [produto.nome, produto.codigo_barras, produto.data_validade];
        pool.query(query, values, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result.rows); 
            }
        });
};
exports.buscarProduto = async function(id) {
    try {
        const query = 'SELECT * FROM produtos WHERE id_produto = $1';
        const result = await pool.query(query, [id]);

        return result.rows.length ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};
exports.buscarProdutos = async function() {
    try {
        const query = 'SELECT * FROM produtos';
        const result = await pool.query(query);

        return result.rows.length ? result.rows : null;
    } catch (error) {
        throw error;
    }
}

// a rota deve ficar no arquivo de rotas, repository deve ser usada apenas para comunicação com o banco de dados
app.post('/validate-product', (req, res) => {
    const { barcode } = req.body;

    // Lógica para validar o código de barras
    if (isValidBarcode(barcode)) {
        res.json({ message: 'Produto válido' });
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

// Função para validar o código de barras
function isValidBarcode(barcode) {
    // Aqui pode implementar a lógica para validar o código de barras no banco de dados
    // Exemplo: consultando o banco de dados para verificar se o produto existe
    return true; // Temporário
}









