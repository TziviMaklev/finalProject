const express = require('express');
const router = express.Router();
const services = require('../Services/profile');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer();
async function uploadCarImage(file, idUser, id = null) {
    console.log(file); // For debugging
  
    if (!file) {
      throw new Error('Missing file argument');
    }
  
    try {
      let newId = idUser;
      const newFileName = `profile${newId}.png`;
  
      // בדוק אם IMAGES_BASE_PATH מוגדר
      if (!process.env.IMAGES_BASE_PATH) {
        throw new Error('Missing environment variable IMAGES_BASE_PATH');
      }
  
      const imagesBasePath = process.env.IMAGES_BASE_PATH;
      const uploadDir = path.join(imagesBasePath, `../images/profiles`);
  
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
      return `../images/profiles/profile${newId}.png`;
    } catch (error) {
      console.error('Error uploading product image:', error);
      throw error; // Re-throw the error for handling
    }
  }
  
  
router.post('/', upload.single("image"), async (req, res) => {
    console.log("controlers profile");
    const imageNavigte = await uploadCarImage(req.file, req.body.user_id);
    const details = {
        userId: parseInt(req.body.user_id),
        imageNavigte: imageNavigte
    };
    services.post("addProfile", details)
        .then((result) => {
            console.log("new profile created successfully", result);

            res.status(200).send(result)
        })
        .catch((err) => {
            console.error('Error creating new profile:', err);
            res.status(500).json({ error: 'An error occurred while creating a new profile' });
        })
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log("userId" , userId);
    const details = {
        userId: parseInt(userId)
    };
    services.get('getProfile', details)
      .then((results) => {
        console.log(`profile with id ${userId} retrieved:`, results);
        res.status(200).json(results);
      })
      .catch((err) => {
        console.error(`Error retrieving profile with id ${userId}:`, err);
        res.status(404).json({ error: `An error occurred while retrieving profile with id ${userId}` });
      });
  });
  

module.exports = router;
