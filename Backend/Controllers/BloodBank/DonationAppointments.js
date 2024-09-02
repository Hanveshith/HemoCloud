const {DonatingAppointment} = require('../../models')
const {Op} = require('sequelize');


const fetchDonatingAppointments = async (req, res) => {
    try{
        const {bloodBankId} = req.body;
        console.log(bloodBankId);
        const donatingAppointments = await DonatingAppointment.findAll({
            where: {
                bloodBankId,
                status: false,
                dateTime: {
                    [Op.gte]: new Date().toISOString() 
                }
            }
        });
        if (!donatingAppointments || donatingAppointments.length === 0) { 
            res.status(404).json({ error: 'Donating Appointments not found' });
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
        const {id,donorId} = req.body;
        const donatingAppointment = await DonatingAppointment.update({
            status: true
        },{
            where: {
                id,
                donorId
            }
        });
        res.status(201).json(donatingAppointment);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

module.exports = {fetchDonatingAppointments,acceptDonatingAppointment};