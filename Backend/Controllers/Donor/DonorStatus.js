const {Donor,Donation} = require('../../models');

const fetchDonorStatus = async (req, res) => {
    try {
        const {userId} = req.body;
        const donor = await Donor.findOne({
            where: {
                userId,
                status: true
            }
        });
        if(!donor) {
            res.status(404).json({error: 'Donor not found'});
            return;
        }
        res.status(200).json(donor);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};


const previousDonations = async(req,res) => {
    try{
        const {donorId} = req.body;
        const donations = await Donation.findAll({
            where: {
                donorId,
                status: true
            }
        });
        res.status(200).json(donations);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}


module.exports = {fetchDonorStatus};