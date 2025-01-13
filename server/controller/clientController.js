// Клиент үүсгэх функц
const createClient = async (req, res) => {
    console.log('Create client request:', req.body);
    try {
        const { name, phone_number, address } = req.body;

        const client = await req.db.client.create({
            name,
            address,
            client_type_id: 1, // Default client type
        });

        const phone = await req.db.phone.create({
            phone_number,
        });

        await req.db.client_phone.create({
            client_id: client.id,
            phone_id: phone.id,
        });

        res.json({ message: 'Client successfully created' });
    } catch (error) {
        console.error('Create client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Клиент шинэчлэх функц
const updateClient = async (req, res) => {
    console.log('Update client request:', req.body);
    try {
        const { name, phone_number, address } = req.body;

        const client = await req.db.client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' }); o
        }

        await client.update({ name, address });

        const phone = await req.db.phone.create({
            phone_number,
        });

        await req.db.client_phone.destroy({
            where: { client_id: client.id },
        });

        await req.db.client_phone.create({
            client_id: client.id,
            phone_id: phone.id,
        });

        res.json({ message: 'Client successfully updated' });
    } catch (error) {
        console.error('Update client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Клиент устгах функц
const deleteClient = async (req, res) => {
    console.log('Delete client request:', req.params.id);
    try {
        const client = await req.db.client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        await client.destroy();
        res.json({ message: 'Client successfully deleted' });
    } catch (error) {
        console.error('Delete client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Бүх клиентүүдийг авах функц
const getAllClients = async (req, res) => {
    try {
        const clients = await req.db.client.findAll({
            include: [
                {
                    model: req.db.phone, // Холбоотой утасны дугааруудыг авна
                },
            ],
        });

        res.status(200).json({ data: clients });
    } catch (error) {
        console.error('Get all clients error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Модулиас функцуудыг экспортлох
module.exports = {
    createClient,
    updateClient,
    deleteClient,
    getAllClients,
};
