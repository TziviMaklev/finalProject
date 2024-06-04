const express = require('express');
const router = express.Router();
const services= require('../Services/user');
//ADD
router.get('', (req, res) => {
    services.getAll('getAllUsers', details)
        .then((results) => {
            console.log(`all users retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving all users`, err);
            res.status(404).json({ error: `An error occurred while retrieving all users` });
        });
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const details = {
        userId: userId
    }
    services.get('getUser', details)
        .then((results) => {
            console.log(`user with id ${userId} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving user with id ${userId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving user with id ${userId}` });
        });
});

router.put('/:userId', (req, res) => {
    const userId = req.params.userId;
    const details = {
        userId: userId,
        userDetails: req.body
    }
    services.update('updateUserInfo', details)
        .then((result) => {
            console.log(`user with ID ${userId} updated successfully`);
            res.status(200).send(result);
        })
        .catch((err) => {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'An error occurred while updating the user' });
        });
});

router.post('/', (req, res) => {
    const details = {
        userDetails: req.body,
    }
    services.create("addCar", details)
        .then((result) => {
            console.log("new user created successfully");
            res.status(200).send(result)
        })
        .catch((err) => {
            console.error('Error creating new user:', err);
            res.status(500).json({ error: 'An error occurred while creating a new user' });
        });
})

module.exports = router;