const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection on startup
(async () => {
    try {
        await connectDB();
        console.log('Database connection pool established');
    } catch (err) {
        console.error('Failed to establish database connection pool:', err);
        process.exit(1);
    }
})();

// Routes
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/client', require('./routes/clientRoutes'));
app.use('/api/call', require('./routes/callRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle application shutdown
process.on('SIGINT', async () => {
    try {
        const pool = await getConnection();
        await pool.close();
        console.log('Database pool closed.');
        process.exit(0);
    } catch (err) {
        console.error('Error closing database pool:', err);
        process.exit(1);
    }
});