
const {Donation} = require('../../models');

const createDonation = async (req, res) => {
    try {
        const {donorId, bloodBankId, datetime, quatity} = req.body;
        const donation = await Donation.create({
            donorId,
            bloodBankId,
            datetime,
            quatity
        });
        res.status(201).json(donation);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {createDonation};