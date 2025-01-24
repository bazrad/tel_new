// Байршил үүсгэх функц
const createLocation = async (req, res) => {
    console.log('Create location request:', req.body);
    try {
        const { name } = req.body;

        const client = await req.db.location.create({
            name: name.trim(),
            // Default client type
        });


        res.json({ message: 'Location successfully created', client });
    } catch (error) {
        console.error('Create client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Бүх байршилыг авах функц
const getsLocation = async (req, res) => {
    try {
        const locations = await req.db.location.findAll();

        res.status(200).json({ data: locations });
    } catch (error) {
        console.error('Get all locations error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Модулиас функцуудыг экспортлох
module.exports = {
    createLocation,
    getsLocation,
};
