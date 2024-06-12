const express = require('express');
const route = express.Router();

const {login} = require('../Controllers/User/Login');
const {signup} = require('../Controllers/User/Signup');
const {becomeDonor} = require('../Controllers/Donor/BecomeDonor');
const {addBloodBank} = require('../Controllers/Admin/BloodBank');


route.post('/become-donor',becomeDonor);

route.post('/signup',signup);
route.post('/login',login);
route.post('/become-donor',becomeDonor);
route.post('/add-blood-bank',addBloodBank)

module.exports = route;