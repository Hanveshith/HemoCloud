const {Request} = require('../../models');

const fetchBloodRequests = async (req, res) => {
    try {
        const {id} = req.params;
        const requests = await Request.findAll({
            where: {
                userId: id,
            }
        });
        res.status(200).json(requests);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

module.exports = {fetchBloodRequests};