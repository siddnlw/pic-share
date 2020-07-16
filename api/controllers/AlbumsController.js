const AlbumRepository = require("../repositories/AlbumRepository");

module.exports = {
  get: function(req, res) {
    AlbumRepository.all()
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
    AlbumRepository.find(id)
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
    data.user = req.userId;
    AlbumRepository.create(data)
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
    AlbumRepository.update(id, data)
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
    AlbumRepository.delete(id)
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
