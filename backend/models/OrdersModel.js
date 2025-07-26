const mongoose = require("mongoose");

const { ordersSchema } = require("../schemas/OrdersSchema");

module.exports = mongoose.model("Order", ordersSchema);