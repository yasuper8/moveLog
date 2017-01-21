var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/movelog");

// module.exports.Campsite = require("./campsite.js.example");
module.exports.User = require("./user.js");
module.exports.Video = require("./video.js");
