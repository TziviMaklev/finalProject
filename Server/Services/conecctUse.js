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

const get = ((type, details) => {
  const detailsInArr = Object.values(details);
  return dal.get(type, detailsInArr)
    .then((results) => {
      console.log("results4", results[0][0]);
      sendEmail(results[0][0].email, "dyuhi", `hi ${results[0][0].name} pleas connect me `)
      return results
    })
    .catch((err) => {
      return err;
    });
});

const post = ((type, details) => {
  const detailsInArr = Object.values(details);
  return dal.get(type[0], detailsInArr[0])
    .then((results) => {
      console.log("servicesResults" , results[0][0].email );
      sendEmail(results[0][0].email, "יצירת קשר", ` hi ${results[0 ][0].name} please connect whith ${detailsInArr[1].email} or call ${detailsInArr[1].phone} `)
      return dal.create(type[1], [detailsInArr[0] , detailsInArr[1].user_id , ` hi ${results[0 ][0].name} please connect whith ${detailsInArr[1].email} or call ${detailsInArr[1].phone}`])
    }).then((results) =>{
      console.log("servicesResultsAftet" ,results);
      return results
       })
    .catch((err) => {
      return err;
    });


})

module.exports = { get, post };