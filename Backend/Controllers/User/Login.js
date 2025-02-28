const {User} = require('../../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {BloodBank} = require('../../models');

const login = async (req, res) => {
    try {
        const {phone, password} = req.body;
        console.log(req.body);
        const handle = req.params.handle;
        const existingUser = await (handle == "bank" ? BloodBank.findOne({ phone: phone }) : User.findOne({
            where: { phone: phone }
        }));
        
        console.log("existing",existingUser);
        if (!existingUser)
            return res.status(401).json({ errorMessage: "Wrong username or password." });
        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        console.log(existingUser,passwordCorrect);  
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Wrong username or password." });

        // sign the token
        const Role = handle == "bank" ? "bank" : existingUser.role;
        const token = jwt.sign(
            {
                user: existingUser.id,
                type: handle,
                role: Role  
            },
            "kjnasjnnjsanhfhakaosihvihaabvnhunakwsncaksnnedfev"
        );
        res
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .send();
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {login};