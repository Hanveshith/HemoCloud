const {Donor} = require('../../models');
const {User} = require('../../models');

const acceptUserAsDonor = async (req, res) => {
    try {
        const {id} = req.params;
        const donor = await Donor.update({
            status: true
        },{
            where: {
                id
            }
        });
        if(!donor) {
            res.status(404).json({error: 'Donor not found'});
            return;
        }
        
        const updatedDonor = await Donor.findOne({
            where: {
            id
            }
        });

        await User.update({
            donorStatus: true
        },{
            where: {
            id: updatedDonor.userId
            }
        });
        res.status(200).json(donor);
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
        let donorsData = [];
        for(let i=0; i<donors.length; i++) {
            const donor = await User.findOne({
                where: {
                    id: donors[i].userId
                },
                attributes: ['firstName', 'lastName', 'email', 'phone','sex','bloodGroup']
            });

            donorsData.push({id: donors[i].id, donor});
        }
        res.status(200).json(donorsData);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {acceptUserAsDonor, fetchDonorsToAccept};