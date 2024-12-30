const { connectDB, sql } = require('../db');

const makePayment = async (req, res) => {
    console.log('Make payment request:', req.body);
    let connection;
    try {
        const { phoneNumber, amount } = req.body;

        connection = await connectDB();
        const result = await connection.request()
            .input('phoneNumber', sql.VarChar(10), phoneNumber)
            .input('amount', sql.Decimal(10, 2), amount)
            .query(`
        INSERT INTO Payments (phoneNumber, amount, paymentDate)
        VALUES (@phoneNumber, @amount, GETDATE());
      `);

        res.json({ message: 'Payment successful' });
    } catch (error) {
        console.error('Make payment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPaymentHistory = async (req, res) => {
    let connection;
    try {
        connection = await connectDB();
        const result = await connection.request()
            .query(`
        SELECT * FROM Payments
        ORDER BY paymentDate DESC
      `);

        res.json(result.recordset);
    } catch (error) {
        console.error('Get payment history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    makePayment,
    getPaymentHistory
};