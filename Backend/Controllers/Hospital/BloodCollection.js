const {BloodCollection,Requests} = require('../../Models/BloodCollection');

const createBloodCollection = async (req, res) => {
    try {
        const {hospitalId, group, totalquantity} = req.body;
        const bloodCollection = await BloodCollection.create({
            hospitalId,
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
        const {hospitalId} = req.body;
        const bloodCollection = await BloodCollection.findAll({
            where: {
                hospitalId,
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
        const {hospitalId, group, totalquantity,bestBefore} = req.body;
        const bloodCollection = await BloodCollection.update({
            totalquantity,
            bestBefore
        },{
            where: {
                hospitalId,
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
        const {hospitalId, group} = req.body;
        const bloodCollection = await BloodCollection.destroy({
            where: {
                hospitalId,
                group
            }
        });
        if(!bloodCollection) {
            res.status(404).json({error: 'Blood Collection not found'});
            return;
        }
        res.status(201).json(bloodCollection);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};


module.exports = {createBloodCollection,fetchBloodCollection,updateBloodCollection,deleteBloodCollection};