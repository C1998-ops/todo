require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("../config/auth.config");
const expressAsyncHandler = require("express-async-handler");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PWD,
    // user: config.user,
    // pass: config.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
transporter.verify((err, data) => {
  if (err) console.error(err);
  console.log("smtp ready", data);
});

exports.sendConfirmationTokenMail = async (email, token) => {
  try {
    // console.log({ email, token });
    const mailOptions = {
      from: '"QuoteurPrice " <ndcsm9611595047@gmail.com>',
      to: "ckumargn1998@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from gmail using API",
      html: `<div class="v1block" style="box-sizing: border-box; width: 100%; margin-bottom: 30px; background: #ffffff; border: 1px solid #f0f0f0">
			<table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important" width="100%">
				<tbody>
					<tr>
						<td class="v1wrapper" style="box-sizing: border-box; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; padding: 30px" valign="top">
						<table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important" width="100%">
							<tbody>
								<tr>
									<td style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top" valign="top">
									<h2 style="margin: 0; margin-bottom: 30px; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important">You're on your way!<br>
									Let's confirm your email address.</h2>

									<p style="margin: 0; margin-bottom: 30px; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300">By clicking on the following link, you are confirming ${email} address.</p>
									</td>
								</tr>
								<tr>
									<td style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top" valign="top">
									<table cellpadding="0" cellspacing="0" class="v1btn v1btn-primary" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: 100%; border-collapse: separate !important" width="100%">
										<tbody>
											<tr>
												<td align="center" style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 15px" valign="top">
												<table cellpadding="0" cellspacing="0" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: auto; border-collapse: separate !important">
													<tbody>
														<tr>
															<td align="center" bgcolor="#348eda" style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; background-color: #348eda; border-radius: 2px; text-align: center" valign="top"><a href="http://localhost:3000/confirm/${token}" style="box-sizing: border-box; border-color: #348eda; font-weight: 400; text-decoration: none; display: inline-block; margin: 0; color: #ffffff; background-color: #348eda; border: solid 1px #348eda; border-radius: 2px; cursor: pointer; font-size: 14px; padding: 12px 45px" target="_blank" rel="noreferrer">Confirm Email Address</a></td>
														</tr>
													</tbody>
												</table>
												</td>
											</tr>
										</tbody>
									</table>
									</td>
								</tr>
							</tbody>
						</table>
						</td>
					</tr>
				</tbody>
			</table>
			</div>
        "  
       
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log(info.response);
    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
exports.resendTokenMail = async (token, res, email) => {
  try {
    // console.log(email);
    const mailOptions = {
      from: '"QuoteurPrice" <ndcsm9611595047@gmail.com>',
      to: "ckumargn1998@gmail.com",

      subject: "Account Activation Link",
      text: "Re-Send Account Confirmation",
      html: `<div class="v1block" style="box-sizing: border-box; width: 100%; margin-bottom: 30px; background: #ffffff; border: 1px solid #f0f0f0">
			<table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important" width="100%">
				<tbody>
					<tr>
						<td class="v1wrapper" style="box-sizing: border-box; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; padding: 30px" valign="top">
						<table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important" width="100%">
							<tbody>
								<tr>
									<td style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top" valign="top">
									<h2 style="margin: 0; margin-bottom: 30px; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important">You're on your way!<br>
									Let's confirm your email address.</h2>

									<p style="margin: 0; margin-bottom: 30px; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300">By clicking on the following link, you are confirming ${email} address.</p>
									</td>
								</tr>
								<tr>
									<td style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top" valign="top">
									<table cellpadding="0" cellspacing="0" class="v1btn v1btn-primary" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: 100%; border-collapse: separate !important" width="100%">
										<tbody>
											<tr>
												<td align="center" style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 15px" valign="top">
												<table cellpadding="0" cellspacing="0" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: auto; border-collapse: separate !important">
													<tbody>
														<tr>
															<td align="center" bgcolor="#348eda" style="box-sizing: border-box; padding: 0; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; background-color: #348eda; border-radius: 2px; text-align: center" valign="top"><a href="http://localhost:3000/confirm/${token}" style="box-sizing: border-box; border-color: #348eda; font-weight: 400; text-decoration: none; display: inline-block; margin: 0; color: #ffffff; background-color: #348eda; border: solid 1px #348eda; border-radius: 2px; cursor: pointer; font-size: 14px; padding: 12px 45px" target="_blank" rel="noreferrer">Confirm Email Address</a></td>
														</tr>
													</tbody>
												</table>
												</td>
											</tr>
										</tbody>
									</table>
									</td>
								</tr>
							</tbody>
						</table>
						</td>
					</tr>
				</tbody>
			</table>
			</div>
        "  
       
        `,
    };
    transporter.sendMail(mailOptions, (info, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfull.", info.message);
        return info.message; //make changes here if error occurs
      }

      // res.status(200).send({ type:"MESSAGE-SENT",message: `email sent successfully.` });
    });
  } catch (error) {
    console.error(error.message);
    return error;
  }
};
exports.sendMailOtp = async (email, otp) => {
  return new Promise((resolve, reject) => {
    try {
      const mailOptions = {
        from: '"CHETAN KUMAR GN " <ndcsm9611595047@gmail.com>',
        to: "ckumargn1998@gmail.com",
        subject: "OTP from QuoteurPrice",
        text: "Hello from gmail using API",
        html: `<h1>OTP Confirmation</h1>
          <p>Please use this otp to login to account ${email}.</p> 
          <h2>${otp}</h2>
        `,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info);
        }
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
exports.sendVendorMailOtp = async (email, otp) => {
  return new Promise((resolve, reject) => {
    try {
      const mailOptions = {
        from: '"CHETAN KUMAR GN " <ndcsm9611595047@gmail.com>',
        to: "ckumargn1998@gmail.com",
        subject: "OTP from QuoteurPrice",
        text: "Hello from gmail using API",
        html: `<h1>OTP Confirmation</h1>
          <p>Please use this otp to login to account ${email}.</p> 
          <h2>${otp}</h2>
        `,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info);
        }
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
exports.sendNewRfqMsg = expressAsyncHandler(async (email) => {
  return new Promise((resolve, reject) => {
    try {
      const mailOptions = {
        from: '"CHETAN KUMAR GN " <ndcsm9611595047@gmail.com>',
        to: "ckumargn1998@gmail.com",
        subject: "Received new RFQ request from QUP.",
        text: "Hello from gmail using API",
        html: `<section>
        <div class="rfq_Mail_wrap">
        <h1><i>Received new RFQ Request</i></h1>
        </div>
        <div style="width:100%;","max-width:100%;","display:flex;">
        <h4>You have Received a new RFQ request </h4>
          <p>Please respond with quotation for QUP Account.</p>
          <span>Email linked : ${email}</span>
          <a href="http://www.quoteurprice.com/" style="outline:none;font-size:17px;"><button type="button" style=
          "background-color: blue;"
          "padding: 5px 15px;"
          "color: white;"
          "font-size: smaller;"
          "border: 1px solid black;"
          "outline: none;"
          "border-radius: 10px;"
          "cursor: pointer;"
          >QuoteUrPrice !</button></a>
          </div>
          </section>
        `,
      };
      transporter.sendMail(mailOptions, (err, { response }) => {
        if (err) reject(err);
        console.log("rfq initiating mail sent.", response);
        resolve(response);
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
});
