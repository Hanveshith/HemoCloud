
const {DonationAppointment} = require('../../models');

const createDonationAppointment = async (req, res) => {
    try {
        const {donorId, bloodBankId, datetime, quatity} = req.body;
        const donationAppointment = await DonationAppointment.create({
            donorId,
            bloodBankId,
            datetime,
            quatity,
            status: false
        });
        res.status(201).json(donationAppointment);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const fetchDonationAppointment = async (req, res) => {
    try {
        const {donorId} = req.body;
        const donationAppointment = await DonationAppointment.findOne({
            where: {
                donorId,
                status: false
            }
        });
        if(!donationAppointment) {
            res.status(404).json({error: 'Donation Appointment not found'});
            return;
        }
        res.status(200).json(donationAppointment);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {createDonationAppointment};