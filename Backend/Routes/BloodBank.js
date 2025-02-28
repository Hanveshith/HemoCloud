const express = require('express');
const route = express.Router();
const {BloodBank} = require('../models');
const {User} = require('../models');
const {Donor} = require('../models');

const {fetchDonatingAppointments,acceptDonatingAppointment} = require('../Controllers/BloodBank/DonationAppointments');
const {createDonation} = require('../Controllers/BloodBank/Donation');
const {acceptUserAsDonor,fetchDonorsToAccept} = require('../Controllers/BloodBank/DonorAcceptance');
const {createBloodCollection,
    fetchBloodCollection,
    updateBloodCollection,
    deleteBloodCollection} = require('../Controllers/BloodBank/BloodCollection');
const {fetchBloodRequests,
    acceptBloodRequest,
    rejectBloodRequest} = require('../Controllers/BloodBank/BloodRequests');


route.post('/:handle',async (req, res) => {
    try {
        const operation = req.body.handle;
        if (operation === "request" || operation === "become-donor") {
            const filter = req.params.handle == "bank" ? {} : { Password: 0, requests: 0, donations: 0, stock: 0, __v: 0 };
            const banks = await BloodBank.findAll(req.body, filter);
            // console.log("Latitude: ", req.body.latitude, "Longitude: ", req.body.longitude);
            res.json(banks);
        }
        else if(operation === "donate"){
            const filter = req.params.handle == "bank" ? {} : { Password: 0, requests: 0, donations: 0, stock: 0, __v: 0 };
            const donor = await Donor.findOne({where: {userId: req.body.user.id}}, filter);
            const bloodbank = await BloodBank.findOne({where: {id: donor.bloodBankId}});
            res.json(bloodbank);
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
route.post('/create-blood-collection',createBloodCollection);
route.get('/fetch-blood-collection',fetchBloodCollection);
route.put('/update-blood-collection',updateBloodCollection);
route.delete('/delete-blood-collection',deleteBloodCollection);
route.put('/accept-donor/:id',acceptUserAsDonor);
route.get('/fetch-donating-appointments',fetchDonatingAppointments);
route.put('/accept-donating-appointment',acceptDonatingAppointment);
route.post('/create-donation',createDonation);
route.get('/fetch-blood-requests/:id',fetchBloodRequests);
route.put('/accept-blood-request',acceptBloodRequest);
route.put('/reject-blood-request',rejectBloodRequest);
route.get('/fetch-donors-to-accept',fetchDonorsToAccept);

module.exports = route;