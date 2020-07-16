const mongoose = require("mongoose");
const dbConfig = require("./dbconfig");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.URL, { useNewUrlParser: true });

module.exports = mongoose;
