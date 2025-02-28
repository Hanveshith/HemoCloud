const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const {User} = require('../models');
const {BloodBank} = require('../models');


const {login} = require('../Controllers/User/Login');
const {signup} = require('../Controllers/User/Signup');

route.get("/loggedIn", async (req, res) => {
    try {
        // console.log(req.cookie)
        const token = req.cookies.token;
        if (!token) return res.json({ auth: false });
        const verified = jwt.verify(token, "kjnasjnnjsanhfhakaosihvihaabvnhunakwsncaksnnedfev");
        const user = await (verified.type == "bank" ? BloodBank : User).findByPk(verified.user);
        if (!user) return res.json({ auth: false });
        res.send({ auth: true, user: user , role: verified.role});
    } catch (err) {
        console.log(err);
        res.json({ auth: false });
    }
});

route.get("/logout", (req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .send();
    console.log("Logged Out")
});

route.post('/:handle',signup);
route.post('/login/:handle',login);

module.exports = route;