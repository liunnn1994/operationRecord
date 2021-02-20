"use strict";
if (process.env.NODE_ENV === "production") {
  module.exports = require("./op-rec.min.js");
} else {
  module.exports = require("./op-rec.js");
}
