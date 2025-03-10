import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary   from "../lib/cloudinary.js";


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


try {


  
const{email,password}=req.body;
if(!email||  !password){
  return res
  .status(400)
  .json({ message: "User Must Fill all the feilds" });
}
const user=await User.findOne({email})
if(!user){
  return res
  .status(400)
  .json({ message: "invalid credential" });
}



const isPasswordCorrect=bcrypt.compare(password,user.password)
if(!isPasswordCorrect){
  return res
  .status(400)
  .json({ message: "invalid credential" });
}

generateToken(user._id,res)
res.status(200).json({

  _id:user._id,
  fullName:user.fullName,
  email:user.email,
  profilePic:user.profilePic

})
  
} catch (error) {
  console.log(error,"error in login container");
  res.status(500).json({message:"internal server error"})
  
}



};

export const logout = (req, res) => {
try {
  res.cookie("jwt","",{maxAge:0});
  res.status(200).json({message:"logout successfully"})

} catch (error) {
  console.log(error,"error in logout container");
  res.status(500).json({message:"internal server error"})
  
}
};


export const updateProfile=async(req,res)=>{
   try { 
    const {profilePic}=req.body;
    const userId=req.user._id;
    if(!profilePic){
    return res.status(400).json({message:"Profile pic is required"})
    }

const uploadResponse=await cloudinary.uploader.upload(profilePic)
const updatedUser=await user.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
res.status(200).json(updatedUser)
   } catch (error) {
console.log("error in update profile",error);
res.status(500).json({message:"internal server error"});
   }
}

export const checkAuth=(req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checAuth controller",error.message);
    res.status(500).json({message:"Internal Server error in check auth"});
  }
}