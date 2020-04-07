CREATE DATABASE projeto_gt; 
CREATE TABLE pessoa ( 
    id INTEGER PRIMARY KEY,
    cpf VARCHAR(13) UNIQUE  NOT NULL,
    datanasc DATE,
    nome VARCHAR(255)  NOT NULL,
    peso DOUBLE,
    uf INTEGER NOT NULL
)