-- 1. Crear la base de datos "backend"
CREATE DATABASE IF NOT EXISTS backend;

-- Usar la base de datos creada
USE backend;

-- 2. Crear la tabla "persona"
CREATE TABLE IF NOT EXISTS persona (
    dni INT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL
);

-- 3. Crear la tabla "usuario"
CREATE TABLE IF NOT EXISTS usuario (
    mail VARCHAR(40) PRIMARY KEY,
    nickname VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    persona_dni INT,
    FOREIGN KEY (persona_dni) REFERENCES persona(dni)
);
