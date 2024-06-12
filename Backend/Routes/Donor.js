const express = require('express');
const route = express.Router();

const {createDonationAppointment,DonationAppointments,LatestAppointment,CancelAppointment} = require('../Controllers/Donor/DonationAppointment');

route.post('/create-donation-appointment',createDonationAppointment);
route.get('/donation-appointments',DonationAppointments);
route.get('/latest-appointment',LatestAppointment);
route.delete('/cancel-appointment',CancelAppointment);

module.exports = route;