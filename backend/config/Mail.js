const dotenv = require("dotenv");
require("dotenv").config();
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    console.log(accessToken);
    let testaccount = await nodemailer.createTestAccount();
    console.log(testaccount);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smpt.ethereal.com",
      secure: true,
      auth: {
        type: "oauth2",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        user: "ndcsm9611595047@gmail.com",
        pass: process.env.EMAIL_TEST_APP_PWD,
      },
    });
    const mailOptions = {
      from: '"CHETAN KUMAR GN " <ndcsm9611595047@gmail.com>',
      to: "tharani3920@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: "<h1>Hello from gmail email using API</h1>",
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// const sendOtp = async (otp) => {
//   const mailOptions = {
//     from: 'ndcsm9611595047@gmail.com',
//     to:'k.chetan@peerme.tech',
//     subject: 'Your OTP',
//     text: `Your OTP is ${otp}`
//   };
//  transporter.sendMail(mailOptions,function (err, info) {

//     mailOptions.err = err;
//     mailOptions.info = info;
//     mailOptions.status = (info !== null || info !== undefined);
//     if (err) {
//         console.log(err);
//         reject(err);

//     } else {
//         console.log(info);
//         resolve(info);
//     }
//     });
// };

// Generate OTP and send it to user

// const otp = Math.floor((Math.random() * 1000000)+1);
// console.log(otp);
sendMail()
  .then((result) => console.log("email sent", result))
  .catch((error) => console.error(error.message));
