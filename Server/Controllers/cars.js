const express = require('express');
const router = express.Router();
const services= require('../Services/cars');
//ADD
router.get('', (req, res) => {
    services.getAll('getAllCars', details)
        .then((results) => {
            console.log(`CAR with id ${id} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving car with id ${id}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving car with id ${id}` });
        });
});

router.get('/:carId', (req, res) => {
    const carId = req.params.carId;
    const details = {
        carId: carId
    }
    services.get('getCar', details)
        .then((results) => {
            console.log(`CAR with id ${id} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving car with id ${id}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving car with id ${id}` });
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
            console.log(`car with ID ${commentId} updated successfully`);
            res.status(200).send(result);
        })
        .catch((err) => {
            console.error('Error updating car:', err);
            res.status(500).json({ error: 'An error occurred while updating the car' });
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
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

module.exports = router;