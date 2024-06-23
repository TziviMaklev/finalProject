// const express = require('express');
// const router = express.Router();
// const services= require('../Services/furtniture');
// //ADD
// router.get('/', (req, res) => {
//     services.getAll('getAllFurniture', details)
//         .then((results) => {
//             console.log(`All Furnitures retrieved:`, results);
//             res.status(200).json(results);
//         })
//         .catch((err) => {
//             console.error(`Error retrieving furnitures`, err);
//             res.status(404).json({ error: `An error occurred while retrieving furnitures` });
//         });
// });

// router.get('/:furnitureId', (req, res) => {
//     const furnitureId = req.params.furnitureId;
//     const details = {
//         furnitureId: furnitureId
//     }
//     services.get('getFurniture', details)
//         .then((results) => {
//             console.log(`Furniture with id ${furnitureId} retrieved:`, results);
//             res.status(200).json(results);
//         })
//         .catch((err) => {
//             console.error(`Error retrieving Furniture with id ${furnitureId}:`, err);
//             res.status(404).json({ error: `An error occurred while retrieving Furniture with id ${furnitureId}` });
//         });
// });

// router.put('/:furnitureId', (req, res) => {
//     const furnitureId = req.params.furnitureId;
//     const details = {
//         furnitureId: furnitureId,
//         furnitureDetails: req.body
//     }
//     services.update('updateFurniture', details)
//         .then((result) => {
//             console.log(`furniture with ID ${furnitureId} updated successfully`);
//             res.status(200).send(result);
//         })
//         .catch((err) => {
//             console.error('Error updating furniture:', err);
//             res.status(500).json({ error: `An error occurred while updating the furniture with id ${furnitureId}` });
//         });
// });

// router.post('/', (req, res) => {
//     const details = {
//         furnitureDetails: req.body,
//     }
//     services.create("addFurniture", details)
//         .then((result) => {
//             console.log("new furniture created successfully");
//             res.status(200).send(result)
//         })
//         .catch((err) => {
//             console.error('Error creating new furniture:', err);
//             res.status(500).json({ error: 'An error occurred while creating a new furniture' });
//         });
// })


// router.delete('/:furnitureId', (req, res) => {
//     const furnitureId = req.params.furnitureId;
//     const details = {
//         furnitureId: furnitureId
//     }
//     services.delete_('deleteFurniture', details)
//         .then((result) => {
//             console.log(`furniture with ID ${furnitureId} deleted successfully`);
//             res.status(200).send(result);
//         })
//         .catch((error) => {
//             console.error(`Error deleted furniture with id ${furnitureId}:`, err);
//             res.status(500).send(error.message);
//         });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
// Assuming the service file is named furniture.js in the same directory
const services = require('../Services/furtniture'); // Adjusted the path

// **GET /:** Retrieves all furniture items
router.get('/', (req, res) => {
  services.getAll('getAllFurniture', details) // Replace details with actual argument object if needed
    .then((results) => {
      console.log(`All furnitures retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving furnitures:`, err);
      res.status(404).json({ error: `An error occurred while retrieving furnitures` });
    });
});

// **GET /:furnitureId:** Retrieves a specific furniture item by ID
router.get('/:furnitureId', (req, res) => {
  const furnitureId = req.params.furnitureId;
  const details = {
    furnitureId: furnitureId
  };

  services.get('getFurniture', details)
    .then((results) => {
      console.log(`Furniture with id ${furnitureId} retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving Furniture with id ${furnitureId}:`, err);
      res.status(404).json({ error: `An error occurred while retrieving Furniture with id ${furnitureId}` });
    });
});

// **PUT /:furnitureId:** Updates a furniture item's details
router.put('/:furnitureId', (req, res) => {
  const furnitureId = req.params.furnitureId;
  const details = {
    furnitureId: furnitureId,
    furnitureDetails: req.body
  };

  services.update('updateFurniture', details)
    .then((result) => {
      console.log(`furniture with ID ${furnitureId} updated successfully`);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error('Error updating furniture:', err);
      res.status(500).json({ error: `An error occurred while updating the furniture with id ${furnitureId}` });
    });
});

// **POST /:** Creates a new furniture item
router.post('/', (req, res) => {
  const details = {
    furnitureDetails: req.body,
  };

  services.create("addFurniture", details)
    .then((result) => {
      console.log("new furniture created successfully");
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error('Error creating new furniture:', err);
      res.status(500).json({ error: 'An error occurred while creating a new furniture' });
    });
});

// **DELETE /:furnitureId:** Deletes a furniture item by ID
router.delete('/:furnitureId', (req, res) => {
  const furnitureId = req.params.furnitureId;
  const details = {
    furnitureId: furnitureId
  };

  services.delete_('deleteFurniture', details)
    .then((result) => {
      console.log(`furniture with ID ${furnitureId} deleted successfully`);
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(`Error deleted furniture with id ${furnitureId}:`, err);
      res.status(500).send(error.message);
    });
});

module.exports = router;
