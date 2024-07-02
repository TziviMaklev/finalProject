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

function generateRandomPassword() {
  const passwordLength = 6; // Set password length to 6 digits

  const passwordChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Define all possible password characters

  let password = ''; // Initialize empty password string

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * passwordChars.length); // Generate random index within character range
    password += passwordChars[randomIndex]; // Append random character to password
  }

  return password; // Return the generated password
}

// function post(type, details) {
//   const infoDetailsInArr = Object.values(details.infoDetails);
//   const passwordDetailsInArr = Object.values(details.passwordDetails);
//   const trySignUpInArr = Object.values(details.trySignUp);
//   return dal.get("getUserPassword", passwordDetailsInArr)
//     .then((results) => {
//       console.log(results[0]);
//       if (results[0].length != []) {
//         throw new Error("the user is already exist");
//       }
//       else {
//         return dal.create("addUserPassword", passwordDetailsInArr)
//       }
//     })
//     .then((passwordResult) => {
//       console.log("passwordResult", passwordResult[0].insertId);
//       infoDetailsInArr.unshift(passwordResult[0].insertId);
//       return dal.create("addUserInfo", infoDetailsInArr); // Pass the ID
//     })
//     .then(() => {
//       console.log("userInfoResult", infoDetailsInArr[0]);
//       return dal.get("getUserInfo", infoDetailsInArr[0]); // Get user info by ID
//     })
//     .then((user) => {
//       sendEmail(user[0][0].email, "WELCOM TO USE", "😜😜😜😜😜");
//       console.log("user", user[0][0]);
//       return user[0][0]; // Return the complete user object
//     })
//     .catch((error) => {
//       console.error(error);
//       // Handle errors appropriately (e.g., return an error object or message)
//       throw new Error(error); // Re-throw for global error handling
//     });
//   // return dal.create("addUserPassword", passwordDetailsInArr)
//   //   .then((passwordResult) => {
//   //     console.log("passwordResult", passwordResult[0].insertId);
//   //     infoDetailsInArr.unshift(passwordResult[0].insertId);
//   //     return dal.create("addUserInfo", infoDetailsInArr); // Pass the ID
//   //   })
//   //   .then(() => {
//   //     console.log("userInfoResult", infoDetailsInArr[0]);
//   //     return dal.get("getUserInfo", infoDetailsInArr[0]); // Get user info by ID
//   //   })
//   //   .then((user) => {
//   //     sendEmail(user[0][0].email, "WELCOM TO USE", "😜😜😜😜😜");
//   //     console.log("user", user[0][0]);
//   //     return user[0][0]; // Return the complete user object
//   //   })
//   //   .catch((error) => {
//   //     console.error(error);
//   //     // Handle errors appropriately (e.g., return an error object or message)
//   //     throw new Error("An error occurred during user creation."); // Re-throw for global error handling
//   //   });
// }
function post(type, details) {
  const infoDetailsInArr = Object.values(details.infoDetails);
  const passwordDetailsInArr = Object.values(details.passwordDetails);
  const trySignUpInArr = Object.values(details.trySignUp);
  return dal.get("getUTryUserDetails",trySignUpInArr )
     .then((results) => {
      if(results[0].length ===0 ){
        throw new Error("the password not the same")
      }
      console.log("getUTryUserDetails" , results[0]);
      return dal.get("getUserPassword", passwordDetailsInArr)
  })
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

const get = ((type, details) => {
  const detailsInArr = Object.values(details);
  let password =   generateRandomPassword()
  sendEmail(detailsInArr[0] , 'your password',`ellow  ${detailsInArr[0]} \n your password is :${password}`)
  return dal.create('trySignUp' , [detailsInArr[0] , password])
      .then((results) => {
          console.log("getResults try signUp", results);
          return results
      })
      .catch((err) => {
          return err;
      });
});


module.exports = { post , get };