const express = require('express');
const router = express.Router();
const services= require('../Services/signUp');

router.post('/', (req, res) => {
    const details = {
        signUpDetails: req.body
    }
    services.create("signUp", details)
        .then((result) => {
            console.log("signUp is successful");
            res.status(200).send(result)
        })
        .catch((err) => {
            console.error('Error with signUp:', err);
            res.status(500).json({ error: 'An error occurred while signUp' });
        });
})