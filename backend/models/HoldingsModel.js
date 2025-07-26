const mongoose = require("mongoose");
const { holdingsSchema } = require("../schemas/HoldingsSchema");

module.exports = mongoose.model("Holding", holdingsSchema);