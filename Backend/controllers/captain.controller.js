const captainModel = require('../models/captain.model');
const { validationResult } = require("express-validator");
const captainService  = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');


 module.exports.registerCaptain = async  (req,res,next)=>
{
   try {const errors  = validationResult(req);
    if(!errors.isEmpty())
    {
        res.status(401).json({message :"Invalid Data Entered",
            status: "error",
            errors: errors.mapped(),
        });
    }
    const {email , fullName , password  , vehicle  } = req.body;
    const isCaptainExists = await  captainModel.findOne({email});
    if(isCaptainExists)
    {
        return res.status(401).json({message: " User Already Exists "});
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        email ,
        firstName : fullName.firstName ,
        lastName : fullName.lastName ,
        password :  hashedPassword ,
        color:vehicle.color ,
        plate :vehicle.plate  ,
        vehicleType:vehicle.vehicleType ,
        capacity:vehicle.capacity ,
    });
     console.log(captain);
    const token = captain.generateAuthToken();
    res.cookie("token", token );
    return res.status(201).json({token , captain :  captain.toJSON() , message:"Captain Registered Successfully"});}
    catch(error)
    {
        next(error);
    }

};
module.exports.loginCaptain = async(req,res,next)=>
{
  const errors = validationResult(req);
   if(!errors.isEmpty()){
      return rs.status(401).json({message :"Invalid Data Entered",
            status: "error",
            errors: errors.mapped(),
        });
   }
    const {email , password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain)
    {
        return res.status(401).json({message: "Invalid Email Or Password"});
    }
    const isPasswordValid = await captain.comparePassword(password);
    if(!isPasswordValid)
        {
            return res.status(400).json({message:"Invalid Email Or Password"});
        }
        const token = captain.generateAuthToken();
        res.cookie('token',token);
        
        return res.status(200).json({token , captain, message:"Login Successfull"});
    
}
module.exports.getProfile = async(req,res,next)=>
{
    res.status(200).json(req.captain);
}
module.exports.logoutCaptain = async(req,res,next)=>
{   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message:"Logout Successful"});
}