const userModel = require('../models/user.model');
const express = require('express');
const router  = express.Router();
const {body} = require('express-validator'); 
const userController = require('../controllers/user.controller');  


router.post('/register',[
    body('email').isEmail().withMessage("The Email Is Not Valid"),
    body('password').isLength({min:6}).withMessage("The Password Should Have Atleast Six Characters"),
    body('fullName.firstName').isLength({min:3}).withMessage("The First Name Should Have Atleast Three Characters")

],userController.registerUser);





module.exports = router ;