const express = require('express');
const { message } = require('statuses');
const Pool = require('pg').Pool;
const app = express();
app.use(express.json());

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'saveFood',
    user: 'postgres',
    password: 'postgress'
});



module.exports = {
     inserirUsuario: function (usuario, callback) {
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
        const values = [usuario.nome, usuario.email, usuario.senha];
        pool.query(query, values, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result.rows); 
            }
        });
    },
    buscarUsuario: async function(idUsuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE idUsuario = $1';
            const result = await pool.query(query, [idUsuario]);

            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw error;
        }
    },
    buscarUsuarioPorEmail: async function(email) {
        try {
            const query = 'SELECT * FROM usuarios WHERE email = $1';
            const result = await pool.query(query, [email]);

            if (result.rows.length > 0) {
                const { idUsuario, nome, email, senha } = result.rows[0];
                return { idUsuario, nome, email, senha };
            } else {
                return null; 
            }
        } catch (error) {
            throw error;
        }
    },
    buscarUsuarios: async function() {
        try {
            const query = 'SELECT * FROM usuarios';
            const result = await pool.query(query);

            return result.rows.length ? result.rows : null;
        } catch (error) {
            throw error;
        }
    }
};











