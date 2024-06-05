const express = require('express');
const router = express.Router();

getAll((type, details) => {
    const detailsInArr = [...details];
    dal.getAll(type, detailsInArr)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return err;
        });
});

get((type, details) => {
    const detailsInArr = [...details];
    dal.get(type, detailsInArr)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return err;
        });
});



post((type, details) => {
    const detailsInArr = [...details];
    dal.post(type, detailsInArr)
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


delete_((type, details) => {
    const detailsInArr = [...details];
    dal.delete_(type, detailsInArr)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return err;
        });
});

module.exports = router;