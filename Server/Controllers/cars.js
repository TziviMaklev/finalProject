const express = require('express');
const router = express.Router();
const services= require('../Services/cars');
//ADD
router.get('', (req, res) => {
    services.getAll('getAllCars', details)
        .then((results) => {
            console.log(`All cars is retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving cars:`, err);
            res.status(404).json({ error: `An error occurred while retrieving cars` });
        });
});

router.get('/:carId', (req, res) => {
    const carId = req.params.carId;
    const details = {
        carId: carId
    }
    services.get('getCar', details)
        .then((results) => {
            console.log(`CAR with id ${carId} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving car with id ${carId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving car with id ${carId}` });
        });
});

router.put('/:carId', (req, res) => {
    const carId = req.params.carId;
    const details = {
        carId: carId,
        carDetails: req.body
    }
    services.update('updateCar', details)
        .then((result) => {
            console.log(`car with ID ${carId} updated successfully`);
            res.status(200).send(result);
        })
        .catch((err) => {
            console.error(`Error updating car with id ${carId}:`, err);
            res.status(500).json({ error: `An error occurred while updating the car with id ${carId}` });
        });
});

router.post('/', (req, res) => {
    const details = {
        carDetails: req.body,
    }
    services.create("addCar", details)
        .then((result) => {
            console.log("new car created successfully");
            res.status(200).send(result)
        })
        .catch((err) => {
            console.error('Error creating new car:', err);
            res.status(500).json({ error: 'An error occurred while creating a new car' });
        });
})


router.delete('/:carId', (req, res) => {
    const carId = req.params.carId;
    const details = {
        carId: carId
    }
    services.delete_('deleteCar', details)
        .then((result) => {
            console.log(`car with ID ${carId} deleted successfully`);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(`Error deleted car with id ${carId}:`, err);
            res.status(500).send(error.message);
        });
});

module.exports = router;