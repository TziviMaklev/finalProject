const express = require('express');
const router = express.Router();
const services= require('../Services/reservedAds');
//ADD
router.get('', (req, res) => {
    services.getAll('getAllAds', details)
        .then((results) => {
            console.log(`all ads retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving all ads`, err);
            res.status(404).json({ error: `An error occurred while retrieving all ads` });
        });
});

router.get('/:adsId', (req, res) => {
    const adsId = req.params.carId;
    const details = {
        adsId: adsId
    }
    services.get('getAds', details)
        .then((results) => {
            console.log(`ads with id ${carId} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving ads with id ${adsId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving ads with id ${adsId}` });
        });
});


router.post('/', (req, res) => {
    const details = {
        adsDetails: req.body,
    }
    services.create("addAds", details)
        .then((result) => {
            console.log("new ads created successfully");
            res.status(200).send(result)
        })
        .catch((err) => {
            console.error('Error creating new ads:', err);
            res.status(500).json({ error: 'An error occurred while creating a new ads' });
        });
})


router.delete('/:adsId', (req, res) => {
    const carId = req.params.carId;
    const details = {
        adsId: adsId
    }
    services.delete_('deleteReservedAds', details)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

module.exports = router;