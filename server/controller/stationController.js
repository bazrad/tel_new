
const getStations = async (req, res) => {
    try {

        console.log('getting all stations')
        const result = await req.db.station.findAll();

        res.status(200).send({ data: result });
    } catch (error) {
        console.error('create client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createStation = async (req, res) => {
    try {


        const createdStation = await req.db.station.create(req.body);

        res.json({ done: true, data: createdStation });

    } catch (error) {
        console.error('Get clients  error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getStations,
    createStation
};