const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');

function post(type, details) {
    const infoDetailsInArr = Object.values(details.infoDetails);
    const passwordDetailsInArr = Object.values(details.passwordDetails);
  
    // Chain promises for sequential execution
    return dal.create("addUserPassword", passwordDetailsInArr)
      .then((passwordResult) => {
        // const id = passwordResult;// Assume passwordResult contains the ID
        infoDetailsInArr.unshift(9);
        console.log(infoDetailsInArr);
        return dal.create("addUserInfo", infoDetailsInArr); // Pass the ID
      })
      .then((userInfoResult) => {
        console.log(userInfoResult); // Log the user info result
        return dal.get("getUserInfo", 9); // Get user info by ID
      })
      .then((user) => {
        console.log(user); // Log the complete user object
        return user; // Return the complete user object
      })
      .catch((error) => {
        console.error(error);
        // Handle errors appropriately (e.g., return an error object or message)
        throw new Error("An error occurred during user creation."); // Re-throw for global error handling
      });
  }
  


module.exports = { post };