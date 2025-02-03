// Дуудлагуудыг авах функц
const getCalls = async (req, res) => {
    try {
        // Клиентээс ирсэн хүсэлтийн өгөгдлийг консолд хэвлэнэ
        console.log('Get calls request:', req.body);

        // Бүх дуудлагын мэдээллийг ачаалах
        console.log('Getting all calls');

        // Sequelize ашиглан "call" хүснэгтээс бүх бичлэгийг ачаална
        const result = await req.db.call.findAll({
        });

        // Амжилттай бол ачаалсан өгөгдлийг хэрэглэгчид илгээнэ
        res.status(200).send({ data: result });
    } catch (error) {
        // Алдаа гарсан тохиолдолд консолд хэвлэнэ
        console.error('Get calls error:', error);

        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};



// Шинэ дуудлага үүсгэх функц
const createCall = async (req, res) => {
    try {
        // Хүсэлтийн биенээс өгөгдлийг салгаж авна
        const { caller, called, duration, start, end, incomingTrunk, outgoingTrunk, linkNumber, bearerServices } = req.body;

        // Клиентээс ирсэн хүсэлтийг консолд хэвлэнэ
        // console.log('Create call request:', req.body);

        if (!start || !end) {
            return res.status(400).json({ message: 'duration_start and duration_end cannot be null' });
        }

        // "call" хүснэгтэд шинэ дуудлагын бичлэг үүсгэнэ
        const createdCall = await req.db.call.create({
            caller: caller,                        // Эхлэгч дугаар
            called: called,                        // Хүлээн авагч дугаар
            duration: duration,                    // Дуудлагын нийт хугацаа
            duration_start: start,        // Дуудлагын эхлэх хугацаа
            duration_end: end,            // Дуудлагын дуусах хугацаа
            incomingTrunk: incomingTrunk,          // Орох утас
            outgoingTrunk: outgoingTrunk,          // Гарах утас
            linkNumber: linkNumber,                // Холбогдох дугаар
            bearerServices: bearerServices         // Үйлчилгээг хангах
        });
        console.log(`createdCall`, createdCall);
        // Амжилттай бол үүсгэсэн дуудлагын өгөгдлийг хэрэглэгчид илгээнэ
        res.json({ done: true, data: createdCall });
    } catch (error) {

        // Алдаа гарсан тохиолдолд консолд хэвлэнэ
        console.error('Create call error:', error);

        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};

// Олон дуудлага үүсгэх функц
const createCallBulk = async (req, res) => {
    try {
        // Хүсэлтийн биенээс өгөгдлийг салгаж авна
        const { calls } = req.body; // Олон дуудлагын мэдээлэл

        // Өгөгдлийн сан руу олон дуудлагын мэдээллийг нэгэн зэрэг оруулах
        const createdCalls = await req.db.call.bulkCreate(
            calls.map(call => ({
                caller: call.caller,
                called: call.called,
                duration: call.duration,
                duration_start: call.duration_start,
                duration_end: call.duration_end,
                incomingTrunk: call.incomingTrunk,
                outgoingTrunk: call.outgoingTrunk,
                linkNumber: call.linkNumber,
                bearerServices: call.bearerServices
            }))
        );

        // Амжилттай бол үүсгэсэн дуудлагын өгөгдлийг хэрэглэгчид илгээнэ
        res.json({ done: true, data: createdCalls });
    } catch (error) {
        // Алдаа гарсан тохиолдолд консолд хэвлэнэ
        console.error('Create calls bulk error:', error);

        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};

// Дуудлага устгах функц
const deleteCall = async (req, res) => {
    try {
        const { id } = req.params;

        // Клиентээс ирсэн хүсэлтийг консолд хэвлэнэ
        console.log('Delete call request:', id);

        // "call" хүснэгтээс дуудлагыг устгана
        const result = await req.db.call.destroy({ where: { id } });

        if (result) {
            res.json({ done: true, message: 'Call deleted successfully' });
        } else {
            res.status(404).json({ message: 'Call not found' });
        }
    } catch (error) {
        // Алдаа гарсан тохиолдолд консолд хэвлэнэ
        console.error('Delete call error:', error);

        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};

// Эдгээр функцуудыг модулиас экспортлох
module.exports = {
    getCalls,       // Бүх дуудлагыг авах функц
    createCall,     // Шинэ дуудлага үүсгэх функц
    createCallBulk, // Олон дуудлага үүсгэх функц
    deleteCall      // Дуудлага устгах функц
};
