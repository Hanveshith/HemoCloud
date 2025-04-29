const express = require('express');
const route = express.Router();
const {BloodBank} = require('../models');
const {User} = require('../models');
const {Donor} = require('../models');


const { fetchDonatingAppointments,
    acceptDonatingAppointment} = require('../Controllers/BloodBank/DonationAppointments');
const {createDonation, 
    approvedonation} = require('../Controllers/BloodBank/Donation');
const {acceptUserAsDonor,
    fetchDonorsToAccept} = require('../Controllers/BloodBank/DonorAcceptance');
const {createBloodCollection,
    fetchBloodCollection,
    updateBloodCollection,
    deleteBloodCollection} = require('../Controllers/BloodBank/BloodCollection');
const {fetchBloodRequests,
    acceptBloodRequest,
    rejectBloodRequest} = require('../Controllers/BloodBank/BloodRequests');

const {approveBloodRequest} = require('../Controllers/BloodBank/BloodRequests');

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = angle => angle * (Math.PI / 180);
        const R = 6371; // Radius of Earth in km
    
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
    
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return R * c; // Distance in km
    };

route.post('/banks', async (req, res) => {
    try {
        const { latitude, longitude, handle: operation } = req.body;
        console.log("Request: ", req.body);

        if (operation === "request" || operation === "become-donor") {
            const allBanks = await BloodBank.findAll(); // Get all banks
            const filteredBanks = allBanks.filter(bank => {
                const distance = haversineDistance(latitude, longitude, bank.latitude, bank.Longitude);
                return distance <= 5;
            });
            res.json(filteredBanks);
        } else if (operation === "donate") {
            const donor = await Donor.findOne({ where: { userId: req.body.user.id } });
            const bloodbank = await BloodBank.findOne({ where: { id: donor.bloodBankId } });
            res.json(bloodbank);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

route.post('/create-blood-collection',createBloodCollection);
route.get('/fetch-blood-collection/:id',fetchBloodCollection);
route.put('/update-blood-collection/:id',updateBloodCollection);
route.delete('/delete-blood-collection/:id',deleteBloodCollection);
route.put('/accept-donor/:id',acceptUserAsDonor);
route.get('/fetch-donating-appointments/:id',fetchDonatingAppointments);
route.put('/accept-donating-appointment',acceptDonatingAppointment);
route.post('/create-donation',createDonation);
route.get('/fetch-blood-requests/:id',fetchBloodRequests);
route.put('/accept-blood-request',acceptBloodRequest);
route.put('/approve-blood-request',approveBloodRequest);
route.put('/reject-blood-request',rejectBloodRequest);
route.get('/fetch-donors-to-accept',fetchDonorsToAccept);
route.put('/approve-donation/:id', approvedonation);

module.exports = route;