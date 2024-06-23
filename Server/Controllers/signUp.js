const express = require('express');
const router = express.Router();
const services = require('../Services/signUp'); // Assuming the service file is named signUp.js

router.post('/', (req, res) => {
  const details = {
    infoDetails: req.query.infoDetails, // Use req.query for query string parameters
    passwordDetails: req.body.passwordDetails // Use req.body for body data
  };

  // Assuming services.create returns a Promise or throws an error
  services.create("signUp", details)
    .then((result) => {
      console.log("signUp is successful");
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error('Error with signUp:', err);
      res.status(500).json({ error: 'An error occurred while signUp' });
    });
});

module.exports = router;

