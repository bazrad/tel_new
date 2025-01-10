// Шинэ клиент үүсгэх функц
const createClient = async (req, res) => {
    // Клиентээс ирсэн хүсэлтийн өгөгдлийг консолд хэвлэнэ
    console.log('create client request:', req.body);

    try {
        // Хүсэлтийн биенээс name, phone_number, address өгөгдлийг авна
        const { name, phone_number, address } = req.body;

        // "client" хүснэгтэд шинэ клиент үүсгэнэ
        const client = await req.db.client.create({
            name,              // Клиентын нэр
            address,           // Клиентын хаяг
            client_type_id: 1  // Клиентын төрөл (default утга: 1)
        });

        // "phone" хүснэгтэд шинэ утасны дугаар үүсгэнэ
        const phone = await req.db.phone.create({
            phone_number       // Утасны дугаар
        });

        // "client_phone" хүснэгтэд клиент болон утасны дугаарыг холбосон бичлэг үүсгэнэ
        const client_phone = await req.db.client_phone.create({
            client_id: client.id, // Үүсгэсэн клиентын ID
            phone_id: phone.id    // Үүсгэсэн утасны ID
        });

        // Амжилттай хариу буцаана
        res.json({ message: 'client successfully created' });
    } catch (error) {
        // Алдаа гарвал консолд хэвлэнэ
        console.error('create client error:', error);

        // Хэрэглэгчид серверийн алдааны хариу илгээнэ
        res.status(500).json({ message: 'Server error' });
    }
};

// Бүх клиентүүдийг авах функц
const getAllClients = async (req, res) => {
    try {
        // "client" хүснэгтээс бүх клиентүүдийг ачаалж, холбоотой "phone" өгөгдлийг хамтад нь авна
        const result = await req.db.client.findAll({
            include: [{
                model: req.db.phone // Клиенттой холбоотой утасны дугаарыг ачаална
            }]
        });

        // Амжилттай бол ачаалсан өгөгдлийг хэрэглэгчид илгээнэ
        res.status(200).send({ data: result });
    } catch (error) {
        // Алдаа гарвал консолд хэвлэнэ
        console.error('Get clients  error:', error);

        // Хэрэглэгчид серверийн алдааны хариу илгээнэ
        res.status(500).json({ message: 'Server error' });
    }
};

// Эдгээр функцуудыг модулиас экспортлох
module.exports = {
    createClient,   // Шинэ клиент үүсгэх функц
    getAllClients   // Бүх клиентүүдийг авах функц
};
