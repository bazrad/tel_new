
const getCalls = async (req, res) => {
    console.log('create client request:', req.body);
    let connection;
    try {
        const { name, phone_number } = req.body;


        const result = await req.db.call.findAll();

        res.json(result.recordset);
    } catch (error) {
        console.error('create client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createCall = async (req, res) => {
    let connection;
    try {
        const { phone1, phone2, start, end } = req.body;
        connection = await connectDB();
        const result = await connection.request()
            .input('phoneNumber', sql.VarChar(10), phone1)
            .input('phoneNumber2', sql.VarChar(10), phone2)
            .input('start', sql.DateTime, start)
            .input('end', sql.DateTime, end)
            .query(`exec createCall @phoneNumber,@phoneNumber2,@start,@end`);
        res.json({ done: true });

    } catch (error) {
        console.error('Get clients  error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const createCallBulk = async (req, res) => {
    let connection;
    try {
        connection = await connectDB();
        //         const result = await connection.request()
        //             .query(`
        //         select client.id,name,phone_number from client 
        // left join client_phone on client_phone.client_id=client.id
        // left join phone on client_phone.phone_id=phone.id
        //         ORDER BY client.id DESC
        //       `);

        res.json({ done: true });
    } catch (error) {
        console.error('Get clients  error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    getCalls,
    createCall,
    createCallBulk
};