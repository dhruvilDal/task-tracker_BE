const express = require('express');
const { validate } = require('../../lib/expressValidation');

const userController = require('./user.controller');
const userValidation = require('./user.validation');
const router = express.Router();

router.route('/')
  .post(
    validate(userValidation.createUser),
    userController.createUser.bind(userController),
  );

router.route('/login')
  .post(
    validate(userValidation.loginUser),
    userController.loginUser.bind(userController),
  );

module.exports = router;
