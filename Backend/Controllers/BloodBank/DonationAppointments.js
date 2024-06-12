const {DonatingAppointment} = require('../../models/bloodbank')
const {Op} = require('sequelize');


const fetchDonatingAppointments = async (req, res) => {
    try{
        const {bloodBankId} = req.body;
        const donatingAppointments = await DonatingAppointment.findAll({
            where: {
                bloodBankId,
                status: false,
                datetime: {
                    [Op.eq]: new Date().toISOString()
                }
            }
        });
        if(!donatingAppointments){
            res.status(404).json({error: 'Donating Appointments not found'});
            return;
        }
        res.status(200).json(donatingAppointments);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};


const acceptDonatingAppointment = async (req, res) => {
    try{
        const {donationAppointmentId} = req.body;
        const donatingAppointment = await DonatingAppointment.update({
            status: true
        },{
            where: {
                donationAppointmentId
            }
        });
        res.status(201).json(donatingAppointment);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

module.exports = {fetchDonatingAppointments,acceptDonatingAppointment};