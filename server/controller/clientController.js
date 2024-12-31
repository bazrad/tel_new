const { connectDB, sql } = require('../db');

const createClient = async (req, res) => {
    console.log('create client request:', req.body);
    let connection;
    try {
        const { name, phone_number } = req.body;

        connection = await connectDB();
        // daraan ORM ashiglah esul procedure bolgoj bichih
        const result = await connection.request()
            .input('name', sql.VarChar(30), name)
            .input('phone', sql.VarChar(30), phone_number)
            .query(`exec createClient @name,@phone`);

        res.json({ message: 'client successfully created' });
    } catch (error) {
        console.error('create client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllClients = async (req, res) => {
    let connection;
    try {
        connection = await connectDB();
        const result = await connection.request()
            .query(`
        select client.id,name,phone_number from client 
left join client_phone on client_phone.client_id=client.id
left join phone on client_phone.phone_id=phone.id
        ORDER BY client.id DESC`);

        res.json(result.recordset);
    } catch (error) {
        console.error('Get clients  error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createClient,
    getAllClients
};