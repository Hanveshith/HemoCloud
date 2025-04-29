
const {Donation,DonatingAppointment,BloodCollection} = require('../../models');



const approvedonation = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(id);
        const donation = await DonatingAppointment.update(
            {approved: true},
            {where: {id}}
        );
        console.log(donation);
        res.status(200).json({message: "Donation Approved"});
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

const createDonation = async (req, res) => {
    try {
        const {id,donorId, bloodBankId, quantity,bloodGroup} = req.body;
        const donation = await Donation.create({
            group: bloodGroup,
            donorId,
            bloodBankId,
            dateTime: new Date(),
            quantity
        });
        await DonatingAppointment.update(
            {status: true},
            {where: {id, status: false}}
        );
        const bloodcollection = await BloodCollection.findOne({
            where: {
                bloodBankId,
                group: bloodGroup,
            }
        });
        await BloodCollection.update({
            totalQuantity: bloodcollection.totalQuantity + quantity
        },{
            where: {
                bloodBankId,
                group: bloodGroup,
            }
        });
        res.status(201).json(donation);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {createDonation, approvedonation};