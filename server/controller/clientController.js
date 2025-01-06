
const createClient = async (req, res) => {
    console.log('create client request:', req.body);
    try {
        const { name, phone_number, address } = req.body;

        const client = await req.db.client.create({
            name,
            address,
            client_type_id: 1
        })
        const phone = await req.db.phone.create({
            phone_number
        })
        const client_phone = await req.db.client_phone.create({
            client_id: client.id,
            phone_id: phone.id
        })
        res.json({ message: 'client successfully created' });
    } catch (error) {
        console.error('create client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllClients = async (req, res) => {
    try {
        const result = await req.db.client.findAll({
            include: [{
                model: req.db.phone
            }]
        });

        res.status(200).send({ data: result });
    } catch (error) {
        console.error('Get clients  error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createClient,
    getAllClients
};