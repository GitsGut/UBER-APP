const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');




module.exports.authUser = async (req, res, next) => {
const token =  req.cookies.token || req.headers.authorization?.split(" ")[1];
if(!token)
{
    return res.status(401).json({message:"Unauthorized Access"});
}
const isBlackListed = await blacklistTokenModel.findOne({token : token});
if(isBlackListed)
{   console.log(`Blocked attempt with blacklisted token: ${token}`);
    return res.status(401).json({message:"Unauthorized Access"});
}
try
{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user  =  await userModel.findById(decoded._id);
    if(!user)
    {
        return res.status(401).json({message:"Unauthorized Access"});
    }
    req.user = user ; 
     next();

}
catch(error)
{ 
    return  res.status(401).json({message:"Unauthorized Access"});
}
}
module.exports.authCaptain = async (req, res, next) => {
    const token =  req.cookies.token || req.headers.authorization?.split(" ")[1];
 
    if(!token)
    {
        return res.status(400).json({message:"Unauthorized Access"});
    }
    const isBlackListed = await blacklistTokenModel.findOne({ token});
   
    if(isBlackListed)
    {
        return res.status(400).json({message:"The Token Is BlackListed"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
     
        if(!captain)
        {
            return res.status(400).json({message:"Unauthorized Access"});
        }
        
        req.captain = captain;
        next();
    }
    catch(error)
    {
        next(error);
    }
}