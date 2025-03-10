const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input data",
        errors: errors.mapped(),
      });
    }

    const { email, fullName , password } = req.body;
  const isuserExists = await  userModel.findOne({email});
    if(isuserExists)
    {
        return res.status(401).json({message: " User Already Exists "});
    }
    const HashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      email,
      firstName : fullName.firstName,
      lastName  : fullName.lastName,
      password: HashedPassword,
    
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()
      });
    }
    const { email, password } = req.body;
    console.log(req.body);
       const user =  await  userModel.findOne({email}).select("+password");;
    if (!user) {
      return res.status(401).json({message : "invalid email or password"});
    }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return  res.status(401).json({
          message: "Invalid email or password"
        });
      }
     const token = user.generateAuthToken();
         res.cookie("token", token );
      return   res.status(200).json({token , user });
    }
   catch (error) {
    next(error);
  }
}

module.exports.getProfile = async(req,res,next)=>
{
     res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next)=>
{
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization().split(" ")[1];
  await blackListTokenModel.create({    token    })
  res.status(200).json({message: "logged out" });
}