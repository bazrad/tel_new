// Route дээр бичигдсэн үйлдлийг ажиллуулах үйлдлийн функцуудыг энд бичнэ.


const createNrp = async (req, res) => {
    console.log('Create NRP request:', req.body);
    let connection;
    try {
        const { id, name, age } = req.body;
        const result = await req.db.Nrps.create({
            id: id,
            name: name,
            age: age
        });
        res.json({ message: 'NRP created successfully' });
    }
    catch (error) {
        console.error('Create NRP error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}





const getAllNrps = async (req, res) => {
    let connection;
    try {
        const result = await req.db.Nrps.findAll();
        res.json(result);
    }
    catch (error) {
        console.error('Get all NRPs error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    createNrp,
    getAllNrps
};

