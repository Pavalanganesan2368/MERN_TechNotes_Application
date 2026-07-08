const express = require('express');
const { getAllUsers, createNewUser, updateUser, deleteUser } = require('../controllers/userControllers');
const userRouters = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

userRouters.use(verifyJWT);

userRouters.route("/")
    .get(getAllUsers)
    .post(createNewUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = userRouters;