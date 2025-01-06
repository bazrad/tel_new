
const makePayment = async (req, res) => {
    console.log('Make payment request:', req.body);
    let connection;
    try {
        const { phoneNumber, amount } = req.body;

        const result = await req.db.Payments.create({
            phoneNumber: phoneNumber,
            amount: amount,
            paymentDate: new Date()
        })

        res.json({ message: 'Payment successful' });
    } catch (error) {
        console.error('Make payment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPaymentHistory = async (req, res) => {
    let connection;
    try {
        const result = await req.db.Payments.findAll();

        res.json(result);
    } catch (error) {
        console.error('Get payment history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    makePayment,
    getPaymentHistory
};