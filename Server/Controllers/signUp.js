const express = require('express');
const router = express.Router();
const services = require('../Services/signUp'); // Assuming the service file is named signUp.js
console.log("sighUp controlers");

router.post('/', (req, res) => {
  console.log("post sighup controlers");
  // const details = {
  //   infoDetails: req.body.infoDetails, //// Use req.body.infoDetails for body data
  //   passwordDetails: req.body.passwordDetails // Use req.body.passwordDetails for body data
  // };
  // console.log(details);
  // Assuming services.create returns a Promise or throws an error
  services.post("signUp", req.body)
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

