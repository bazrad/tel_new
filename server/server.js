const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const injectDB = require('./middleware/injectDB');
const db = require('./seq_db');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(injectDB(db));  //sequilize mssql connected db
// Test database connection on startup
// (async () => {
//     try {
//         await connectDB();
//         console.log('Database connection pool established');
//     } catch (err) {
//         console.error('Failed to establish database connection pool:', err);
//         process.exit(1);
//     }
// })();

// Routes
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/client', require('./routes/clientRoutes'));
app.use('/api/call', require('./routes/callRoutes'));
app.use('/api/station', require('./routes/stationRoutes'));
app.use('/api/worker', require('./routes/workerRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
db.sequelize.sync()
    .then(async (result) => {
        console.log('SYNC ...')
    })
    .catch((err) => console.log(err))



db.call.belongsTo(db.phone, { foreignKey: 'number_id_in', as: 'number_in' });
db.call.belongsTo(db.phone, { foreignKey: 'number_id_out', as: 'number_out' });
db.client.belongsToMany(db.phone, { through: db.client_phone, foreignKey: 'client_id' });
db.phone.belongsToMany(db.client, { through: db.client_phone, foreignKey: 'phone_id' });
// Handle application shutdown
//process.on('SIGINT', async () => {
//     try {
//         const pool = await getConnection();
//         await pool.close();
//         console.log('Database pool closed.');
//         process.exit(0);
//     } catch (err) {
//         console.error('Error closing database pool:', err);
//         process.exit(1);
//     }
// });