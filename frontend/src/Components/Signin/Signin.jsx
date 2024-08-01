import React, { useEffect, useState } from "react";
import { Alert, Snackbar, Button, Typography } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";
import { SIGNIN_EMLPWD } from "../Services/Api_Routes_Helper";
import { Link } from "react-router-dom";
const otpInputStyle = {
  padding: "10px 20px",
  fontSize: "1rem",
  color: "black",
  textAlign: "center",
};
const SignIn = () => {
  const intialValues = {
    email: "",
    password: "",
    loginrememberme: false,
  };
  const [formValues, setFormValues] = useState(intialValues);
  const { email, password } = formValues;

  //for hiding and display error(email & pwd)
  const [showErr, setshowErr] = React.useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [toggle1, setToggle1] = React.useState(false);

  const handleClosePopUpErr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setshowErr(false);
  };

  const handleInputEmailPwd = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
    // console.log(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const auth = getAuth();
    try {
      const { data, status } = await axios.post(`${SIGNIN_EMLPWD}`, {
        email,
        password,
      });
      // Check if the user's email is verified
      if (status === 200 && data !== null) {
        const { _id, email } = data?.data;
        localStorage.setItem(
          "userNew",
          JSON.stringify({ res: data?.data, role: "USER" })
        );
        localStorage.setItem("userID", _id);
        localStorage.setItem("email", email);
        setSuccessMsg("SignIn successfully!");
        setshowErr(true);
        window.location.assign("/home");
        // navigate("/", { preventScrollReset: true });
      }
    } catch (error) {
      console.error("Error during  user auth", error);
      const { status, data } = error?.response;

      switch (status) {
        case 404:
          setErrMsg(data?.message);
          break;
        case 401:
          setErrMsg(data?.message);
          break;
        case 500:
          setErrMsg(data?.message);
          break;
        default:
          setErrMsg("Unknown error occurred during user login");
          break;
      }
      setshowErr(true);
    }
  };

  // forgot page model
  // const [show, setShow] = useState(false);

  // const   = () => setShow(true);
  // const handleClose = () => setShow(false);
  const handleForgotPassword = async () => {
    try {
      if (!email) {
        setErrMsg("Please enter your email address.");
        setshowErr(true);
        return;
      }

      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      console.log("Password reset email sent successfully!");

      setshowErr(true);
      setSuccessMsg(
        "Password reset email sent successfully! Check your email."
      );
    } catch (error) {
      console.error("Error sending password reset email:", error.message);

      if (error.code === "auth/too-many-requests") {
        setErrMsg("Too many requests. Please try again later.");
      } else {
        setErrMsg("Error sending password reset email.");
      }

      setshowErr(true);
    }
  };

  return (
    <div className="loginsection">
      <div className="container">
        <Typography component={"h3"} variant="h5" sx={otpInputStyle}>
          Login with Email & Password
        </Typography>
        <form className="login-form" onSubmit={(event) => handleSubmit(event)}>
          <div className="form">
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder=" "
              name="email"
              onChange={handleInputEmailPwd}
              required
              value={email}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>

          {formErrors.email && (
            <span className="form-error">{formErrors.email}</span>
          )}

          <div className="form">
            <input
              // type="password"
              type={toggle1 ? "text" : "password"}
              id="password"
              className="form-input"
              placeholder=" "
              name="password"
              onChange={handleInputEmailPwd}
              value={password}
              required
              autoComplete="none"
              autoCapitalize="false"
            />
            <i
              id="showpass"
              // className="fa fa-eye icon"
              className={`fa ${toggle1 ? "fa-eye" : "fa-eye-slash"} icon`}
              onClick={() => {
                setToggle1(!toggle1);
              }}
            ></i>
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>

          {formErrors.password && (
            <span className="form-error">{formErrors.password}</span>
          )}

          <div className="forgotPassword">
            <p className="common-para" onClick={handleForgotPassword}>
              Forgot Password?
            </p>
          </div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ p: 1.5, fontSize: 16 }}
          >
            LOGIN
          </Button>
        </form>
        <p>
          Create a new Account !{" "}
          <Link
            to={"/signup"}
            style={{ textDecoration: "none", fontSize: "20", padding: 5 }}
          >
            Signup
          </Link>
        </p>
        {CustomAlertBar()}
      </div>
    </div>
  );

  function CustomAlertBar() {
    return (
      <Snackbar
        open={showErr}
        autoHideDuration={2500}
        onClose={handleClosePopUpErr}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClosePopUpErr}
          severity={errMsg ? "error" : "success"}
          sx={{ width: "100%", fontSize: 15 }}
        >
          {errMsg || successMsg}
        </Alert>
      </Snackbar>
    );
  }
};

export default SignIn;
