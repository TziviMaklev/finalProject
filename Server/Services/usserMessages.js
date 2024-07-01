const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');

 const getAll = ((type, details) => {
    const detailsInArr = Object.values(details);
    console.log(detailsInArr);
    return dal.getAll(type, detailsInArr)
        .then((results) => {
            
            return  results ;
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
    const detailsInArr = [...details];
    dal.post(type, detailsInArr)
        .then((results) => {
            const id = results
            dal.get("getMessage", id)
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
    const detailsInArr = [details.messageId , details.userId];
    detailsInArr[0] =parseInt(detailsInArr[0]);
    detailsInArr[1] =parseInt(detailsInArr[1])
    console.log(detailsInArr);
    return dal.delete_(type, detailsInArr)
        .then((results) => {
            return dal.getAll("getAllMessages", [detailsInArr[1]])
        })
        .then((results) => {
            console.log("delete" , results);
            return results;
        })
        .catch((err) => {
            console.log("server error" , err);
            return err;
        });
});

module.exports = { getAll, get, post, delete_ };


