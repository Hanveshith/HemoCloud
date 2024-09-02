const {Request,BloodBank} = require('../../models')

const fetchBloodRequests = async (req, res) => {
    try {
        const bloodBankId = req.params.id;
        const requests = await Request.findAll({
            where: {
                bloodBankId,
                status: false,
                rejected: false,
                // date: new Date().toISOString().split('T')[0]
            }
        });
        if(!requests) {
            res.status(404).json({error: 'Requests not found'});
            return;
        }
        res.status(200).json(requests);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const acceptBloodRequest = async (req, res) => {
    try {
        const {bloodBankId, requestId} = req.body;
        const request = await Request.update({
            status: true
        },{
            where: {
                bloodBankId,
                requestId
            }
        });
        res.status(201).json(request);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const rejectBloodRequest = async (req, res) => {
    try {
        const {bloodBankId, requestId} = req.body;
        const request = await Request.update({
            rejected: true
        },{
            where: {
                bloodBankId,
                requestId
            }
        });
        res.status(201).json(request);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    fetchBloodRequests,
    acceptBloodRequest,
    rejectBloodRequest
};