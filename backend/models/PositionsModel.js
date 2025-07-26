const mongoose = require("mongoose");

const { positionsSchema } = require("../schemas/PositionsSchema");

module.exports = mongoose.model("Position", positionsSchema);