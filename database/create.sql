CREATE DATABASE saveFood;

CREATE TABLE usuarios (
    idUsuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE login_history (
    id_login SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    login_time TIMESTAMP NOT NULL
);

CREATE TABLE produtos (
    id_produto SERIAL PRIMARY KEY,
    codigo_barras VARCHAR(100) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    data_validade DATE NOT NULL
);