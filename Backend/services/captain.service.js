const express = require('express');
const captainModel = require('../models/captain.model');
const { default: mongoose } = require('mongoose');

module.exports.createCaptain = async({
    email , firstName , lastName , password  , color , plate , capacity , vehicleType , 
})=>
{
    if( !firstName || !email ||  !password  || !color || !plate || !capacity || !vehicleType )
        {
            throw new Error("All Fields Are Required");
        } 

        const captain = captainModel.create(
            {
                email : email ,
                fullName :
                {
                    firstName,
                    lastName 
                },
                password,
                vehicle :
                {
                    color ,
                    plate ,
                    vehicleType,
                    capacity
                },
                
            }
        )
        return captain ;
}