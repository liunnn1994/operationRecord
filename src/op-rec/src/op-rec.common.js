"use strict";
if (process.env.NODE_ENV === "production") {
  module.exports = require("./operationRecord.min.js");
} else {
  module.exports = require("./operationRecord.js");
}
