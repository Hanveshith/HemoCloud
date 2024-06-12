const express = require('express');
const route = express.Router();

const {login} = require('../Controllers/User/Login');
const {signup} = require('../Controllers/User/Signup');
route.post('/signup',signup);
route.post('/login',login);

module.exports = route;