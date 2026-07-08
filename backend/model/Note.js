const mongoose = require("mongoose");
// const autoIncrement = require('mongoose-sequence')(mongoose);

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    ticket: {
      type: Number,
      required: true,
      unique: true
    },

    title: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    },
    
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;