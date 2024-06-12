
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

const DonationAppointments = async (req, res) => {
    try {
        const {donorId,date} = req.body;
        const donationAppointment = await DonationAppointment.findAll({
            where: {
                donorId,
                datetime: date.toISOString().split('T')[0]
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

const LatestAppointment = async (req, res) => {
    try {
        const {donorId} = req.body;
        const donationAppointment = await DonationAppointment.findOne({
            where: {
                donorId,
                status: false
            },
            order: [['createdAt', 'DESC']]
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

const CancelAppointment = async (req, res) => {
    try {
        const {donorId, donationAppointmentId} = req.body;
        const donationAppointment = await DonationAppointment.destroy({
            where: {
                donorId,
                id: donationAppointmentId
            }
        });
        if(!donationAppointment) {
            res.status(404).json({error: 'Donation Appointment not found'});
            return;
        }
        res.status(200).json({message: 'Donation Appointment cancelled successfully'});
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};
module.exports = {createDonationAppointment};