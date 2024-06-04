const express = require('express');
const router = express.Router();
const services= require('../Services/login');

router.get('', (req, res) => {
    const details = {
        loginDetails: req.body
    }
    services.get('login', details)
        .then((results) => {
            console.log(`login is successful`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error with login:`, err);
            res.status(404).json({ error: `An error occurred while login` });
        });
});
