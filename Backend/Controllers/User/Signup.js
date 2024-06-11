
const {User} = require('../../models');

const signup = async (req, res) => {
    try {
        const {firstName, lastName, sex, bloodGroup, dateOfBirth, phone, address, photoURL, validProofURL, donorStatus, email, password, role} = req.body;
        const user = await User.create({
            firstName,
            lastName,
            sex,
            bloodGroup,
            dateOfBirth,
            phone,
            address,
            photoURL,
            validProofURL,
            donorStatus,
            email,
            password,
            role
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {signup};