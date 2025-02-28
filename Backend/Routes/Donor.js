const express = require('express');
const route = express.Router();

const {createDonationAppointment,DonationAppointments,LatestAppointment,CancelAppointment} = require('../Controllers/Donor/DonationAppointment');
const {fetchDonorStatus} = require('../Controllers/Donor/DonorStatus');

route.post('/create-donation-appointment',createDonationAppointment);
route.get('/donor-status/:id',fetchDonorStatus);
route.get('/donation-appointments/:id',DonationAppointments);
route.get('/latest-appointment',LatestAppointment);
route.delete('/cancel-appointment',CancelAppointment);

module.exports = route;