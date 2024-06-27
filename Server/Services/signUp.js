const express = require('express');
const router = express.Router();
const dal = require('../Repositories/dal/crud_functions');
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, body) {
  // הגדרות SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'edusync3@gmail.com',
      pass: 'orry nddi nmtn bxnj'
    }
  });

  // יצירת הודעת הדוא"ל
  const message = {
    from: '"yad 2" <tm0527171162@gmail.com>',
    to: to,
    subject: subject,
    text: body
  };

  // שליחת הדוא"ל
  await transporter.sendMail(message);
  console.log('דוא"ל נשלח בהצלחה!');
}

function post(type, details) {
  const infoDetailsInArr = Object.values(details.infoDetails);
  const passwordDetailsInArr = Object.values(details.passwordDetails);
  // Chain promises for sequential execution
  return dal.get("getUserPassword", passwordDetailsInArr)
  // .then(
    // (results) => {
    //   console.log("results1", results[0][0].user_id);
    //   return dal.get("getUserInfo", [results[0][0].user_id]);
    // })
    .then((results) => {
      console.log(results[0]);
      if (results[0].length != []) {
        throw new Error("the user is already exist");
      }
      else {
        return dal.create("addUserPassword", passwordDetailsInArr)
      }
    })
    .then((passwordResult) => {
      console.log("passwordResult", passwordResult[0].insertId);
      infoDetailsInArr.unshift(passwordResult[0].insertId);
      return dal.create("addUserInfo", infoDetailsInArr); // Pass the ID
    })
    .then(() => {
      console.log("userInfoResult", infoDetailsInArr[0]);
      return dal.get("getUserInfo", infoDetailsInArr[0]); // Get user info by ID
    })
    .then((user) => {
      sendEmail(user[0][0].email, "WELCOM TO USE", "😜😜😜😜😜");
      console.log("user", user[0][0]);
      return user[0][0]; // Return the complete user object
    })
    .catch((error) => {
      console.error(error);
      // Handle errors appropriately (e.g., return an error object or message)
      throw new Error(error); // Re-throw for global error handling
    });
  // return dal.create("addUserPassword", passwordDetailsInArr)
  //   .then((passwordResult) => {
  //     console.log("passwordResult", passwordResult[0].insertId);
  //     infoDetailsInArr.unshift(passwordResult[0].insertId);
  //     return dal.create("addUserInfo", infoDetailsInArr); // Pass the ID
  //   })
  //   .then(() => {
  //     console.log("userInfoResult", infoDetailsInArr[0]);
  //     return dal.get("getUserInfo", infoDetailsInArr[0]); // Get user info by ID
  //   })
  //   .then((user) => {
  //     sendEmail(user[0][0].email, "WELCOM TO USE", "😜😜😜😜😜");
  //     console.log("user", user[0][0]);
  //     return user[0][0]; // Return the complete user object
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     // Handle errors appropriately (e.g., return an error object or message)
  //     throw new Error("An error occurred during user creation."); // Re-throw for global error handling
  //   });
}



module.exports = { post };