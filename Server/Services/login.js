const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');

function post(type, details) {
    console.log("type");
    const detailsInArr = Object.values(details);
    return dal.get("getUserPassword", detailsInArr)
        .then((results) => {
            // console.log("results1", results[0][0].user_id);
              
            // console.log("use" , use);
            return dal.get("getUserInfo", [results[0][0].user_id]);
        })
        .then((user) => 
            {
                console.log('user3'  , user);
                return user[0][0]
            })
        .catch((error) => {
            console.error(error);
            throw new Error("rtyui");
        })

};



module.exports = { post };