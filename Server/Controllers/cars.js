const express = require('express');
const router = express.Router();
const services = require('../Services/cars');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer();
// async function uploadCarImage(file, idUser, id = null) {
//   try {
//     let newId = id;
//     if (newId === null) {
//       newId = await services.getNextCarId(); // Function to get the next car ID
//     }
//     const newFileName = `car${newId}.png`;

//     // בדוק אם IMAGES_BASE_PATH מוגדר
//     if (!process.env.IMAGES_BASE_PATH) {
//       throw new Error('Missing environment variable IMAGES_BASE_PATH');
//     }

//     const imagesBasePath = process.env.IMAGES_BASE_PATH;
//     const uploadDir = path.join(imagesBasePath, `../images/${idUser}`);

//       //   בדוק אם התיקייה קיימת (קיים בקוד המקורי)
//   // בדוק אם התיקייה קיימת (קיים בקוד המקורי)
//   try {
//     await fs.promises.access(uploadDir, fs.constants.F_OK);
//   } catch (err) {
//     if (err.code === 'ENOENT') {
//       await fs.promises.mkdir(uploadDir, { recursive: true });
//     } else {
//       throw err;
//     }
//   }



//     const fileBuffer = file.buffer;
//     const filePath = path.join(uploadDir, newFileName);

//     await fs.promises.writeFile(filePath, fileBuffer);

//     return filePath;



//   } catch (error) {
//     console.error('Error uploading product image:', error);
//     throw error; // Re-throw the error for handling
//   }
// }
// async function uploadCarImage(file, idUser, id = null) {
//   try {
//     let newId = id;
//     if (newId === null) {
//       newId = await services.getNextCarId(); // Function to get the next car ID
//     }
//     const newFileName = `car${newId}.png`;

//     // בדוק אם IMAGES_BASE_PATH מוגדר
//     if (!process.env.IMAGES_BASE_PATH) {
//       throw new Error('Missing environment variable IMAGES_BASE_PATH');
//     }

//     const imagesBasePath = process.env.IMAGES_BASE_PATH;
//     const uploadDir = path.join(imagesBasePath, `../images/${idUser}`);

//     // בדוק אם התיקייה קיימת (קיים בקוד המקורי)
//     if (!await fs.promises.stat(uploadDir).catch((err) => err.code === 'ENOENT')) {
//       // צור את התיקייה עם אופציה רקורסיבית
//       await fs.promises.mkdir(uploadDir, { recursive: true });
//     }

//     const fileBuffer = file.buffer;
//     const filePath = path.join(uploadDir, newFileName);

//     await fs.promises.writeFile(filePath, fileBuffer);
//     try {
//       await fs.promises.access(uploadDir, fs.constants.F_OK);
//     } catch (err) {
//       if (err.code === 'ENOENT') {
//         await fs.promises.mkdir(uploadDir, { recursive: true });
//       } else {
//         throw err;
//       }
//     }

//     return `../images/${idUser}/${newId}`;
//   } catch (error) {
//     console.error('Error uploading product image:', error);
//     throw error; // Re-throw the error for handling
//   }
// }
async function uploadCarImage(file, idUser, id = null) {
  try {
    let newId = id;
    if (newId === null) {
      newId = await services.getNextCarId(); // Function to get the next car ID
    }
    const newFileName = `car${newId}.png`;
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

    return `../images/${idUser}/car${newId}.png`;
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error; // Re-throw the error for handling
  }
}





router.get('/', (req, res) => {
  services.getAll('getAllCars', [])
    .then((results) => {
      // console.log(`All cars is retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving cars:`, err);
      res.status(404).json({ error: `An error occurred while retrieving cars` });
    });
});

// **GET /:carId:** Retrieves a specific car by ID
router.get('/:carId', (req, res) => {
  const carId = req.params.carId;
  const details = {
    carId: carId
  };

  services.get('getCar', details)
    .then((results) => {
      console.log(`CAR with id ${carId} retrieved:`, results);
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`Error retrieving car with id ${carId}:`, err);
      res.status(404).json({ error: `An error occurred while retrieving car with id ${carId}` });
    });
});

// **PUT /:carId:** Updates a car's details
router.put('/:carId',upload.single("image") , async(req, res) => {
  const carId = req.params.carId;
  const imageNavigte = await uploadCarImage(req.file, req.body.user_id ,parseInt(carId));
  const details = {
    carId: parseInt(carId) ,
    carDetails: req.body,
    imageNavigte: imageNavigte
  };
  console.log("details updated", details);
  services.put('updateCar', details)
    .then((result) => {
      console.log(result);
      console.log(`car with ID ${carId} updated successfully`);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(`Error updating car with id ${carId}:`, err);
      res.status(500).json({ error: `An error occurred while updating the car with id ${carId}` });
    });
});

// **POST /:** Creates a new car
router.post('/', upload.single("image"), async (req, res) => {
  const imageNavigte = await uploadCarImage(req.file, req.body.user_id);
  const details = {
    carDetails: req.body,
    imageNavigte: imageNavigte
  };
  console.log("carDetails", details.carDetails);
  services.post("addCar", details)
    .then((result) => {
      
      console.log("new car created successfully" , result);          

      res.status(200).send(result)
    })
    .catch((err) => {
      console.error('Error creating new car:', err);
      res.status(500).json({ error: 'An error occurred while creating a new car' });
    })
});

// **DELETE /:carId:** Deletes a car by ID
router.delete('/:carId', (req, res) => {
  const carId = req.params.carId;
  const details = {
    carId: parseInt(carId)
  };
  console.log("detailsControlers" , details);
  services.delete_('deleteCar', details)
    .then((result) => {
      console.log(`car with ID ${carId} deleted successfully` , result);
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(`Error deleted car with id ${carId}:`, err);
      res.status(500).send(error.message);
    });
});

module.exports = router;
