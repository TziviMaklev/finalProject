const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');

const getAll = ((type, details) => {
    return dal.getAll(type, [])
        .then( (results) => {
            console.log("results2" , results);
            return results;
        })
        .catch((err) => {
            return err;
        });
});

module.exports = { getAll };