
const {BloodCollection} = require('../../models');

const {Op} = require('sequelize');

const createBloodCollection = async (req, res) => {
    try {
        const {bloodBankId, group, totalQuantity,bestbefore} = req.body;
        const bloodCollection = await BloodCollection.create({
            bloodBankId,
            group,
            totalQuantity,
            bestbefore
        });

        res.status(201).json(bloodCollection);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const fetchBloodCollection = async (req, res) => {
    try {
        const {id} = req.params;
        const bloodCollection = await BloodCollection.findAll({
            where: {
                bloodBankId: id,
                bestbefore: {
                    [Op.gt]: new Date().toISOString()
                },
                totalQuantity: {
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
        const {bloodBankId, group, totalQuantity,bestbefore} = req.body;
        const {id} = req.params;
        const bloodCollection = await BloodCollection.update({
            totalQuantity,
            bestbefore
        },{
            where: {
                bloodBankId,
                group,
                id
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
        const {id} = req.params;
        const bloodCollection = await BloodCollection.destroy({
            where: {
                id
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