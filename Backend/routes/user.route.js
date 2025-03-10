const userModel = require('../models/user.model');
const express = require('express');
const router  = express.Router();
const {body} = require('express-validator'); 
const userController = require('../controllers/user.controller'); 
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register',[
    body('email').isEmail().withMessage("The Email Is Not Valid"),
    body('password').isLength({min:6}).withMessage("The Password Should Have Atleast Six Characters"),
    body('fullName.firstName').isLength({min:3}).withMessage("The First Name Should Have Atleast Three Characters")

],userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage("The Email Is Not Valid"),
    body('password').isLength({min:6}).withMessage("The Password Should Have Atleast Six Characters"),
],userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getProfile);
router.get("/logout",authMiddleware.authUser, userController.logoutUser);





module.exports = router ;