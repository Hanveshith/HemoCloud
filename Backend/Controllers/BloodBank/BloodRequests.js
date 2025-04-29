const {Request,BloodBank,BloodCollection,User} = require('../../models')

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
        const users = await User.findAll({
            where: {
                id: requests.map(request => request.userId)
            }
        }); 
        const data = requests.map(request => {
            const user = users.find(user => user.id === request.userId);
            const calculateAge = (dob) => {
                const birthDate = new Date(dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            };

            return {
                ...request.dataValues,
                userName: user ? user.firstName + " " + user.lastName : null,
                userPhone: user ? user.phone : null,
                userAge: user ? calculateAge(user.dateOfBirth) : null,
                userGender: user ? (user.sex === "M" ? "Male" : "Female") : null,
            };
        });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const acceptBloodRequest = async (req, res) => {
    try {
        const {bloodBankId, requestId,bloodGroup,units} = req.body;
        const bloodcollection = await BloodCollection.findOne({
            where: {
                bloodBankId,
                group: bloodGroup,
            }
        });
        console.log(bloodcollection);
        if(bloodcollection === null) {
            return res.status(404).json({error: 'Blood Group not available'});
        }
        else if (bloodcollection.totalQuantity < units) {
            return res.status(404).json({error: 'Not enough blood available'});
        }
        const request = await Request.update({
            status: true
        },{
            where: {
                id: requestId,
                bloodBankId,
                
            }
        });
        await BloodCollection.update({
            totalQuantity: bloodcollection.totalQuantity - units
        },{
            where: {
                bloodBankId,
                group: bloodGroup,
            }
        });
        if(!request) {
            res.status(404).json({error: 'Request not found'});
            return;
        }
        res.status(201).json(request);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const approveBloodRequest = async (req, res) => {
    try {
        const {bloodBankId, requestId} = req.body;
        const request = await Request.update({
            approved: true
        },{
            where: {
                id: requestId,
                bloodBankId,
            }
        });
        if(!request) {
            res.status(404).json({error: 'Request not found'});
            return;
        }
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
    fetchBloodRequests: fetchBloodRequests,
    acceptBloodRequest: acceptBloodRequest,
    rejectBloodRequest: rejectBloodRequest,
    approveBloodRequest: approveBloodRequest
};