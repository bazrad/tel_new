// Sequelize болон бусад сангуудыг импортлох
const { Sequelize } = require('sequelize'); // Sequelize ORM-ийн үндсэн ангийг ашиглах
const fs = require('fs'); // Файлын системтэй ажиллах сан
const path = require('path'); // Замын зохицуулалтын сан

// Өгөгдлийн сангийн тохиргоог JSON объектод тодорхойлох
const config = {
    DB_USER: "bazrad", // Өгөгдлийн сангийн хэрэглэгчийн нэр
    DB_PASSWORD: "1234", // Хэрэглэгчийн нууц үг
    DB_SERVER: "NRP-BAZRAD0210", // Серверийн нэр эсвэл IP хаяг
    DB_DATABASE: "telephone", // Өгөгдлийн сангийн нэрY
    DB_PORT: 1433, // MS SQL-д зориулсан портын дугаар
    DB_INSTANCE_NAME: "SQLEXPRESS" // Инстансын нэр
};

// Тохиргоог хэвлэх (зөв ажиллаж байгаа эсэхийг шалгах)
console.log(config);

// Sequelize-ийн шинэ жишээ үүсгэх
const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
    host: String(config.DB_SERVER), // Серверийн хаягийг тохируулах
    dialect: 'mssql', // MS SQL Server ашиглахыг заана
    dialectOptions: {
        options: {
            encrypt: true, // Холболтод шифрлэлтийг ашиглах (Azure-д заавал шаардлагатай)
            trustServerCertificate: true, // Зөвхөн хөгжүүлэлтийн орчинд ашиглах
        },
    },
    logging: false, // SQL логийг консолд харагдуулахгүй
});

// Өгөгдлийн сантай холбогдохыг шалгах
(async () => {
    try {
        await sequelize.authenticate(); // Холболтыг баталгаажуулах
        console.log('Connection to MSSQL has been established successfully.'); // Амжилттай холбогдсон бол
    } catch (error) {
        console.error('Unable to connect to the database:', error); // Алдаа гарвал мэдээлэх
    }
})();

// Бүх модел болон Sequelize жишээг хадгалах объект үүсгэх
const db = {}; // Модел болон Sequelize жишээг нэгтгэх объект
const models = []; // Модель файлуудыг хадгалах массив

// "model" фолдер доторх бүх `.js` файлуудыг унших
fs.readdirSync(path.join(__dirname, 'model')).forEach(file => {
    if (file.endsWith('.js')) { // Зөвхөн `.js` өргөтгөлтэй файлуудыг авах
        models.push(require(path.join(__dirname, 'model', file))); // Модель файлуудыг импортлох
    }
});

// Модель бүрийг Sequelize-тэй холбох
models.forEach((model) => {
    const seqModel = model(sequelize, Sequelize); // Модель үүсгэх
    db[seqModel.name] = seqModel; // Моделийн нэрээр `db` объектод хадгалах
});

// Sequelize жишээг `db` объектод нэмэх
// Энэ нь бусад хэсэгт ашиглахад хялбар болгодог
db.sequelize = sequelize; // Sequelize холболтын жишээ
db.Sequelize = Sequelize; // Sequelize-н үндсэн API

// `db` объектод бүх модел болон Sequelize-г нэгтгэж экспортлох
module.exports = db;
