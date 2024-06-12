const {Requests} = require('../../Models/Requests');

const fetchBloodRequests = async (req, res) => {
    try {
        const {hospitalId} = req.body;
        const requests = await Requests.findAll({
            where: {
                hospitalId,
                status: false,
                rejected: false,
                date: new Date().toISOString().split('T')[0]
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
        const {hospitalId, requestId} = req.body;
        const request = await Requests.update({
            status: true
        },{
            where: {
                hospitalId,
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
        const {hospitalId, requestId} = req.body;
        const request = await Requests.update({
            rejected: true
        },{
            where: {
                hospitalId,
                requestId
            }
        });
        res.status(201).json(request);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

