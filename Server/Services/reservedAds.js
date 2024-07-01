const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');

const fs = require('fs');
const path = require('path');

const getAll  =((type, details) => {
    const detailsInArr = Object.values(details);
    console.log(type, detailsInArr);
    console.log(detailsInArr);
    let results1 ,results2;
 
    return  dal.getAll(type[0], detailsInArr)
        .then(async(results) => {
            console.log("results1", results);
            const enrichedResults = results[0].map(async (result) => {
                const imagePath = path.resolve(__dirname, result.imageFilePath);
                const imageData = await fs.promises.readFile(imagePath);
                const imageBase64 = Buffer.from(imageData).toString('base64');
                return { ...result, imageData: imageBase64 }; // הוספת תמונה כ-base64
            });
            const finalResults = await Promise.all(enrichedResults);
            results1 = finalResults;
            return  dal.getAll(type[1], detailsInArr)
        })
        .then(async(results) => {
            console.log("results1", results);
            const enrichedResults = results[0].map(async (result) => {
                const imagePath = path.resolve(__dirname, result.imageFilePath);
                const imageData = await fs.promises.readFile(imagePath);
                const imageBase64 = Buffer.from(imageData).toString('base64');
                return { ...result, imageData: imageBase64 }; // הוספת תמונה כ-base64
            });
            const finalResults = await Promise.all(enrichedResults);
            results2 = finalResults;
            // results2= results;
            console.log("results2" ,results);
            return [[results1[0]], [results2[0]]];
        })
        .catch((err) => {
            return err;
        });
});

const get = ((type, details) => {
    const detailsInArr = [...details];
    dal.get(type, detailsInArr)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return err;
        });
});



const post = ((type, details) => {
    const detailsInArr = Object.values(details.adsDetails);
    return dal.create(type, detailsInArr)
        .then((results) => {
            const id = results
            dal.get("getAds", id)
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


})


const delete_ = ((type, details) => {
    const detailsInArr = [...details];
    dal.delete_(type, detailsInArr)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return err;
        });
});

module.exports = {getAll , get  , post , delete_};