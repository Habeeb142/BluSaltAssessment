const dotenv = require('dotenv');

dotenv.config();

const DB_HOST = process.env.SERVER;
const DB_USER = process.env.USERNAME;
const DB_PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB;

const SERVER = {
    dbHost: DB_HOST,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    dbName: DB_NAME
};

const config = {
    server: SERVER
};

module.exports = config;


