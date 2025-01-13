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
        console.error('Error getting stations:', error);

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
        console.error('Error creating station:', error);

        // Хэрэглэгчид серверийн алдааны хариу илгээнэ
        res.status(500).json({ message: 'Server error' });
    }
};

// Станц засварлах функц
const updateStation = async (req, res) => {
    console.log('Update station request:', req.body);
    try {
        const { id } = req.params; // Станцын ID-г хүсэлтийн параметрээс авна

        const [updatedRows, updatedStation] = await req.db.station.update(req.body, {
            where: { id },
            returning: true,
        });

        if (updatedRows > 0) {
            res.json({ done: true, data: updatedStation[0] }); // Шинэчлэгдсэн өгөгдлийг илгээнэ
        } else {
            res.status(404).json({ message: 'Station not found' }); // Станц олдоогүй тохиолдолд
        }
    } catch (error) {
        console.error('Error updating station:', error); // Алдааны мэдээллийг консолд хэвлэнэ
        res.status(500).json({ message: 'Server error' }); // Серверийн алдааны хариу илгээнэ
    }
};



// Станц устгах функц
const deleteStation = async (req, res) => {
    console.log('Delete station request:', req.params.id);
    try {
        const { id } = req.params; // Станцын ID-г хүсэлтийн параметрээс авна

        const deleted = await req.db.station.destroy({ where: { id } }); // Станцыг устгах үйлдэл

        if (deleted) {
            res.json({ done: true, message: 'Station deleted successfully' }); // Амжилттай устгасан хариу
        } else {
            res.status(404).json({ message: 'Station not found' }); // Станц олдоогүй хариу
        }
    } catch (error) {
        console.error('Error deleting station:', error); // Алдааны мэдээллийг консолд хэвлэнэ
        res.status(500).json({ message: 'Server error' }); // Серверийн алдааны хариу илгээнэ
    }
};

// Эдгээр функцуудыг модулиас экспортлох
module.exports = {
    getStations,    // Бүх станцуудыг авах функц
    createStation,  // Шинэ станц үүсгэх функц
    updateStation,  // Станц засварлах функц
    deleteStation   // Станц устгах функц
};
