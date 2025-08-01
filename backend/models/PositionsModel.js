const mongoose = require("mongoose");
const { positionsSchema } = require("../schemas/PositionsSchema");

const Position = mongoose.model("Position", positionsSchema);

module.exports = Position;