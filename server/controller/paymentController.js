// Төлбөр хийх функц
const makePayment = async (req, res) => {
    // Клиентээс ирсэн хүсэлтийн өгөгдлийг консолд хэвлэнэ
    console.log('Make payment request:', req.body);

    let connection; // Өгөгдлийн сангийн холболт (хэрэглэгдээгүй)
    try {
        // Хүсэлтийн биенээс phoneNumber болон amount утгыг салгаж авна
        const { phoneNumber, amount } = req.body;

        // "Payments" хүснэгтэд шинэ төлбөрийн мэдээллийг оруулна
        const result = await req.db.Payments.create({
            phoneNumber: phoneNumber,  // Төлбөр хийсэн утасны дугаар
            amount: amount,            // Төлбөрийн дүн
            paymentDate: new Date()    // Төлбөр хийгдсэн огноо
        });

        // Амжилттай хариу буцаана
        res.json({ message: 'Payment successful' });
    } catch (error) {
        // Алдаа гарвал алдааны мэдээллийг консолд хэвлэнэ
        console.error('Make payment error:', error);

        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};

// Төлбөрийн түүх авах функц
const getPaymentHistory = async (req, res) => {
    let connection; // Өгөгдлийн сангийн холболт (хэрэглэгдээгүй)
    try {
        // "Payments" хүснэгтээс бүх төлбөрийн мэдээллийг ачаалж авна
        const result = await req.db.Payments.findAll();
        // Ачаалсан өгөгдлийг хэрэглэгчид илгээнэ
        res.json(result);
    } catch (error) {
        // Алдаа гарвал алдааны мэдээллийг консолд хэвлэнэ
        console.error('Get payment history error:', error);
        // Хэрэглэгчид серверийн алдааны хариу буцаана
        res.status(500).json({ message: 'Server error' });
    }
};

// Эдгээр функцуудыг модулиас экспортлох
module.exports = {
    makePayment,       // Төлбөр хийх функц
    getPaymentHistory  // Төлбөрийн түүх авах функц
};
