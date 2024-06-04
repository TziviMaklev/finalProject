const express = require('express');
const router = express.Router();
const services= require('../Services/animals');
//ADD
router.get('', (req, res) => {
    services.getAll('getAllAnimals', details)
        .then((results) => {
            console.log(`all animals retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving all animals`, err);
            res.status(404).json({ error: `An error occurred while retrieving all animals` });
        });
});

router.get('/:animalId', (req, res) => {
    const animalId = req.params.animalId;
    const details = {
        animalId: animalId
    }
    services.get('getAnimal', details)
        .then((results) => {
            console.log(`animal with id ${animalId} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving animals with id ${animalId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving animal with id ${animalId}` });
        });
});

router.put('/:animalId', (req, res) => {
    const animalId = req.params.animalId;
    const details = {
        animalId: animalId,
        animalDetails: req.body
    }
    services.update('updateAnimal', details)
        .then((result) => {
            console.log(`animal with ID ${animalId} updated successfully`);
            res.status(200).send(result);
        })
        .catch((err) => {
            console.error('Error updating animal:', err);
            res.status(500).json({ error: 'An error occurred while updating the animal' });
        });
});

router.post('/', (req, res) => {
    const details = {
        animalDetails: req.body,
    }
    services.create("addAnimal", details)
        .then((result) => {
            console.log("new animal created successfully");
            res.status(200).send(result)
        })
        .catch((err) => {
            console.error('Error creating new animal:', err);
            res.status(500).json({ error: 'An error occurred while creating a new animal' });
        });
})


router.delete('/:animalId', (req, res) => {
    const animalId = req.params.animalId;
    const details = {
        animalId: animalId
    }
    services.delete_('deleteAnimal', details)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

module.exports = router;