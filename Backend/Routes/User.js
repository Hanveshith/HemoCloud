const express = require('express');
const route = express.Router();
const cookieParser = require("cookie-parser");


route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(cookieParser());



const {becomeDonor} = require('../Controllers/Donor/BecomeDonor');
const {addBloodBank} = require('../Controllers/Admin/BloodBank');
const {createRequest} = require('../Controllers/Receiver/request');
const {fetchBloodRequests} = require('../Controllers/User/fetchBloodRequests');


route.post('/become-donor',becomeDonor);
route.post('/request-blood',createRequest);
route.post('/add-blood-bank',addBloodBank);
route.get('/fetch-blood-requests/:id',fetchBloodRequests);




module.exports = route;