import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import axios from "axios";
import SignInWithGoogle from "../Services/SigninWithGoogle";
const SignUp = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required("username is required")
      .min(3, "username length should be at least 3 characters"),
    email: Yup.string()
      .required("Email cannot be empty")
      .email("Invalid email-format"),
    phone: Yup.string()
      .required("Phone no. is required ")
      .max(10, "Enter the correct Mobile no.. "),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    matchPassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      matchPassword: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async ({
    username,
    email,
    matchPassword,
    password,
    phone,
  }) => {
    // event.preventDefault();
    let user = { username, email, matchPassword, password, phone };
    try {
      axios
        .post(`http://localhost:80/api/signup`, JSON.stringify(user), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          setOpen(true);
          console.log(res?.data);
        })
        .catch((err) => {
          console.log(err.message);
          if (err?.response) {
            console.log(err.message);
            setErrMsg(err.message);
          }
        });
      // console.log(JSON.stringify(user));
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No response from Server");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
      }
      console.error(error.message);
    }
  };

  const onErrors = (errors) => console.error(errors);
  //google
  const handleSignInWithGoogle = async (res) => {
    try {
      SignInWithGoogle()
        .then((res) => {
          console.log(res);
          if (res) {
            localStorage.setItem(
              "userNew",
              JSON.stringify({ res, role: "USER" })
            );
            window.location.assign("/home");
          }
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="Container">
      <Typography
        variant="h6"
        component={"h5"}
        className="bold-text"
        sx={{ color: "blueviolet", textAlign: "center" }}
      >
        Welcome Create Your Account!
      </Typography>
      <Snackbar
        open={open}
        autoHideDuration={300}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          sx={{ width: "100%", fontSize: 18 }}
        >
          Registration Successfull !
        </Alert>
      </Snackbar>
      <form
        className="register-section"
        onSubmit={handleSubmit(onSubmit, onErrors)}
      >
        <div className="form">
          <input
            type="text"
            className="form-input"
            id="username"
            placeholder=" "
            name="username"
            {...register("username")}
          />
          <label htmlFor="username" className="form-label">
            username
          </label>
        </div>
        {errors?.username && (
          <span className="form_error" role={"alertdialog"}>
            {errors?.username.message}
          </span>
        )}
        {/* for email */}
        <div className="form">
          <input
            type="text"
            className="form-input"
            id="email"
            placeholder=" "
            // name="email"
            {...register("email")}
          />
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
        </div>
        {errors?.email && (
          <span className="form_error">{errors?.email.message}</span>
        )}
        {/* for mobile number  */}
        <div className="form">
          <input
            type="number"
            id="phone"
            className="form-input"
            placeholder=" "
            // name="phone"
            {...register("phone")}
          />
          <label htmlFor="phone" className="form-label">
            Contact No.
          </label>
        </div>
        {errors?.phone && (
          <span className="form_error">{errors.phone.message}</span>
        )}

        <div className="form">
          <input
            type={toggle1 ? "text" : "password"}
            id="password"
            className="form-input"
            placeholder=" "
            // name="password"
            {...register("password")}
          />
          <i
            id="showpass"
            className="fa fa-eye icon"
            onClick={() => {
              setToggle1(!toggle1);
            }}
          ></i>
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>

        {errors?.password && (
          <span className="form_error">{errors?.password.message}</span>
        )}

        <div className="form">
          <input
            type={toggle2 ? "text" : "password"}
            id="repeat password"
            className="form-input"
            placeholder=" "
            // name="matchPassword"
            {...register("matchPassword")}
          />
          <i
            id="showpass"
            className="fa fa-eye icon"
            onClick={() => {
              setToggle2(!toggle2);
            }}
          ></i>
          <label htmlFor="repeat password" className="form-label">
            Confirm Password
          </label>
        </div>
        {errors?.matchPassword && (
          <span className="form_error">Passwords must be same.</span>
        )}
        <Button
          type="submit"
          value="REGISTER"
          className="qup_btn register-btn"
          variant="contained"
          sx={{ fontSize: 15, backgroundColor: "goldenrod" }}
        >
          Register
        </Button>
      </form>
      <div className="other_signUps">
        <p className="common-para">join us with your Google network</p>
        <div className="social-btn">
          <button
            type="button"
            className="qup_btn register-btn"
            onClick={handleSignInWithGoogle}
          >
            Signin with google <i className="fa fa-google"></i>
          </button>
        </div>
        <p className="common-para">
          Already have an account with us?{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", fontSize: "20", padding: 5 }}
          >
            {" "}
            SignIn{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
