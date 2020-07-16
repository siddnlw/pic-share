const ImageRepository = require("../repositories/ImageRepository");

module.exports = {
  get: function(req, res) {
    var album_id = req.params.album_id;
    ImageRepository.all(album_id)
      .then(data => {
        res.send({
          success: true,
          data
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  },

  show: function(req, res) {
    var id = req.params.id;
    ImageRepository.find(id)
      .then(resp => {
        result = resp[0];
        res.send({
          result
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  },

  create: function(req, res) {
    var data = req.body;
    var file = req.file;
    ImageRepository.create(data, file)
      .then(result => {
        res.send({
          success: true,
          result: result
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  },

  update: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    ImageRepository.update(id, data)
      .then(result => {
        res.send({
          success: true,
          id: result._id
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  },

  delete: function(req, res) {
    var id = req.params.id;
    ImageRepository.delete(id)
      .then(result => {
        res.send({
          success: true
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  }
};
