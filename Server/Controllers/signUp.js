const express = require('express');
const router = express.Router();
const services = require('../Services/signUp'); // Assuming the service file is named signUp.



console.log("sighUp controlers");

router.post('/', (req, res) => {
  console.log("post sighup controlers");
  console.log(req.body);
  services.post("signUp", req.body)
    .then((result) => {
      console.log("signUp is successful");
      res.status(200).send(result);
    console.log(result);
    return result;
    })
    .catch((err) => {
      console.error('Error with signUp:', err);
      res.status(500).json({ error: 'An error occurred while signUp' });
    });
});
router.get('/:email', (req, res) => {
  const email = req.params.email;
  const details = {
    email: email
  };
  services.get('getCar', details)
  .then((results) => {
    console.log(`sent mail to ${email} the password ${results}`, results);
    res.status(200).json(results);
  })
  .catch((err) => {
    console.error(`Error retrieving car with id ${carId}:`, err);
    res.status(404).json({ error: `An error occurred while retrieving car with id ${carId}` });
  });
});

module.exports = router;

