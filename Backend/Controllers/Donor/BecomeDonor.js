
const {Donor} = require('../../models');

const becomeDonor = async (req, res) => {
    try {
        const {userId, bloodBankId} = req.body;
        const donor = await Donor.create({
            userId,
            bloodBankId,
            status: false
        });
        res.status(201).json(donor);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {becomeDonor};