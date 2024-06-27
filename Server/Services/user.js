const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');

const getAll = ((type, details) => {
    const detailsInArr = [...details];
    dal.getAll(type, detailsInArr)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return err;
        });
});

const get  =((type, details) => {
    const detailsInArr = Object.values(details);
    return dal.get(type, detailsInArr)
        .then((results) => {
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
            dal.get("getUserInfo", detailsInArr[0] )
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
    const detailsInArr = [...details];
    dal.post(type, detailsInArr)
        .then((results) => {
            const id = results
            dal.get("getUserInfo", id)
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

module.exports = {delete_ , post , put ,get , getAll};