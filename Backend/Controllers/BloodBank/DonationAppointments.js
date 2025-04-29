const {DonatingAppointment,Donor,User} = require('../../models')
const {Op} = require('sequelize');


const fetchDonatingAppointments = async (req, res) => {
    try{
        const {id} = req.params;
        const donatingAppointments = await DonatingAppointment.findAll({
            where: {
                bloodBankId: id,
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
        const data = await Promise.all(donatingAppointments.map(async appointment => {
            const donor = await Donor.findOne({
                where: {
                    id: appointment.donorId
                },
                attributes: ['userId']
            });

            if (!donor) {
                return {
                    ...appointment.dataValues,
                    donorName: null,
                    donorAge: null
                };
            }

            const user = await User.findOne({
                where: {
                    id: donor.userId
                },
                attributes: ['firstName','lastName', 'dateOfBirth','sex','bloodGroup']
            });

            const calculateAge = (dob) => {
                const birthDate = new Date(dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            };

            return {
                ...appointment.dataValues,
                name: user ? user.firstName + " " + user.lastName : null,
                donorAge: user ? calculateAge(user.dateOfBirth) : null,
                donorGender: user ? user.sex : null,
                bloodGroup: user ? user.bloodGroup : null,
            };
        }));

        res.status(200).json(data);
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