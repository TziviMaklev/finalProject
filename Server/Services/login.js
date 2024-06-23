const express = require('express');
const router = express.Router();


const get = ((type, details) => {
    const detailsInArr = [...details];
    dal.get("getUserPassword", detailsInArr)
        .then((results) => {
            //בדיקת תקינות
            dal.get("getUserInfo", detailsInArr)
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



module.exports = router;