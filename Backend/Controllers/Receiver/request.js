
const {Request} = require('../../models');

const createRequest = async (req, res) => {
    try {
        const {userId, bloodBankId, hospitalId, group, quantity, date, currLocation_lat, currLocation_long, Hospital} = req.body;
        const request = await Request.create({
            userId,
            bloodBankId,
            hospitalId,
            group,
            quantity,
            date,
            currLocation_lat,
            currLocation_long,
            Hospital,
            status: false
        });
        res.status(201).json(request);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const recentRequest = async(req,res) => {
    try{
        const {userId} = req.body;
        const requests = await Request.findOne({
            where: {
                userId: userId
            },
            order: [['createdAt', 'DESC']]
        });
        if(!requests) {
            res.status(404).json({error: 'No Recent Requests found'});
            return;
        }
        res.status(200).json(requests);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

const requeststhroughdate = async(req,res) => {
    try{
        const {userId, date} = req.body;
        const requests = await Request.findAll({
            where: {
                userId: userId,
                date: date
            }
        });
        res.status(200).json(requests);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

const acceptedrequests = async(req,res) => {
    try{
        const {userId} = req.body;
        const requests = await Request.findAll({
            where: {
                userId: userId,
                status: true
            }
        });
        res.status(200).json(requests);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};
const rejectedrequests = async(req,res) => {
    try{
        const {userId} = req.body;
        const requests = await Request.findAll({
            where: {
                userId: userId,
                status: true
            }
        });
        res.status(200).json(requests);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};


module.exports = {createRequest};