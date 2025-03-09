const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input data",
        errors: errors.mapped()
      });
    }

    const { email, firstName, lastName, password, phone } = req.body;
    
    const HashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      email,
      firstName,
      lastName,
      password: HashedPassword,
      phone
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};
