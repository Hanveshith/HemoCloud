
const { DataTypes } = require('sequelize');
const {DonatingAppointment} = require('../../models');

const { Donor } = require('../../models'); // Add this line to import the Donor model

const createDonationAppointment = async (req, res) => {
    try {
        const {donorId, bloodBankId, dateTime, quantity} = req.body;
        console.log(req.body);
        // Check if donor exists
        const donor = await Donor.findByPk(donorId);
        if (!donor) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        const donationAppointment = await DonatingAppointment.create({
            donorId,
            bloodBankId,
            dateTime,
            quantity,
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
        const {id} = req.params;
        const donationAppointment = await DonatingAppointment.findAll({
            where: {
                id,
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
        const donationAppointment = await DonatingAppointment.findOne({
            where: {
                donorId,
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
        const donationAppointment = await DonatingAppointment.destroy({
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
module.exports = {createDonationAppointment, DonationAppointments, LatestAppointment, CancelAppointment};