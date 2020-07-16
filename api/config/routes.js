const UsersController = require("../controllers/UsersController.js");
const AlbumsController = require("../controllers/AlbumsController.js");
const ImagesController = require("../controllers/ImagesController.js");
const VerifyToken = require("./VerifyToken");
const multer = require("multer");
const path = require("path");

const upload = multer({
  dest: path.join(__dirname, "../uploads")
});

module.exports = function(app) {
  app.post("/login", UsersController.login);
  app.post("/logout", UsersController.logout);
  app.post("/signup", UsersController.signup);

  app.post("/albums", VerifyToken, AlbumsController.create);
  app.get("/albums", AlbumsController.get);
  app.get("/albums/:id", AlbumsController.show);

  app.get("/:album_id/images", ImagesController.get);
  app.post("/upload", upload.single("file"), ImagesController.create);
};
