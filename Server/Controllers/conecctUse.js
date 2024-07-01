const express = require('express');
const router = express.Router();
const services = require('../Services/conecctUse');

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    services.get('getUserInfo', userId)
        .then((results) => {
            console.log(`user with id ${userId} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving user with id ${userId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving user with id ${userId}` });
        });
});

router.post('/', (req, res) => {
    services.post(["getUserInfo" , "addMessage" ], req.body)
      .then((result) => {
        console.log("new  Message  created successfully" , result);
        res.status(200).send(result)
      })
      .catch((err) => {
        console.error('Error creating new car:', err);
        res.status(500).json({ error: 'An error occurred while creating a new car' });
      })
  });


  router.delete('/:messageId', (req, res) => {
    const messageId = req.params.messageId;
    const details = {
      messageId: parseInt(messageId)
    };
    console.log("deletMassage" , details);
    services.delete_('deletMassage', details)
      .then((result) => {
        console.log(`message with ID ${messageId} deleted successfully` , result);
        res.status(200).send(result);
      })
      .catch((error) => {
        console.error(`Error deleted car with id ${carId}:`, err);
        res.status(500).send(error.message);
      });
  });

module.exports = router;
