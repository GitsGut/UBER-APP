const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema =  new mongoose.Schema({
    fullName:{
        firstName:{
         type : String,
         required : true,
         minlength:[3,"The First Name Should Have Atleast three Letters "]
        },
        lastName:{
         type : String,
         
         minlength :[3,"The Last Name Should Have Atleast three Letters "]
        }},
      email : {
         required: true,
         type : String,
         unique : true,
         minlength : [6,"The Email Should Have Atleast Six Letters "]
      },
      password : {
         required: true,
         type : String,
         select: false
         },
         socketId : {
            type : String
          },

          status :
          { type : String,
            enum:['active','inactive'],
            default : "inactive"
          },
          vehicle :
          {
             color :
             {
                    required: true,
                    type : String,
                    minlength : [3,"The Plate  Should Have Atleast  3 Characters"]
             },
             plate :
             {
                 required : true ,
                 type : String,
                 minlength : [3,"The Plate  Should Have Atleast  3 Characters"]
             },
             capacity :
             {
                required  : true ,
                type : Number ,
                min : [1,"the capacity must greater equal to 1 "]
             },
             vehicleType :
             {
                required : true,
                type : String ,
                enum: ['car','bike','auto']
             }
          },
          location :
            {
                latitude :
                {
                    type: Number ,
                    
                },
                longitude :
                {
                    type: Number ,
                  
                }
            }

});


captainSchema.methods.generateAuthToken = function()
{
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token ;
}

captainSchema.methods.comparePassword = async function(password)
{
    return await bcrypt.compare(password , this.password);
}
captainSchema.statics.hashPassword = async function(password)
{
    return await bcrypt.hash(password,10);
}


module.exports = mongoose.model('captainModel',captainSchema);