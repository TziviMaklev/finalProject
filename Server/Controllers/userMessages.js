const express = require('express');
const router = express.Router();
const services= require('../Services/message');
//ADD
router.get('', (req, res) => {
    services.getAll('getAllMessages', details)
        .then((results) => {
            console.log(` all messages retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving all messages`, err);
            res.status(404).json({ error: `An error occurred while retrieving all messages` });
        });
});

router.get('/:messageId', (req, res) => {
    const messageId = req.params.messageId;
    const details = {
        messageId: messageId
    }
    services.get('getMessage', details)
        .then((results) => {
            console.log(`message with id ${messageId} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving message with id ${messageId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving message with id ${messageId}` });
        });
});


router.post('/', (req, res) => {
    const details = {
        messageDetails: req.body,
    }
    services.create("addMessage", details)
        .then((result) => {
            console.log("new message created successfully");
            res.status(200).send(result)
        })
        .catch((err) => {
            console.error('Error creating new message:', err);
            res.status(500).json({ error: 'An error occurred while creating a new message' });
        });
})


router.delete('/:messageId', (req, res) => {
    const messageId = req.params.messageId;
    const details = {
        messageId: messageId
    }
    services.delete_('deleteUserMessage', details)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

module.exports = router;