const userModel = require('../models/user.model');

module.exports.createUser = async (
{
 email , firstName , lastName , password
})=>
{
    if( !firstName || !email ||  !password)
    {
        throw new Error("All Fields Are Required");
    }
    const user =  userModel.create({email,
        fullName:{
        firstName ,
        lastName 
    },password })
    return user ;
};

module.exports.findUserByEmail = async (email)=>
{
    const user = userModel.findOne({email});
    return user ;
}