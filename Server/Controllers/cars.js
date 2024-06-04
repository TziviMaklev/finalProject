const express = require('express');
const router = express.Router();
//ADD
router.get('', (req, res) => {

    dal.getAll('', details)
        .then((results) => {
            console.log(`CAR with id ${id} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving car with id ${id}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving car with id ${id}` });
        });
});

router.put('/:postId/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.params.postId;
    const details = {
        detailsToUpdate: req.body,
        commentId: commentId,
        postId: postId
    }
    dal.update('updateCar', details)
        .then((result) => {
            console.log(`car with ID ${commentId} updated successfully`);
            res.status(200).send(result);
        })
        .catch((err) => {
            console.error('Error updating car:', err);
            res.status(500).json({ error: 'An error occurred while updating the car' });
        });
});

router.post('/', (req, res) => {
    const details = {
        commentDetails: req.body,
    }
    dal.create("addCar", details)
        .then((result) => {
            console.log("new car created successfully");
        })
        .catch((err) => {
            console.error('Error creating new car:', err);
            res.status(500).json({ error: 'An error occurred while creating a new car' });
        });

    dal.get('getCar', details)
        .then((result) => {
            console.log("new car created successfully");
            res.status(200).send(result[0])
        })
        .catch((err) => {
            console.error('Error creating new car:', err);
            res.status(500).json({ error: 'An error occurred while creating a new car' });
        });
})


router.delete('/:postId/:commentId', (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const details = {
        postId: postId,
        commentId: commentId
    }
    dal.delete_('deleteCar', details)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

module.exports = router;