const {Donor} = require('../../models');

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

module.exports = {fetchDonorStatus};