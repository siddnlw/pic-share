const mongoose = require("mongoose");

const AlbumModel = new mongoose.Schema({
  title: { type: String, required: true },
  created_at: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = AlbumModel;
