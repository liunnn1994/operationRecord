const { ORInterface } = require("./interfaces/index");
const or: typeof ORInterface = require("./core").default;

module.exports = or;
