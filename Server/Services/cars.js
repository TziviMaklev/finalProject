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
        .then(async(results) => {
            const enrichedResults = results[0].map(async (result) => {
                // console.log(result.imageFilePath);
                const imagePath = path.resolve(__dirname, result.imageFilePath);
                const imageData = await fs.promises.readFile(imagePath);
                const imageBase64 = Buffer.from(imageData).toString('base64');
                return { ...result, imageData: imageBase64 }; // הוספת תמונה כ-base64
            });

            // console.log("results", enrichedResults);
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
    const detailsInArr = [details.animalId, ...details.animalDetails];

    dal.put(type, detailsInArr)
        .then((results) => {
            dal.get("getCar", detailsInArr[0])
                .then((results) => {
                    return results
                })
                .catch((err) => {
                    return err;
                });

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
    const detailsInArr = [details.carId];
    console.log("servicrsDetail" ,detailsInArr );
    return dal.delete_(type, detailsInArr)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return err;
        });
});

module.exports = { delete_, post, getAll, get, put, getNextCarId };