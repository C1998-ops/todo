const asyncHandler = require("express-async-handler");
//models for data retrieval
const { SignupEmail, validate, TokenType } = require("../Models/OtpSignups");
const Token = require("../Models/TokenModel");
const bcrypt = require("bcrypt");
// const FreqRepeats = require("../Models/FreqRepeats");
const jwt = require("jsonwebtoken");

const expressAsyncHandler = require("express-async-handler");
const { sendErrorResponse, Custom400Error } = require("../utils/StandardResp");
const TaskModel = require("../Models/taskModel");

const timenow = new Date(Date.now());
//for setting up otp and token expiry
function AddMinutestoExpiryTOKEN(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}
function AddMinutestoExpiryOTP(date, min) {
  return new Date(date.getTime() + min * 60 * 1000);
}
function AddMinutesToExpiryRefreshToken(date, hrs) {
  return new Date(date.getTime() + hrs * 60 * 60 * 1000);
}

exports.SignupEmailO = asyncHandler(async (req, res) => {
  // const email = req.body.email.toLowerCase();
  const userdata = req.body;
  console.log("userdata", userdata);
  try {
    if (userdata !== null) {
      // create and save user
      const user = new SignupEmail(userdata);
      const newUser = await user.save();
      if (newUser) {
        console.log("User Registration Succesfull>> ");
      }

      res.status(201).send({
        type: "SUCCESS",
        message: "User Registration Successful!",
      });
    } else {
      throw new Error("Missing required fields");
    }
  } catch (error) {
    console.error("Error Saving data to server", error);
    res.status(500).send(error.message);
  }
});

exports.signInUser = expressAsyncHandler(async (req, res) => {
  try {
    const info = req.body;
    const userdata = await SignupEmail.findOne({
      email: info.email,
    });
    if (!userdata) {
      return res.status(400).json({
        type: "USER NOT-FOUND",
        message: "Requested user data not found",
      });
    }
    const comparePasswordAsync = (password, hashedPwd) => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPwd, function (err, isMatch) {
          if (err) reject(err);
          resolve(isMatch);
        });
      });
    };

    try {
      const isMatch = await comparePasswordAsync(
        info?.password,
        userdata?.password
      );
      if (isMatch) {
        res.status(200).json({
          type: "SUCCESS",
          message: "User login Successfull",
          data: userdata,
        });
      } else {
        // Passwords do not match, send an authentication failure response
        Custom400Error(res, {
          status: 401,
          type: "AUTHENTICATION-FAILURE",
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error(
        "error occured during pwd auth and token generation",
        error
      );
      throw new Error(error);
    }
  } catch (error) {
    console.error("Error during Signin", error);
    res.status(500).json({
      type: "server error",
      message: error.message + " " + "Create Password first!",
    });
  }
});
//controller to get current logged in user
exports.current_user = asyncHandler(async (req, res) => {
  try {
    console.log("current user", req.params);
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email-ID required" });
    }
    // return res.status(200).json(data);
    const data = await SignupEmail.find({ email })
      .select(["_id", "email", "Active", "isVerified"])
      .exec();
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      throw new Error("Email-Id not found");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(400).send({ status: "Failure", message: error.message });
  }
});
//contrller to handle creation of copy of user from firebase
exports.newFirebaseUser = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const currentUser = await SignupEmail.find({
      email: data.email,
      uid: data.uid,
    }).select(["email", "_id"]);

    if (currentUser.length > 0) {
      // const data = currentUser.map((res) => res._id).toLocaleString();
      res.status(409).json({ message: "user already exists", currentUser });
    } else {
      const newUser = new SignupEmail({
        email: data.email,
        uid: data.uid,
        authType: "firebase",
      });
      await newUser.save();
      console.log("user added to db successfully!", newUser);
      res.status(201).json({ status: "success", newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.getCurrProfileInfo = asyncHandler(async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: "Email-ID required" });
    // return res.status(200).json(data);
    const data = await SignupEmail.find({ email })
      .select([
        "firstName",
        "lastName",
        "phone",
        "address",
        "email",
        "isAvatarImageSet",
        "avatarImage",
        "address",
        // "password",
        // "confirmPassword",
      ])
      .exec();
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(401).json({ message: "Email Not found" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(400).send({ status: "Failure", message: error.message });
  }
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "id  required" });
    // return res.status(200).json(data);
    const data = await SignupEmail.findById(id);

    if (!data) return res.status(404).json("data not found");

    data.phone = req.body.phone || data?.phone;
    data.address = req.body.address || data?.address;
    data.firstName = req.body.firstName || data?.firstName;
    data.lastName = req.body.lastName || data?.lastName;
    data.address = req.body.address || data?.address;

    data.avatarImage = req.body.avatarImage || data?.avatarImage;

    const updatedData = await data.save();
    if (updatedData) {
      return res
        .status(200)
        .json({ message: "profile update successfully", data: updatedData });
    } else {
      throw new Error("Error updating user data");
    }
    // .select(["_id", "email", "Active", "isAvatarImageSet"])
    // .exec();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "Failure", message: error.message });
  }
});

exports.updateUser_Profile = expressAsyncHandler(async (req, res, next) => {
  try {
    const { avatarImage } = req.body;
    const id = req.params.id;
    const updateImage = await SignupEmail.findByIdAndUpdate(id, {
      $addToSet: { avatarImage },
    });
    res.status(200).json({
      message: "Update profile Image successfully",
      data: updateImage,
    });
  } catch (err) {
    next();
  }
});

exports.addTask = expressAsyncHandler(async (req, res) => {
  try {
    const request = req.body;
    await TaskModel.create(request);
    res.status(201).send("task has been created");
  } catch (error) {
    console.error("error occured while creating new task", error);
    res.status(500).send(error);
  }
});

exports.getTasks = expressAsyncHandler(async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    if (tasks.length > 0) {
      res
        .status(200)
        .json({ message: "Recent tasks has been fetched !", tasks });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

exports.editTodo = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    console.log("id", id);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
exports.updatetask = expressAsyncHandler(async (req, res) => {
  try {
    console.log("hit");
    const { id } = req.params;
    const { status } = req.body;
    console.log({ id, status });
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        is_done: status,
      },
      { new: false, upsert: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json("task updated");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error", error);
  }
});
