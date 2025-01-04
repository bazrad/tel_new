
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = {
    DB_USER: "bazrad",
    DB_PASSWORD: "0210",
    DB_SERVER: "NRP-BAZRAD0210",
    DB_DATABASE: "telephone",
    DB_PORT: 1433,
    DB_INSTANCE_NAME: "SQLEXPRESS"
}
// Create a new Sequelize instance
console.log(config)
const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
    host: String(config.DB_SERVER),
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true, // Use encryption (recommended for Azure)
            trustServerCertificate: true, // For development only
        },
    },
    logging: false,
});

// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MSSQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const db = {};
const models = [];
fs.readdirSync(path.join(__dirname, 'model')).forEach(file => {
    if (file.endsWith('.js')) {
        models.push(require(path.join(__dirname, 'model', file)));
    }
});
models.forEach((model) => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;