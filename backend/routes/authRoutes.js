const express = require("express");
const authRouters = express.Router();
const loginLimiter = require('../middleware/loginLimiter');
const { login, refresh, logout } = require("../controllers/authController");
authRouters.route('/')
  .post(loginLimiter, login)

authRouters.route('/refresh')
  .get(refresh)

authRouters.route('/logout')
  .post(logout)

module.exports = authRouters;