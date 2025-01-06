
const login = async (req, res) => {
    try {

        console.log('getting all stations')
        const result = await req.db.worker.findOne({
            where: {
                loginName: req.body.username,
                password: req.body.password
            }
        });

        res.status(200).send({ data: result });
    } catch (error) {
        console.error('create client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    login
};