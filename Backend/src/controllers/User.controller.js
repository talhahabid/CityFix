// import User from "../models/User.model.js";
// import jwt from "jsonwebtoken";

// const createToken = (id) => {
//   return jwt.sign({ _id: id }, process.env.JWT_SECRET_CODE, {
//     expiresIn: "3d",
//   });
// };

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const newUser = new User({ username, email, password });

//   try {
//     const existingUsername = await User.findOne({ username });
//     if (existingUsername) return next(errorHandler(409, "Username already exists"));

//     const existingEmail = await User.findOne({ email });
//     if (existingEmail) return next(errorHandler(409, "Email already exists"));

//     const temp = await newUser.save();
//     const jwtToken = createToken(temp._id);
//     await populateWorkout(temp._id);
//     res.status(201).json({ user: temp, jwtToken, message: "User sign up success" });

//   } catch (error) {
//     next(errorHandler(503, "Failed To Create User"));
//   }
// };

// /*
//   Success:
//     200 -> User found

//   Error checks include:
//     401 -> Incorrect password
//     404 -> Username not found
//     500 -> Other errors

// */
// export const signin = async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const existingUsername = await User.findOne({ username });
//     if (!existingUsername) return next(errorHandler(404, "Username not found"));

//     if (existingUsername.password == password) {
//       const jwtToken = createToken(existingUsername._id);
//       res.status(200).json({ user: existingUsername, jwtToken, message: "User found" });
      
//     } else {
//       return next(errorHandler(401, "Incorrect password"));
//     }
//   } catch (error) {
//     return next();
//   }
// };