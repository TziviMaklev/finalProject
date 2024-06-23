const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');

function post(type, details) {
    const infoDetailsInArr = Object.values(details.infoDetails);
    const passwordDetailsInArr =Object.values( details.passwordDetails );
    let id;
    dal.create("addUserPassword", passwordDetailsInArr)
        .then((results) => {
            console.log(results);
        })
        .catch((err) => {
            return err;
        });
    dal.create("addUserInfo", infoDetailsInArr)
        .then((results) => {
            id = results;
        })
        .catch((err) => {
            return err;
        });
    dal.get("getUserInfo", id)
        .then((results) => {
            console.log(results);
            return results
        })
        .catch((err) => {
            return err;
        });




};


module.exports = { post };