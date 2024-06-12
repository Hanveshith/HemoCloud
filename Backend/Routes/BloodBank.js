const express = require('express');
const route = express.Router();

const {fetchDonatingAppointments,acceptDonatingAppointment} = require('../Controllers/BloodBank/DonationAppointments');
const {createDonation} = require('../Controllers/BloodBank/Donation');
const {acceptUserAsDonor} = require('../Controllers/BloodBank/DonorAcceptance');
const {createBloodCollection,
    fetchBloodCollection,
    updateBloodCollection,
    deleteBloodCollection} = require('../Controllers/BloodBank/BloodCollection');
const {    fetchBloodRequests,
    acceptBloodRequest,
    rejectBloodRequest} = require('../Controllers/BloodBank/BloodRequests');


route.post('/create-blood-collection',createBloodCollection);
route.get('/fetch-blood-collection',fetchBloodCollection);
route.update('/update-blood-collection',updateBloodCollection);
route.delete('/delete-blood-collection',deleteBloodCollection);
route.update('/accept-donor',acceptUserAsDonor);
route.get('/fetch-donating-appointments',fetchDonatingAppointments);
route.update('/accept-donating-appointment',acceptDonatingAppointment);
route.post('/create-donation',createDonation);
route.get('/fetch-blood-requests',fetchBloodRequests);
route.update('/accept-blood-request',acceptBloodRequest);
route.update('/reject-blood-request',rejectBloodRequest);


module.exports = route;