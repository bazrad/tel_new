// Дуудлагуудыг авах функц
const getCalls = async (req, res) => {
    // Клиентээс ирсэн хүсэлтийн өгөгдлийг консолд хэвлэнэ
    console.log('create client request:', req.body);

    try {
        // Хүсэлтээс өгөгдлийг салгаж авна (хэрэглэгдээгүй боловч үлдээсэн байна)
        const { name, phone_number } = req.body;

        // Бүх дуудлагын мэдээллийг ачаалахыг оролдоно
        console.log('getting all calls');

        // Sequelize ашиглан "call" хүснэгтээс бүх бичлэгийг ачаална
        const result = await req.db.call.findAll({
            include: [
                { model: req.db.phone, as: 'number_in' }, // "number_in" холбоостой утасны мэдээллийг ачаална
                { model: req.db.phone, as: 'number_out' } // "number_out" холбоостой утасны мэдээллийг ачаална
            ]
        });

        // Амжилттай бол ачаалсан өгөгдлийг хэрэглэгчид илгээнэ
        res.status(200).send({ data: result });
    } catch (error) {
        // Алдаа гарсан тохиолдолд консолд хэвлэнэ
        console.error('create client error:', error);

        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};

// Шинэ дуудлага үүсгэх функц
const createCall = async (req, res) => {
    let connection; // Байж болзошгүй өгөгдлийн сангийн холболт (хэрэглэгдээгүй)

    try {
        // Хүсэлтийн биенээс өгөгдлийг салгаж авна
        const { phone1, phone2, start, end } = req.body;

        // Клиентээс ирсэн хүсэлтийг консолд хэвлэнэ
        console.log('create call request:', req.body);

        // "phone" хүснэгтэд phone1 дугаараар бичлэг үүсгэнэ
        const createdPhone1 = await req.db.phone.create({ phone_number: phone1 });

        // "phone" хүснэгтэд phone2 дугаараар бичлэг үүсгэнэ
        const createdPhone2 = await req.db.phone.create({ phone_number: phone2 });

        // "call" хүснэгтэд шинэ дуудлагын бичлэг үүсгэнэ
        const createdCall = await req.db.call.create({
            number_id_in: createdPhone1.id, // Эхлэгч дугаарын ID
            number_id_out: createdPhone2.id, // Хүлээн авагч дугаарын ID
            duration_start: start, // Дуудлагын эхлэх хугацаа
            duration_end: end, // Дуудлагын дуусах хугацаа
            calltype_id: 1 // Дуудлагын төрлийн ID (жишээ: 1)
        });

        // Амжилттай бол үүсгэсэн дуудлагын өгөгдлийг хэрэглэгчид илгээнэ
        res.json({ done: true, data: createdCall });
    } catch (error) {
        // Алдаа гарсан тохиолдолд консолд хэвлэнэ
        console.error('Get clients  error:', error);

        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};

// Олон дуудлага үүсгэх функц (одоогоор хэрэгжүүлэлт хийгдээгүй)
const createCallBulk = async (req, res) => {
    let connection; // Өгөгдлийн сангийн холболт

    try {
        // Өгөгдлийн сангийн холболт үүсгэхийг оролдоно
        connection = await connectDB();

        // Одоогоор зөвхөн амжилтын хариу буцаана
        res.json({ done: true });
    } catch (error) {
        // Алдаа гарсан тохиолдолд консолд хэвлэнэ
        console.error('Get clients  error:', error);

        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};

// Эдгээр функцуудыг модулиас экспортлох
module.exports = {
    getCalls,       // Бүх дуудлагыг авах функц
    createCall,     // Шинэ дуудлага үүсгэх функц
    createCallBulk  // Олон дуудлага үүсгэх функц (одоогоор хоосон)
};
