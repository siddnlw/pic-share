const Image = require("../models").ImageModel;
const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuid/v4");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  all: album => {
    return Image.find({ album: ObjectId(album) }).populate("album", "title");
  },

  find: id => {
    return Image.find({ _id: id }).populate("album", "title");
  },

  create: (data, file) => {
    const tempPath = file.path;
    const name = uuidv4() + path.extname(file.originalname);
    const targetPath = path.join(__dirname, `../uploads/${name}`);
    fs.rename(tempPath, targetPath, err => {});
    let sanitizedData = { name, title: file.originalname, ...data };
    var image = new Image(sanitizedData);
    return image.save();
  },

  update: (id, data) => {
    return Image.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...data }
      }
    );
  },

  delete: id => {
    return Image.deleteOne({ _id: id });
  }
};
