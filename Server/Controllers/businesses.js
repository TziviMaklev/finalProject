// const express = require('express');
// const router = express.Router();
// const services= require('../Services/businesses');
// //ADD
// router.get('', (req, res) => {
//     services.getAll('getAllBusinesses', details)
//         .then((results) => {
//             console.log(`All Businesses retrieved:`, results);
//             res.status(200).json(results);
//         })
//         .catch((err) => {
//             console.error(`Error retrieving Businesses`, err);
//             res.status(404).json({ error: `An error occurred while retrieving Businesses` });
//         });
// });

// router.get('/:businesseId', (req, res) => {
//     const businesseId = req.params.businesseId;
//     const details = {
//         businesseId: businesseId
//     }
//     services.get('getBusinesse', details)
//         .then((results) => {
//             console.log(`Businesse with id ${businesseId} retrieved:`, results);
//             res.status(200).json(results);
//         })
//         .catch((err) => {
//             console.error(`Error retrieving Businesse with id ${businesseId}:`, err);
//             res.status(404).json({ error: `An error occurred while retrieving Businesse with id ${businessesId}` });
//         });
// });

// router.put('/:businesseId', (req, res) => {
//     const businesseId = req.params.businesseId;
//     const details = {
//         businesseId: businesseId,
//         businesseDetails: req.body
//     }
//     services.update('updateBusinesse', details)
//         .then((result) => {
//             console.log(`Businesse with ID ${businesseId} updated successfully`);
//             res.status(200).send(result);
//         })
//         .catch((err) => {
//             console.error('Error updating businesse:', err);
//             res.status(500).json({ error: `An error occurred while updating the businesse with id ${businessesId}` });
//         });
// });

// router.post('/', (req, res) => {
//     const details = {
//         businesseDetails: req.body,
//     }
//     services.create("addBusinesse", details)
//         .then((result) => {
//             console.log("new businesse created successfully");
//             res.status(200).send(result)
//         })
//         .catch((err) => {
//             console.error('Error creating new businesses:', err);
//             res.status(500).json({ error: 'An error occurred while creating a new businesse' });
//         });
// })


// router.delete('/:businesseId', (req, res) => {
//     const businesseId = req.params.businesseId;
//     const details = {
//         businesseId: businesseId
//     }
//     services.delete_('deleteBusinesse', details)
//         .then((result) => {
//             console.log(`businesse with ID ${businesseId} deleted successfully`);
//             res.status(200).send(result);
//         })
//         .catch((error) => {
//             console.error(`Error deleted businesse with id ${businesseId}:`, err);
//             res.status(500).send(error.message);
//         });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const services = require('../Services/businesses'); // Use relative path

// GET all businesses
router.get('/', (req, res) => {
  services.getAll('getAllBusinesses', {}) // Use empty object for parameters
    .then((results) => {
      console.log(`All Businesses retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving Businesses`, err);
      res.status(404).json({ error: `An error occurred while retrieving Businesses` });
    });
});

// GET business by ID
router.get('/:businessId', (req, res) => {
  const businessId = req.params.businessId;
  const details = {
    businessId: businessId
  };

  services.get('getBusinesse', details)
    .then((results) => {
      console.log(`Business with ID ${businessId} retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving Business with ID ${businessId}:`, err);
      res.status(404).json({ error: `An error occurred while retrieving Business with ID ${businessId}` });
    });
});

// UPDATE business
router.put('/:businessId', (req, res) => {
  const businessId = req.params.businessId;
  const details = {
    businessId: businessId,
    businessDetails: req.body
  };

  services.update('updateBusinesse', details)
    .then((result) => {
      console.log(`Business with ID ${businessId} updated successfully`);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error('Error updating business:', err);
      res.status(500).json({ error: `An error occurred while updating the business with ID ${businessId}` });
    });
});

// CREATE new business
router.post('/', (req, res) => {
  const details = {
    businessDetails: req.body
  };

  services.create('addBusinesse', details)
    .then((result) => {
      console.log('New business created successfully');
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error('Error creating new business:', err);
      res.status(500).json({ error: 'An error occurred while creating a new business' });
    });
});

// DELETE business
router.delete('/:businessId', (req, res) => {
  const businessId = req.params.businessId;
  const details = {
    businessId: businessId
  };

  services.delete_('deleteBusinesse', details)
    .then((result) => {
      console.log(`Business with ID ${businessId} deleted successfully`);
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(`Error deleting business with ID ${businessId}:`, err);
      res.status(500).send(error.message);
    });
});

module.exports = router;
