// const express = require('express');
// const router = express.Router();
// const services= require('../Services/appliance');
// //ADD
// router.get('/appliance', (req, res) => {
//     services.getAll('getAllAppliances', details)
//         .then((results) => {
//             console.log(`all appliances retrieved:`, results);
//             res.status(200).json(results);
//         })
//         .catch((err) => {
//             console.error(`Error retrieving all appliances `, err);
//             res.status(404).json({ error: `An error occurred while retrieving all appliances` });
//         });
// });

// router.get('/:applianceId', (req, res) => {
//     const applianceId = req.params.applianceId;
//     const details = {
//         applianceId: applianceId
//     }
//     services.get('setAppliance', details)
//         .then((results) => {
//             console.log(`appliance with id ${applianceId} retrieved:`, results);
//             res.status(200).json(results);
//         })
//         .catch((err) => {
//             console.error(`Error retrieving appliance with id ${applianceId}:`, err);
//             res.status(404).json({ error: `An error occurred while retrieving appliance with id ${appliance}` });
//         });
// });

// router.put('/:applianceId', (req, res) => {
//     const applianceId = req.params.applianceId;
//     const details = {
//         applianceId: applianceId,
//         applianceDetails: req.body
//     }
//     services.update('updateCar', details)
//         .then((result) => {
//             console.log(`appliance with ID ${applianceId} updated successfully`);
//             res.status(200).send(result);
//         })
//         .catch((err) => {
//             console.error('Error updating appliance:', err);
//             res.status(500).json({ error: 'An error occurred while updating the appliance' });
//         });
// });

// router.post('/', (req, res) => {
//     const details = {
//         applianceDetails: req.body,
//     }
//     services.create("addAppliance", details)
//         .then((result) => {
//             console.log("new appliance created successfully");
//             res.status(200).send(result)
//         })
//         .catch((err) => {
//             console.error('Error creating new appliance:', err);
//             res.status(500).json({ error: 'An error occurred while creating a new appliance' });
//         });
// })


// router.delete('/:applianceId', (req, res) => {
//     const applianceId = req.params.applianceId;
//     const details = {
//         applianceId: applianceId
//     }
//     services.delete_('deleteAppliance', details)
//         .then((result) => {
//             res.status(200).send(result);
//         })
//         .catch((error) => {
//             res.status(500).send(error.message);
//         });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const services = require('../Services/appliances'); // שימוש ב-./ לנתיב יחסי באותה תיקייה

// // קבלת כל המכשירים
// router.get('/appliance', (req, res) => {
//   services.getAll('getAllAppliances', {}) // פרמטרים ריקים
//     .then((results) => {
//       console.log(`כל המכשירים אוחזרו:`, results);
//       res.status(200).json(results);
//     })
//     .catch((err) => {
//       console.error(`שגיאה באחזור כל המכשירים `, err);
//       res.status(404).json({ error: `התעוררה שגיאה באחזור כל המכשירים` });
//     });
// });

// // קבלת מכשיר לפי מזהה
// router.get('/:applianceId', (req, res) => {
//   const applianceId = req.params.applianceId;
//   const details = {
//     applianceId: applianceId
//   };

//   services.get('setAppliance', details)
//     .then((results) => {
//       console.log(`מכשיר עם מזהה ${applianceId} אוחזר:`, results);
//       res.status(200).json(results);
//     })
//     .catch((err) => {
//       console.error(`שגיאה באחזור מכשיר עם מזהה ${applianceId}:`, err);
//       res.status(404).json({ error: `התעוררה שגיאה באחזור מכשיר עם מזהה ${applianceId}` });
//     });
// });

// // עדכון מכשיר
// router.put('/:applianceId', (req, res) => {
//   const applianceId = req.params.applianceId;
//   const details = {
//     applianceId: applianceId,
//     applianceDetails: req.body
//   };

//   services.update('updateCar', details)
//     .then((result) => {
//       console.log(`מכשיר עם מזהה ${applianceId} עודכן בהצלחה`);
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       console.error('שגיאה בעדכון מכשיר:', err);
//       res.status(500).json({ error: 'התעוררה שגיאה בעדכון המכשיר' });
//     });
// });

// // יצירת מכשיר חדש
// router.post('/', (req, res) => {
//   const details = {
//     applianceDetails: req.body
//   };

//   services.create('addAppliance', details)
//     .then((result) => {
//       console.log('מכשיר חדש נוצר בהצלחה');
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       console.error('שגיאה ביצירת מכשיר חדש:', err);
//       res.status(500).json({ error: 'התעוררה שגיאה ביצירת מכשיר חדש' });
//     });
// });

// // מחיקת מכשיר
// router.delete('/:applianceId', (req, res) => {
//   const applianceId = req.params.applianceId;
//   const details = {
//     applianceId: applianceId
//   };

//   services.delete_('deleteAppliance', details)
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((error) => {
//       res.status(500).send(error.message);
//     });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const services = require('../Services/appliances');

// GET all appliances
router.get('/', (req, res) => {
  services.getAll('getAllAppliances', {})
    .then((results) => {
      console.log(`All appliances retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving all appliances `, err);
      res.status(404).json({ error: `An error occurred while retrieving all appliances` });
    });
});

// GET appliance by ID
router.get('/:applianceId', (req, res) => {
  const applianceId = req.params.applianceId;
  const details = {
    applianceId: applianceId
  };

  services.get('/setAppliance', details)
    .then((results) => {
      console.log(`Appliance with ID ${applianceId} retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving appliance with ID ${applianceId}:`, err);
      res.status(404).json({ error: `An error occurred while retrieving appliance with ID ${applianceId}` });
    });
});

// UPDATE appliance
router.put('/:applianceId', (req, res) => {
  const applianceId = req.params.applianceId;
  const details = {
    applianceId: applianceId,
    applianceDetails: req.body
  };

  services.update('updateCar', details)
    .then((result) => {
      console.log(`Appliance with ID ${applianceId} updated successfully`);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error('Error updating appliance:', err);
      res.status(500).json({ error: 'An error occurred while updating the appliance' });
    });
});

// CREATE new appliance
router.post('/', (req, res) => {
  const details = {
    applianceDetails: req.body
  };

  services.create('addAppliance', details)
    .then((result) => {
      console.log('New appliance created successfully');
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error('Error creating new appliance:', err);
      res.status(500).json({ error: 'An error occurred while creating a new appliance' });
    });
});

// DELETE appliance
router.delete('/:applianceId', (req, res) => {
  const applianceId = req.params.applianceId;
  const details = {
    applianceId: applianceId
  };

  services.delete_('deleteAppliance', details)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

module.exports = router;
