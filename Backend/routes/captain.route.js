const express = require('express');
const router = express.Router();
const captainModel = require('../models/captain.model');
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage("The Email Is Not Valid"),
    body('password').isLength({min:6}).withMessage("The Password Should Have Atleast Six Characters"),
    body('fullName.firstName').isLength({min:3}).withMessage("The First Name Should Have Atleast Three Characters"),
    body('vehicle.color').isLength({min:3}).withMessage("The Vehicle Color Should Have Atleast Three Characters"),
    body('vehicle.plate').isLength({min:3}).withMessage("The Vehicle  plate code  Should Have Atleast Three Characters"),
    body('vehicle.capacity').isInt({min:1}).withMessage("The Vehicle Capacity Should be Atleast  1 "),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage(" Not A Valid Vehicle")
],captainController.registerCaptain)
router.post('/login',[
    body('email').isEmail().withMessage("The Email Is Not Valid"),
    body('password').isLength({min:6}).withMessage("The Password Should Have Atleast Six Characters"),
],
    captainController.loginCaptain)
router.get('/profile',authMiddleware.authCaptain,captainController.getProfile);
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)

module.exports = router;