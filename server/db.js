const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false, // change to true for local dev / self-signed certs
    },
    instanceName: process.env.DB_INSTANCE_NAME,
};
console.log(config);
async function connectDB() {
    try {
        console.log('Attempting to connect to database...');
        const pool = await new sql.ConnectionPool(config).connect();
        console.log('Connected to MSSQL database');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

module.exports = {
    connectDB,
    sql
};