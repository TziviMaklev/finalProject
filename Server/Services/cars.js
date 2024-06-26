const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');
const fs = require('fs');
const path = require('path');
const { lookupService } = require('dns/promises');

async function convertUrlToImageFile(url) {
    const imagePath = path.join(__dirname, 'IMAGES', url);
    if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');
        return imageBase64;
    }
}

const getNextCarId = async () => {
    const id = await dal.getNextId("getNextCarId");
    return id;
}

const getAll = ((type, details) => {
    return dal.getAll(type, [])
        .then(async (results) => {
            const enrichedResults = results[0].map(async (result) => {
                const imagePath = path.resolve(__dirname, result.imageFilePath);
                const imageData = await fs.promises.readFile(imagePath);
                const imageBase64 = Buffer.from(imageData).toString('base64');
                return { ...result, imageData: imageBase64 }; // הוספת תמונה כ-base64
            });

            const finalResults = await Promise.all(enrichedResults);
            return finalResults;
        })
        .catch((err) => {
            return err;
        });
});


const get = ((type, details) => {
    const detailsInArr = Object.values(details);
    dal.get(type, detailsInArr)
        .then((results) => {
            console.log("getResults", results);
            return results
        })
        .catch((err) => {
            return err;
        });
});

const put = ((type, details) => {
    const detailsInArr = Object.values(details.carDetails);
    detailsInArr.push(details.imageNavigte,details.carId);
    detailsInArr[0] = parseInt(detailsInArr[0]);
    console.log("detailsInArr" , detailsInArr);
    return dal.update(type, detailsInArr)
        .then((results) => {
            return dal.get("getCar", details.carId)
        })
        .then((results) => {
            console.log("results" , results);
            return results
        })
        .catch((err) => {
            return err;
        });

});

const post = ((type, details) => {
    const detailsInArr = Object.values(details.carDetails);
    detailsInArr.push("car", details.imageNavigte)
    return dal.create(type, detailsInArr)
        .then((car) => {
            console.log("car", car)
            const img = convertUrlToImageFile(details.imageNavigte);
            return { ...cartWithoutImg, img: img };
        })
        .catch((err) => {
            return err;
        });


})


const delete_ = ((type, details) => {
    const detailsInArr = [details.user_id , details.carId , "car"];
    console.log("delete", detailsInArr);
    return dal.delete_(type, detailsInArr[1])
        .then(() => {
            dal.delete_("deleteReservedAds" ,detailsInArr)
            return dal.getAll("getAllCars", [])
        })
        .then(async (results) => {
            const enrichedResults = results[0].map(async (result) => {
                const imagePath = path.resolve(__dirname, result.imageFilePath);
                const imageData = await fs.promises.readFile(imagePath);
                const imageBase64 = Buffer.from(imageData).toString('base64');
                return { ...result, imageData: imageBase64 };
            });
            const finalResults = await Promise.all(enrichedResults);
            return finalResults;
        })
        .catch((err) => {
            return err;
        });
});

module.exports = { delete_, post, getAll, get, put, getNextCarId };