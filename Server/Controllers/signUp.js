const express = require('express');
const router = express.Router();
const services = require('../Services/signUp'); // Assuming the service file is named signUp.
const nodemailer = require('nodemailer');
// async function sendEmail(to, subject, body) {
//   // הגדרות SMTP
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.example.com',
//     port: 587,
//     auth: {
//       user: 'tm0527171162@gmail.com',
//       pass: 'idontletyoutoentermyemail'
//     }
//   });

//   // יצירת הודעת הדוא"ל
//   const message = {
//     from: '"Your Name" <tm0527171162@gmail.com>',
//     to: to,
//     subject: subject,
//     text: body
//   };

//   // שליחת הדוא"ל
//   await transporter.sendMail(message);
//   console.log('דוא"ל נשלח בהצלחה!');
// }


// דוגמה לשימוש
function sendTemporaryPasswordToCustomerEmail(customer) {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'tm0527171162@gmail.com',
          pass: 'bysr woai nxmd jtti'
      }
  });

  const mailOptions = {
      from: 'tm0527171162@gmail.com',
      to: customer,
      subject: 'שלום וברכה',
      text: `${customer.temporary_password}  -זוהי הסיסמא הזמנית שלך`
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.error(error);
      }
  });

}
console.log("sighUp controlers");
router.post('/', (req, res) => {
  console.log("post sighup controlers");
  // Assuming services.create returns a Promise or throws an error
  services.post("signUp", req.body)
    .then((result) => {
      sendTemporaryPasswordToCustomerEmail('tm0527171162@gmail.com');
      console.log("signUp is successful");
      res.status(200).send(result);

    })
    .catch((err) => {
      console.error('Error with signUp:', err);
      res.status(500).json({ error: 'An error occurred while signUp' });
    });
});

module.exports = router;

