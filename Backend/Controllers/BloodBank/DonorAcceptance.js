const {Donor} = require('../../models');

const acceptUserAsDonor = async (req, res) => {
    try {
        const {donorId} = req.body;
        const donor = await Donor.update({
            status: true
        },{
            where: {
                donorId
            }
        });
        res.status(201).json(donor);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {acceptUserAsDonor};