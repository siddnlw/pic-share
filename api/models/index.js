const UserModel = require("./UserModel");
const AlbumModel = require("./AlbumModel");
const ImageModel = require("./ImageModel");
const mongoose = require("mongoose");

module.exports = {
  UserModel: mongoose.model("user", UserModel),
  AlbumModel: mongoose.model("album", AlbumModel),
  ImageModel: mongoose.model("image", ImageModel)
};
