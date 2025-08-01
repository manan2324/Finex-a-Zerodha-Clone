const mongoose = require("mongoose");
const { holdingsSchema } = require("../schemas/HoldingsSchema");

const Holding = mongoose.model("Holding", holdingsSchema);

module.exports = Holding;