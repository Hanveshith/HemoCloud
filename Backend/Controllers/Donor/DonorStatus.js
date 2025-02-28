const {Donor,Donation} = require('../../models');

const fetchDonorStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const donor = await Donor.findOne({
            where: {
                userId: id,
                status: true
            }
        });
        if(!donor) {
            res.send({status: 404, message: "Donor not found"});
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