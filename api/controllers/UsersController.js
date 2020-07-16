const UserRepository = require("../repositories/UserRepository");

module.exports = {
  login: function(req, res) {
    const { email, password } = req.body;
    UserRepository.login(email, password)
      .then(result => {
        res.send({
          result
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          success: false,
          message
        });
      });
  },

  logout: function(req, res) {
    const { email } = req.body;
    UserRepository.logout(email)
      .then(result => {
        res.send({
          result
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          success: false,
          message
        });
      });
  },

  signup: function(req, res) {
    var data = req.body;
    UserRepository.create(data)
      .then(result => {
        res.send({
          success: true,
          result: result
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          success: false,
          message
        });
      });
  },

  update: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    UserRepository.update(id, data)
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
    UserRepository.delete(id)
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
