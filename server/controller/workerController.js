// Нэвтрэх (login) функц
const login = async (req, res) => {
    try {
        // Консолд мэдээлэл хэвлэх: "Бүх станцуудыг авах үйлдэл эхэллээ"
        console.log('getting all stations');

        // `worker` хүснэгтээс `loginName` болон `password`-оор тохирох ажилтныг хайна
        const result = await req.db.worker.findOne({
            where: {
                loginName: req.body.username, // Клиентээс ирсэн хэрэглэгчийн нэр
                password: req.body.password  // Клиентээс ирсэн нууц үг
            }
        });
        if (!result) throw new Error('login name or pass wrong')
        const token = result.createToken(result.id, result.name);
        console.log(token)
        // Хайлт амжилттай бол ажилтны мэдээллийг хариу болгон илгээнэ
        res.status(200).send({ data: result, token });
    } catch (error) {
        // Алдаа гарвал алдааны мэдээллийг консолд хэвлэнэ
        console.error('create client error:', error);

        // Хэрэглэгчид серверийн алдааны хариу илгээнэ
        res.status(500).json({ message: 'Server error' });
    }
};

// Эдгээр функцуудыг модулиас экспортлох
module.exports = {
    login  // Нэвтрэх функц
};
