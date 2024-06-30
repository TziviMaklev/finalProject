const express = require('express');
const router = express.Router();
const services = require('../Services/companies');

router.get('/cars', (req, res) => {
    services.getAll('getAllCarCompanies', []) // Use empty object for parameters
      .then((results) => {
        console.log(`All companies retrieved:`, results);
        res.status(200).json(results);
      })
      .catch((err) => {
        console.error(`Error retrieving companies`, err);
        res.status(404).json({ error: `An error occurred while retrieving Businesses` });
      });
  });
  router.get('/appliance', (req, res) => {
    services.getAll('getAllApplianceCompanies', []) // Use empty object for parameters
      .then((results) => {
        console.log(`All appliance companies retrieved:`, results);
        res.status(200).json(results);
      })
      .catch((err) => {
        console.error(`Error retrieving companies`, err);
        res.status(404).json({ error: `An error occurred while retrieving Businesses` });
      });
  });

  module.exports = router;
