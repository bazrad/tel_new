const calculateTariff = async (req, res) => {
    try {
        let speechTime
        let cost
        switch (expression) {
            case 'UBTZinCity':
                cost = 10
                break;
            case 'UBTZoutCity':
                cost = 30
                break;
            case 'otherInCity':
                cost = 25
            case 'otherOutCity':
                cost = 60
            case 'mobileInCity': const calculateTariff = async (req, res) => {
                try {
                    const { expression, speechTime } = req.body; // Клиентээс дамжуулсан өгөгдлийг авах
                    let cost = 0; // Анхны зардлын утга

                    switch (expression) {
                        case 'UBTZinCity':
                            cost = 10;
                            break;
                        case 'UBTZoutCity':
                            cost = 30;
                            break;
                        case 'otherInCity':
                            cost = 25;
                            break;
                        case 'otherOutCity':
                        case 'mobileInCity':
                        case 'mobileOutCity':
                            cost = 60;
                            break;
                        default:
                            return res.status(400).json({ message: 'Invalid expression' }); // Буруу утга дамжуулсан үед
                    }

                    // `speechTime`-ийн утгаас хамаарч зардлыг тооцоолох
                    if (speechTime) {
                        if (speechTime > 5 && speechTime < 60) {
                            cost = 60;
                        } else if (speechTime < 5) {
                            cost = 0;
                        }
                    }

                    // Үр дүнг илгээх
                    res.status(200).json({ cost });
                } catch (error) {
                    console.error('Error calculating tariff:', error);
                    res.status(500).json({ message: 'Server error' });
                }
            };

                cost = 60
            case 'mobileOutCity':
                cost = 60

                if (speechTime > 5 && speechTime < 60) {
                    cost = 60
                } else if (speechTime < 5) {
                    cost = 0
                }

        }
    } catch (error) {
        console.error('Error getting stations:', error);
        res.status(500).json({ message: 'Server error' });
    }
};