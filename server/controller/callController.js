
const getCalls = async (req, res) => {
    console.log('create client request:', req.body);
    try {
        const { name, phone_number } = req.body;

        console.log('getting all calls')
        const result = await req.db.call.findAll({
            include: [
                { model: req.db.phone, as: 'number_in' },
                { model: req.db.phone, as: 'number_out' }
            ]
        });

        res.status(200).send({ data: result });
    } catch (error) {
        console.error('create client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createCall = async (req, res) => {
    let connection;
    try {
        const { phone1, phone2, start, end } = req.body;
        console.log('create call request:', req.body);
        const createdPhone1 = await req.db.phone.create({ phone_number: phone1 });
        const createdPhone2 = await req.db.phone.create({ phone_number: phone2 });

        const createdCall = await req.db.call.create({
            number_id_in: createdPhone1.id,
            number_id_out: createdPhone2.id,
            duration_start: start,
            duration_end: end,
            calltype_id: 1
        });

        res.json({ done: true, data: createdCall });

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