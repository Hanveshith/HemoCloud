const {Donor} = require('../../models');

const acceptUserAsDonor = async (req, res) => {
    try {
        const {userId} = req.body;
        const donor = await Donor.update({
            status: true
        },{
            where: {
                userId
            }
        });
        res.status(201).json(donor);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const fetchDonorsToAccept = async (req, res) => {
    try {
        const donors = await Donor.findAll({
            where: {
                status: false
            }
        });
        if(!donors) {
            res.status(404).json({error: 'Donors not found'});
            return;
        }
        res.status(200).json(donors);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {acceptUserAsDonor, fetchDonorsToAccept};