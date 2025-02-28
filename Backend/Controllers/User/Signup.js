
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
        let user;
        if(handle == "bank"){
            const {Name, address, phone, latitude, longitude} = req.body;
            const bloodBank = await BloodBank.create({
                Name,
                Address: address,
                phone,
                latitude,
                Longitude: longitude,
                password: passwordHash
            });
            user = bloodBank;
        }
        else{
            user = await User.create({
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
        }
        console.log(user);
        const token = jwt.sign({ user: user.id, type: handle }, "kjnasjnnjsanhfhakaosihvihaabvnhunakwsncaksnnedfev");

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).send();

        //res.status(201).json(user);
    }
    catch (error) {
        console.log(error)
        res.status(400).json({error: error.message});
    }
};

module.exports = {signup};