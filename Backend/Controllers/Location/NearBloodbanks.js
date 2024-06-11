const { BloodBank } = require('../../models');

const nearBloodbanks = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        
        
        const earthRadiusKm = 6371;

       
        const bloodbanks = await BloodBank.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.literal(`
                            ${earthRadiusKm} * ACOS(
                                COS(RADIANS(:latitude)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(:longitude)) +
                                SIN(RADIANS(:latitude)) * SIN(RADIANS(latitude))
                            )
                        `),
                        'distance'
                    ]
                ]
            },
            having: Sequelize.literal('distance <= 10'),
            replacements: { latitude, longitude }
        });

        res.status(200).json(bloodbanks);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { nearBloodbanks };