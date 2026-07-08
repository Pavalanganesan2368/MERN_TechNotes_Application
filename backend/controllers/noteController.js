const asyncHandler = require("express-async-handler");
const Note = require("../model/Note");
const User = require("../model/User");
const Counter = require("../model/Counter");

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();
    if (!notes?.length)
      return res.status(404).json({ message: "Notes not found!." });

    const notesWithUser = await Promise.all(
      notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec();
        return { ...note, username: user.username };
      }),
    );

    res.status(200).json(notesWithUser);
});

const createNotes = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    if (!user || !title || !text)
      return res.status(400).json({ message: "All Fields are required." });

    const duplicate = await Note.findOne({ title }).collation({ locale: "en", strength: 2 }).lean().exec();

    if (duplicate)
      return res.status(409).json({ message: "Duplicate note title" });

    const counter = await Counter.findOneAndUpdate(
      { _id: "ticketNums" },
      { $inc: { seq: 1 }},
      { 
        returnDocument: "after",
        upsert: true
      }
    )

    const newNotes = {
      user,
      ticket: counter.seq,
      title,
      text
    };

    const notes = await Note.create(newNotes);
    if (notes)
      res.status(200).json(notes);
    else res.status(400).json({ message: "Invalid note data received" });
});

const updateNotes = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;
    if (!id || !user || !title || !text || typeof completed !== "boolean")
      return res.status(404).json({ message: "All the fields required." });

    const note = await Note.findById(id).exec();

    if (!note) return res.status(400).json({ message: "Notes not found. "});

    const duplicate = await Note.findOne({ title }).collation({ locale: "en", strength: 2 }).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id) return res.status(409).json({ message: "Duplicate note title "});

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNotes = await note.save();
    res.status(200).json(`${updatedNotes.title} updated`);
});

const deleteNotes = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "Note ID Required "});

    const result = await Note.deleteOne();

    const username = req.username;
    const userId = req._id;

    const reply = `Note ${username} with ID ${userId} deleted`;

    res.status(200).json(reply);
});

module.exports = { createNotes, getAllNotes, updateNotes, deleteNotes };