import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

if(!email|| !fullName|| !password){
    return res
    .status(400)
    .json({ message: "User Must Fill all the feilds" });
}



    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email }); //check if user already exists

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
        await generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("error in authController", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async(req, res) => {



const{email,password}=req.body;




};

export const logout = (req, res) => {
  res.send("logout route");
};
