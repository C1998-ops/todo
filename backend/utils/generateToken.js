const jwt = require("jsonwebtoken");
// const jwtsecret = myquotes;
const generateToken = (res, userId) => {
  // console.log(userId);
  const token = jwt.sign({ userId }, "123567", {
    expiresIn: "30d",
  });
  // console.log(token);
  // res.cookie("jwt", "123456", {
  //   httpOnly: true,
  //   secure: true,
  //   path: "/vendor/signup",
  //   sameSite: "lax", // Prevent CSRF attacks

  //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  // });
};
module.exports = generateToken;
