const jwt = require("jsonwebtoken");
const User = require("../repositories/UserRepository");

module.exports = function(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(403)
      .send({ success: false, message: "No token provided." });
  User.find_by_token(token)
    .then(user => {
      req.userId = user._id;
      next();
    })
    .catch(err => {
      res.status(422).send({ auth: false, message: "Need to login." });
    });
};
