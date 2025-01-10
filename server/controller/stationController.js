// Бүх станцуудыг авах функц
const getStations = async (req, res) => {
    try {
        // Консолд мэдээлэл хэвлэх: "Бүх станцуудыг авах үйлдэл эхэллээ"
        console.log('getting all stations');

        // "station" хүснэгтээс бүх станцуудыг ачаалж авна
        const result = await req.db.station.findAll();

        // Ачаалсан өгөгдлийг хэрэглэгчид амжилттай хариу байдлаар илгээнэ
        res.status(200).send({ data: result });
    } catch (error) {
        // Алдаа гарвал алдааны мэдээллийг консолд хэвлэнэ
        console.error('create client error:', error);

        // Хэрэглэгчид серверийн алдааны хариу илгээнэ
        res.status(500).json({ message: 'Server error' });
    }
};

// Шинэ станц үүсгэх функц
const createStation = async (req, res) => {
    try {
        // Хүсэлтийн биенээс өгөгдлийг ашиглан шинэ станц үүсгэнэ
        const createdStation = await req.db.station.create(req.body);

        // Амжилттай үүсгэсэн станцын өгөгдлийг хэрэглэгчид хариу илгээнэ
        res.json({ done: true, data: createdStation });
    } catch (error) {
        // Алдаа гарвал алдааны мэдээллийг консолд хэвлэнэ
        console.error('Get clients  error:', error);

        // Хэрэглэгчид серверийн алдааны хариу илгээнэ
        res.status(500).json({ message: 'Server error' });
    }
};

// Эдгээр функцуудыг модулиас экспортлох
module.exports = {
    getStations,    // Бүх станцуудыг авах функц
    createStation   // Шинэ станц үүсгэх функц
};
