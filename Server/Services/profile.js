const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');
const fs = require('fs');
const path = require('path');


const post = ((type, details) => {
    console.log("servicies profile");
    const detailsInArr = [details.userId, details.imageNavigte];
    console.log(detailsInArr);
    return dal.get("getProfile", detailsInArr)
        .then(async (result) => {
            console.log("car", result)
            if (result[0][0] != []) {
                const imagePath = path.resolve(__dirname, result[0][0].profile_);
                const imageData = await fs.promises.readFile(imagePath);
                const imageBase64 = Buffer.from(imageData).toString('base64');
                return { userId: result[0][0], imageData:imageBase64 };
            }
            else {
                const resoults = dal.create(type, detailsInArr);
                const imagePath = path.resolve(__dirname, resoults[0][0].profile_);
                const imageData = await fs.promises.readFile(imagePath);
                const imageBase64 = Buffer.from(imageData).toString('base64');
                return { userId: resoults[0][0], imageData: imageBase64 };
            }
        })
        .catch((err) => {
            return err;
        });


})

const get = ((type, details) => {
    const detailsInArr = [details.userId];
    console.log(detailsInArr);
    return dal.get(type, detailsInArr)
        .then(async (results) => {
            // const enrichedResults = results[0].map(async (result) => {
            //     const imagePath = path.resolve(__dirname, result.imageFilePath);
            //     const imageData = await fs.promises.readFile(imagePath);
            //     const imageBase64 = Buffer.from(imageData).toString('base64');
            //     return { ...result, imageData: imageBase64 }; 
            // });

            // const finalResults = await Promise.all(enrichedResults);
            // return finalResults;
            const imagePath = path.resolve(__dirname, results[0][0].profile_);
            const imageData = await fs.promises.readFile(imagePath);
            const imageBase64 = Buffer.from(imageData).toString('base64');
            return { userId: results[0][0], imageData: imageBase64 };
            // const img = convertUrlToImageFile(results[0][0].profile_);
            // console.log("getResults", results[0][0]);
            // return [results[0][0].user_id , img ]
        })
        .catch((err) => {
            return err;
        });
});


module.exports = { post, get };