# Simple Docker + Express + MySQL + Sequelize + Auth with PassportJS Boilerplate 🚀
The main purpose of this repository is to be able to work quickly and easily through Docker containers a NodeJS + Express server consuming a MySQL database with table mapping using Sequelize ORM and authenticating users with Passport. In a few weeks I hope to add error logging, Swagger for documentation and make it usefull for productions build.
You can use this repo whitout giving me any credits. Feel free to create a PR if you can fix or suggest any idea 😉.

## Technologies 👨‍💻
- [Docker](https://www.docker.com/) as the container service to isolate the environment.
- [Docker Compose](https://docs.docker.com/compose/) for running multi-container Docker applications.
- [Node.js](https://nodejs.org/en/) as the run-time environment to run JavaScript.
- [Express.js](https://expressjs.com/) as the server framework
- [MySQL](https://www.mysql.com/) as the database layer
- [Sequelize](https://sequelize.org/) as the "ORM" for mapping tables
- [Passport](http://www.passportjs.org/) as a middleware for authentication

## Important files:
* **Dockerfile:** File to build the docker container
* **docker-compose.yml:** Docker Compose script to running the two containers (nodejs & db)
* **db.js:** Util module for initiliaze the database and models
* **.env:** File to set environments variables.
* **wait-for.sh:** Bash script to wait the database initialization


## Instalation

#### 1. Clone repo

```
git clone https://github.com/LAccastello/simple-docker-express-mysql-boilerplate.git
cd simple-docker-express-mysql-boilerplate
```

#### 2. Install dependencies

```
npm i
```

#### 3. Run Docker Compose

```
docker-compose up
```

This will start two containers: 
* **nodejs** container of NodeJS server
* **db** container of MySQL database

**Server:** 
```
http://localhost:8080
```

## Environment
To edit environment variables, create a file with name `.env` and copy the contents from `.env.example` to start with.

| Var Name  | Type  | Default | Description  |
|---|---|---|---|
| MYSQL_HOST  | string  | `db` |Container database name `db`  |
|  MYSQL_DATABASE | string  | `` | Database name |
|  MYSQL_USER | string  | `` | Database username |
|  MYSQL_PORT | number  | `3306` | Database port |
|  MYSQL_PASSWORD | string  | `` | Database password |
|  MYSQL_ROOT_PASSWORD | string  | `` | Database root password |
|  SECRETKEY | string  | `` | Secret key to sign the JWT |
|  SECRETKEY_SESSION | string  | `` | Secret key to secure cookie session |


## Directory Structure
```
+-- app
|   +-- controllers
|   |   +-- auth.controller.js
|   +-- models
|   |   +-- user.model.js
|   +-- routes
|   |   +-- auth.route.js
|   +-- db.js
|   +-- server.ts
+-- .dockerignore
+-- .env
+-- .env.example
+-- .gitignore
+-- docker-compose.yml
+-- Dockerfile
+-- package-lock.json
+-- package.json
+-- README.md
+-- wait-for.sh
```
