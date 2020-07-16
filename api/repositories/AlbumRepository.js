const Album = require("../models").AlbumModel;

module.exports = {
  all: () => {
    return Album.find().populate("user", "name");
  },

  find: id => {
    return Album.find({ _id: id }).populate("user", "name");
  },

  create: data => {
    var album = new Album(data);
    return album.save();
  },

  update: (id, data) => {
    return Album.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...data }
      }
    );
  },

  delete: id => {
    return Album.deleteOne({ _id: id });
  }
};
