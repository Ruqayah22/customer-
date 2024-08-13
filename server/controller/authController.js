import userModel from "../models/userModel.js";
import {
  comparePassword,
  hashPassword,
  } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import  bcrypt  from 'bcrypt';
// import projectModel from "../models/ProjectSchema.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const serverUrl = process.env.SERVER_URL;

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    // check user count
    const userCount = await userModel.countDocuments();

    // determine role based on user count
    const role = userCount === 0 ? 1 : 0;

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
// // POST LOGIN
// export const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(404).send({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Check user
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "Email is not registered",
//       });
//     }

//     const match = await comparePassword(password, user.password);
//     if (!match) {
//       return res.status(200).send({
//         success: false,
//         message: "Invalid Password",
//       });
//     }

//     // Token
//     const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     // Check if user is an admin
//     if (user.role !== 1) {
//       // Not an admin, check if the user already has a project
//       let project = await projectModel.findOne({ owner: user._id });
      
//       if (!project) {
//         // No project found, create a new one
//         project = await new projectModel({
//           owner: user._id,
//           name: "New Project",
//           // Add any other default project settings here
//         }).save();
//       }

//       res.status(200).send({
//         success: true,
//         message: "Login successful, project initialized",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//         token,
//         project, // Include the project data in the response
//       });
//     } else {
//       // Admin user
//       res.status(200).send({
//         success: true,
//         message: "Login successful",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//         token,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in login",
//       error,
//     });
//   }
// };



// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password reset",
      // text: `http://localhost:3000/resetPassword/${token}`,
      text: `${serverUrl}/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("Error sending email: ", err.message);
        res.status(500).send({ success: false, message: `Error sending email: ${err.message}` });
      } else {
        res.status(200).send({ success: true, message: "Recovery email sent." });
      }
    });
  } catch (error) {
    console.error("Server error: ", error.message);
    res.status(500).send({ success: false, message: `Server error: ${error.message}` });
  }
};


// Reset Password Controller
export const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).send({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Find user
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Server error: ", error.message);
    res
      .status(500)
      .send({ success: false, message: `Server error: ${error.message}` });
  }
};



//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
