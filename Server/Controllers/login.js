const express = require('express');
const router = express.Router();
const services = require('../Services/login');

router.post('/', (req, res) => {
  console.log(req.body);
  services.post('login',req.body ) // Replace 'get' with the actual function name in login.js
    .then((results) => {
      console.log(`Login successful`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error with login:`, err);
      res.status(401).json({ error: `Login failed: ${err.message}` }); // Use error message if available
    });
});

module.exports = router;
