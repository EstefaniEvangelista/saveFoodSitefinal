const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const port = 3000;

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'saveFood',
    password: 'postgress',
    port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM usuarios WHERE username = $1 AND password = $2', [username, password], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
          // Login bem-sucedido, agora inserimos no banco de dados
          pool.query('INSERT INTO usuarios (username, password) VALUES ($1, $2)', [username, new Date()], (error, results) => {
              if (error) {
                  throw error;
              }
              console.log('Login registrado no banco de dados.');
          });
          res.send('Login successful');
      } else {
          res.status(401).send('Invalid username or password');
      }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



