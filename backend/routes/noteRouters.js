const express = require('express');
const { getAllNotes, createNotes, updateNotes, deleteNotes } = require('../controllers/noteController');
const noteRouters = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

noteRouters.use(verifyJWT);

noteRouters.route("/")
    .get(getAllNotes)
    .post(createNotes)
    .patch(updateNotes)
    .delete(deleteNotes)

module.exports = noteRouters;