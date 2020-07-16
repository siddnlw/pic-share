const bcrypt = require("bcrypt-nodejs");
const User = require("../models").UserModel;

module.exports = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            user.generateToken();
            resolve(user);
          } else reject("Invalid password!");
        })
        .catch(err => {
          reject("Invalid email!");
        });
    });
  },

  logout: email => {
    return User.findOneAndUpdate(
      { email },
      {
        $set: { token: null }
      }
    );
  },

  create: data => {
    var user = new User(data);
    return new Promise((resolve, reject) => {
      user
        .save()
        .then(user => {
          resolve(user);
        })
        .catch(() => {
          reject("Unable to sign up!");
        });
    });
  },

  update: (id, data) => {
    return User.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...data }
      }
    );
  },

  delete: id => {
    return User.deleteOne({ _id: id });
  },

  find_by_token: token => {
    return User.findOne({ token });
  }
};
