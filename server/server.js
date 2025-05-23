// Шаардлагатай сангуудыг импортлох
const express = require('express'); // Express.js вэб сервер
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing)-ийг зохицуулах
const dotenv = require('dotenv'); // Орчны хувьсагчдыг тохируулах
const injectDB = require('./middleware/injectDB'); // Өгөгдлийн сангийн холболтыг middleware-д оруулах
const db = require('./seq_db'); // Sequelize-ийн өгөгдлийн сангийн тохиргоо
const colors = require('colors'); // Терминалд өнгө өгөх

const fs = require('fs'); // Файл унших, бичих
const path = require('path'); // Замын файлын замыг тохируулах
const rfs = require('rotating-file-stream'); // Лог файлыг өөрчлөх
const morgan = require('morgan'); // HTTP запросын логуудыг харуулах
const logger = require('./middleware/logger'); // Логуудыг харуулах middleware


console.log("Сервер аслаа !!! ".green); // Терминалд өнгө өгөх



dotenv.config(); // Орчны хувьсагчдыг `.env` файлд тохируулах

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
});

const app = express(); // Express сервер үүсгэх

// Middleware ашиглах
app.use(logger); // Логуудыг харуулах
app.use(morgan('combined', { stream: accessLogStream })); // HTTP запросын логуудыг харуулах
app.use(cors()); // CORS-г зөвшөөрөх
app.use(express.json()); // JSON хэлбэрийн өгөгдлийг боловсруулах
app.use(injectDB(db));  // Sequelize MSSQL холбогдсон өгөгдлийн санг middleware-д нэмэх


// Замуудыг тохируулах
app.use('/api/payment', require('./routes/paymentRoutes')); // Төлбөртэй холбоотой маршрут
app.use('/api/client', require('./routes/clientRoutes')); // Харилцагчтай холбоотой маршрут
app.use('/api/call', require('./routes/callRoutes')); // Дуудлагатай холбоотой маршрут
app.use('/api/station', require('./routes/stationRoutes')); // Станцтай холбоотой маршрут
app.use('/api/worker', require('./routes/workerRoutes')); // Ажилчидтай холбоотой маршрут
app.use('/api/location', require('./routes/locationRoutes')); // Байршилтай холбоотой маршрут
app.use('/api/tariff', require('./routes/tariffRoutes')); // Тариффтай холбоотой маршрут

// Серверийн портын тохиргоо
const PORT = process.env.PORT || 5000; // Орчны хувьсагч эсвэл анхдагч 5000 порт

// Серверийг сонсгох
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.cyan); // Сервер амжилттай ажилласан мессеж
});

// Sequelize загваруудыг өгөгдлийн сантай синхрончлох
// Энэ нь өгөгдлийн сангийн хүснэгтүүдийг автоматаар үүсгэнэ эсвэл шинэчилнэ

// Sequelize sync-г ажиллуулах
// Үр дүнг шалгаж консолд хэвлэх
db.sequelize.sync()
    .then(async (result) => {
        console.log('SYNC ...'); // Синк хийгдсэн тухай мэдээлэл
    })
    .catch((err) => console.log(err)); // Синк хийх үед гарсан алдааг хэвлэх

// Sequelize холбоосуудыг тодорхойлох
// "call" хүснэгт "phone" хүснэгттэй холбоотой байх
// "number_id_in" болон "number_id_out" гадаад түлхүүр ашиглах
// db.call.belongsTo(db.phone, { foreignKey: 'number_id_in', as: 'number_in' });
// db.call.belongsTo(db.phone, { foreignKey: 'number_id_out', as: 'number_out' });

// "client" болон "phone" хүснэгтүүдийн хооронд олон-олон харьцааг тодорхойлох
// "client_phone" дамжуулагч хүснэгт ашиглах
db.client.belongsToMany(db.phone, { through: db.client_phone, foreignKey: 'client_id' });
db.phone.belongsToMany(db.client, { through: db.client_phone, foreignKey: 'phone_id' });

// Програмыг хаах үед өгөгдлийн сангийн холболтыг зохистой хаах
//process.on('SIGINT', async () => {
//     try {
//         const pool = await getConnection(); // Холболтын санг авах
//         await pool.close(); // Холболтын санг хаах
//         console.log('Database pool closed.'); // Амжилттай хаагдсан тухай хэвлэх
//         process.exit(0); // Серверийг зогсоох
//     } catch (err) {
//         console.error('Error closing database pool:', err); // Алдаа гарсан тохиолдолд хэвлэх
//         process.exit(1); // Алдаатай зогсоох
//     }
// });
