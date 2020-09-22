# Simple Docker + Express + MySQL + Sequelize Boilerplate
El objetivo principal de este repositorio es que puedan trabajar con un servidor NodeJS + Express consumiendo una base de datos MySQL usando el ORM Sequelize de forma rápida y fácil usando Docker + Docker Compose. Para ser un boilerplate completo falta agregar varias cosas pero este repositorio les permitirá usando Docker Compose levantar un contenedor para el servidor Node y otro para la base de datos MySQL.

Encontrarán en el proyecto:
* **Dockerfile:** archivo necesario para generar el build del docker.
* **docker-compose.yml:** docker compose script para levantar de una sola vez los contenedores del servidor Node y el de la BD MySQL.
* **db.js:** Un módulo de utilidad para inicializar la base de datos y mapear los modelos con Sequelize.
* **.env:** aquí se encuentran variables de entorno como puertos, usuario, password de base de datos, etc.


## Instalación

#### 1. Clonar el repo

```
$ git clone https://github.com/LAccastello/simple-docker-express-mysql-boilerplate.git
$ cd simple-docker-express-mysql-boilerplate
```