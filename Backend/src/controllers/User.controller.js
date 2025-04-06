import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET_CODE, {
    expiresIn: "1d",
  });
};

export const signup = async (req, res, next) => {
  const USER_TYPE = "citizen";
  const { email, password } = req.body;
  const newUser = new User({ email, password, userType: USER_TYPE });

  try {
    // console.log("Working1")
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return next(errorHandler(409, "Email already exists"));
    // console.log("Working1")
    const temp = await newUser.save();
    const jwtToken = createToken(temp._id);
    res
      .status(201)
      .json({ user: temp, jwtToken, message: "User sign up success" });
  } catch (error) {
    next(errorHandler(503, error.message));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (!existingEmail) return next(errorHandler(404, "Email not found"));

    if (existingEmail.password == password) {
      const jwtToken = createToken(existingEmail._id);
      res.status(200).json({
        user: existingEmail,
        jwtToken,
        message: "User log in success",
      });
    } else {
      return next(errorHandler(401, "Incorrect password"));
    }
  } catch (error) {
    return next();
  }
};
