CREATE DATABASE advocacia;

USE advocacia;

CREATE TABLE funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    perfil VARCHAR(50) NOT NULL,
    numeroOAB VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    tipo ENUM('comum', 'advogado') NOT NULL DEFAULT 'comum'
);