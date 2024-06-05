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

put((type, details) => {
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

post((type, details) => {
    const detailsInArr = [...details];
    dal.post(type, detailsInArr)
        .then((results) => {
            const id = results
            dal.get("getFurniture", id)
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