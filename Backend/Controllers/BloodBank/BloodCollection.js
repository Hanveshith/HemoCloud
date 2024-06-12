const {Requests,BloodCollection} = require('../../Models/BloodCollection');
const {Op} = require('sequelize');

const createBloodCollection = async (req, res) => {
    try {
        const {bloodBankId, group, totalquantity} = req.body;
        const bloodCollection = await BloodCollection.create({
            bloodBankId,
            group,
            totalquantity,
            bestBefore
        });

        res.status(201).json(bloodCollection);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const fetchBloodCollection = async (req, res) => {
    try {
        const {bloodBankId} = req.body;
        const bloodCollection = await BloodCollection.findAll({
            where: {
                bloodBankId,
                bestBefore: {
                    [Op.gt]: new Date().toISOString()
                },
                totalquantity: {
                    [Op.gt]: 0
                }
            }
        });
        if(!bloodCollection) {
            res.status(404).json({error: 'Blood Collection not found'});
            return;
        }
        res.status(200).json(bloodCollection);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateBloodCollection = async (req, res) => {
    try {
        const {bloodBankId, group, totalquantity,bestBefore} = req.body;
        const bloodCollection = await BloodCollection.update({
            totalquantity,
            bestBefore
        },{
            where: {
                bloodBankId,
                group
            }
        });

        res.status(201).json(bloodCollection);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteBloodCollection = async (req, res) => {
    try {
        const {bloodBankId, group} = req.body;
        const bloodCollection = await BloodCollection.destroy({
            where: {
                bloodBankId,
                group
            }
        });
        if(!bloodCollection) {
            res.status(404).json({error: 'Blood Collection not found'});
            return;
        }
        res.status(200).json(bloodCollection);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    createBloodCollection,
    fetchBloodCollection,
    updateBloodCollection,
    deleteBloodCollection
};