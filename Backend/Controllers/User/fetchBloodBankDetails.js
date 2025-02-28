const {BloodBank} = require('../../models');

const fetchBloodBankDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const bloodBank = await BloodBank.findOne({
            where: {
                id
            },
            attributes: ['Name', 'Address', 'phone', 'latitude', 'Longitude']
        });
        if(!bloodBank) {
            res.status(404).json({error: 'Blood Bank not found'});
            return;
        }
        res.status(200).json(bloodBank);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {fetchBloodBankDetails};