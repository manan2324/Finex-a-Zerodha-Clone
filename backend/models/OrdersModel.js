const mongoose = require("mongoose");
const { ordersSchema } = require("../schemas/OrdersSchema");

const Order = mongoose.model("Order", ordersSchema);

module.exports = Order;