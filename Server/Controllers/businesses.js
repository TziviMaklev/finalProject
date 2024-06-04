const express = require('express');
const router = express.Router();
const services= require('../Services/Businesses');
//ADD
router.get('', (req, res) => {
    services.getAll('getAllBusinesses', details)
        .then((results) => {
            console.log(`All Businesses retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving Businesses`, err);
            res.status(404).json({ error: `An error occurred while retrieving Businesses` });
        });
});

router.get('/:businessesId', (req, res) => {
    const businesseId = req.params.businesseId;
    const details = {
        businesseId: businesseId
    }
    services.get('getBusinesse', details)
        .then((results) => {
            console.log(`Businesse with id ${businesseId} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving Businesse with id ${businesseId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving Businesse with id ${businessesId}` });
        });
});

router.put('/:businesseId', (req, res) => {
    const businesseId = req.params.businesseId;
    const details = {
        businesseId: businesseId,
        businesseDetails: req.body
    }
    services.update('updateBusinesse', details)
        .then((result) => {
            console.log(`Businesse with ID ${businesseId} updated successfully`);
            res.status(200).send(result);
        })
        .catch((err) => {
            console.error('Error updating businesse:', err);
            res.status(500).json({ error: `An error occurred while updating the businesse with id ${businessesId}` });
        });
});

router.post('/', (req, res) => {
    const details = {
        businesseDetails: req.body,
    }
    services.create("addBusinesse", details)
        .then((result) => {
            console.log("new businesse created successfully");
            res.status(200).send(result)
        })
        .catch((err) => {
            console.error('Error creating new businesses:', err);
            res.status(500).json({ error: 'An error occurred while creating a new businesse' });
        });
})


router.delete('/:businesseId', (req, res) => {
    const businesseId = req.params.businesseId;
    const details = {
        businesseId: businesseId
    }
    services.delete_('deleteBusinesse', details)
        .then((result) => {
            console.log(`businesse with ID ${businesseId} deleted successfully`);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(`Error deleted businesse with id ${businesseId}:`, err);
            res.status(500).send(error.message);
        });
});

module.exports = router;