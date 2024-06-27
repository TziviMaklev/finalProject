const express = require('express');
const router = express.Router();
const services = require('../Services/manager');

router.post('/', (req, res) => {
    console.log("post sighup controlers");
    // Assuming services.create returns a Promise or throws an error
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


module.exports = router;
