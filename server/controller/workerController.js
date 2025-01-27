// Нэвтрэх (login) функц
const jwt = require('jsonwebtoken'); // Token үүсгэхэд ашиглах

const login = async (req, res) => {
    try {
        console.log('Нэвтрэх үйлдэл эхэллээ');

        // Клиентээс ирсэн өгөгдлийг шалгана
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Хэрэглэгчийн нэр болон нууц үг шаардлагатай.' });
        }

        // `worker` хүснэгтээс `loginName`-ээр тохирох ажилтныг хайна
        const worker = await req.db.worker.findOne({
            where: {
                loginName: username
            }
        });

        // Хэрэв ажилтан олдохгүй бол алдааны хариу илгээнэ
        if (!worker) {
            return res.status(401).json({ message: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.' });
        }

        // Нууц үгийг шалгана
        console.log(password, worker.password)
        // const isPasswordValid = await bcrypt.compare(password, worker.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.' });
        // }
        if (password != worker.password) return res.status(401).json({ message: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.' });
        // Token үүсгэнэ
        const token = jwt.sign(
            { id: worker.id, name: worker.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token хүчинтэй хугацаа: 1 цаг
        );

        console.log('Амжилттай нэвтэрсэн:', worker.name);

        // Амжилттай нэвтэрсэн хариу илгээнэ
        res.status(200).json({
            message: 'Амжилттай нэвтэрлээ.',
            data: {
                id: worker.id,
                name: worker.name,
                loginName: worker.loginName
            },
            token
        });
    } catch (error) {
        console.error('Нэвтрэх үед алдаа гарлаа:', error);
        res.status(500).json({ message: 'Серверийн алдаа гарлаа.' });
    }
};

// Эдгээр функцуудыг модулиас экспортлох
module.exports = {
    login
};