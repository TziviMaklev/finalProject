

const express = require('express');
const router = express.Router();
const services = require('../Services/appliances');

const fs = require('fs');
const path = require('path');

const multer = require('multer');
const upload = multer();

async function uploadApplianceImage(file, idUser, id = null) {
  try {
    let newId = id;
    if (newId === null) {
      newId = await services.getNextCarId(); // Function to get the next car ID
    }
    const newFileName = `appliance${newId}.png`;

    // בדוק אם IMAGES_BASE_PATH מוגדר
    if (!process.env.IMAGES_BASE_PATH) {
      throw new Error('Missing environment variable IMAGES_BASE_PATH');
    }

    const imagesBasePath = process.env.IMAGES_BASE_PATH;
    const uploadDir = path.join(imagesBasePath, `../images/${idUser}`);

    // נסה ליצור את התיקייה
    await fs.promises.mkdir(uploadDir, { recursive: true });

    // בדוק אם התיקייה נוצרה בהצלחה
    try {
      await fs.promises.access(uploadDir, fs.constants.F_OK);
    } catch (err) {
      console.error('Error creating upload directory:', err);
      throw err; // Re-throw the error for handling
    }

    const fileBuffer = file.buffer;
    const filePath = path.join(uploadDir, newFileName);

    await fs.promises.writeFile(filePath, fileBuffer);

    return `../images/${idUser}/appliance${newId}.png`;
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error; // Re-throw the error for handling
  }
}

// GET all appliances
router.get('/', (req, res) => {
  services.getAll('getAllAppliances', []).then((results) => {
      console.log(`All appliances is retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving appliances:`, err);
      res.status(404).json({ error: `An error occurred while retrieving appliances` });
    });
});

// GET appliance by ID
router.get('/:applianceId', (req, res) => {
  const applianceId = req.params.applianceId;
  const details = {
    applianceId: applianceId
  };

  services.get('/=setAppliance', details)
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
router.put('/:applianceId',upload.single("image") , async(req, res) => {
  const applianceId = req.params.applianceId;
  const imageNavigte = await uploadApplianceImage(req.file, req.body.user_id ,parseInt(applianceId));
  const details = {
    applianceId: parseInt(applianceId),
    applianceDetails: req.body,
    imageNavigte: imageNavigte
  };
  console.log(" detail to update ", details);
  services.put('updateAppliance', details)
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
router.post('/', upload.single("image"), async(req, res) => {
  const imageNavigte = await uploadApplianceImage(req.file, req.body.user_id);
  const details = {
    applianceDetails: req.body ,
    imageNavigte :imageNavigte
  };
  console.log("details1"  , details);
  services.post('addAppliance', details)
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
    applianceId: parseInt(applianceId)
  };
  services.delete_('deleteAppliance', details)
    .then((result) => {
      console.log(`Appliance with ID ${applianceId} deleted successfully` , result);
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

module.exports = router;
