const {User} = require('../../models');

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(email, password)
        const user = await User.findOne({
            where: {
                email,
                password
            }
        })
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(400).json({error: "Invalid email or password"});
        }
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {login};