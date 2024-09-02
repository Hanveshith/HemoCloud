
const { where } = require('sequelize');
const {User} = require('../../models');
const {BloodBank} = require('../../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        // validation
        const handle = req.params.handle;
        console.log(req.body)
        const existingUser = handle == "bank" ?
            await BloodBank.findOne({where: { phone: req.body.phone }}) :
            await User.findOne ({where: { phone: req.body.phone }});
        if (existingUser)
            return res.status(400).json({
            errorMessage: "An account with this email already exists.",
        });


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        

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
            donorStatus: false,
            email,
            password: passwordHash,
            role
        });
        const token = jwt.sign({ user: user._id, type: handle }, "kjnasjnnjsanhfhakaosihvihaabvnhunakwsncaksnnedfev");

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).send();

        // res.status(201).json(user);
    }
    catch (error) {
        console.log(error)
        res.status(400).json({error: error.message});
    }
};

module.exports = {signup};