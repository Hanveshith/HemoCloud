const {BloodBank} = require('../../models');

const addBloodBank = async (req, res) => {
    try {
        const {Name, Address, phone, latitude, Longitude} = req.body;
        const bloodBank = await BloodBank.create({
            Name,
            Address,
            phone,
            latitude,
            Longitude
        });
        res.status(201).json(bloodBank);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {addBloodBank};