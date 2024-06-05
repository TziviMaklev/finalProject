const express = require('express');
const router = express.Router();


post((type, details) => {
    const infoDetailsInArr = [...details.infoDetails];
    const passwordDetailsInArr = [...details.passwordDetails];
    let id;
    dal.get("getUserPassword", passwordDetailsInArr)
        .then((results) => {
            dal.post("addUserPassword", passwordDetailsInArr)
            .then((results) => {
                console.log(results);
                infoDetailsInArr.unshift(id);
            })
            .catch((err) => {
                return err;
            });
            dal.post("addUserInfo", infoDetailsInArr)
            .then((results) => {
                id=results;
            })
            .catch((err) => {
                return err;
            });
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


module.exports = router;