const Order = require("../models/OrdersModel");
const User = require("../models/UsersModel");
const Holding = require("../models/HoldingsModel");

module.exports.newOrder = async (req, res) => {
    const { userId, name, qty, price, mode } = req.body;

    if (!userId || userId === "null") {
        return res.status(400).json({ message: "Invalid or missing userId" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newOrder = new Order({ name, qty, price, mode, user: userId });
        await newOrder.save();

        user.orders.push(newOrder);

        let holding = await Holding.findOne({ name: name, user: userId });

        if (mode.toUpperCase() === "BUY") {
            if (holding) {
                // Update qty and avg price
                const totalQty = holding.qty + Number(qty);
                const totalCost = (holding.avg * holding.qty) + (Number(price) * Number(qty));
                holding.qty = totalQty;
                holding.avg = totalCost / totalQty;
                holding.price = Number(price); // update to latest price
                await holding.save();
            } else {
                // Create new holding
                const newHolding = new Holding({
                    name,
                    qty: Number(qty),
                    avg: Number(price),
                    price: Number(price),
                    net: "%0",
                    day: "%0",
                    user: userId,
                });
                await newHolding.save();
                user.holdings.push(newHolding._id);
            }
        } else if (mode.toUpperCase() === "SELL") {
            if (holding) {
                holding.qty = holding.qty - Number(qty);
                holding.price = Number(price); // update to latest price
                if (holding.qty <= 0) {
                    await Holding.findByIdAndDelete(holding._id);
                    user.holdings = user.holdings.filter(h => h.toString() !== holding._id.toString());
                } else {
                    await holding.save();
                }
            }
        }

        await user.save();

        res.send("Order saved to user and holdings updated");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.allOrders = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("orders");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports.deleteAllOrders = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        await Order.deleteMany({ _id: { $in: user.orders } });
        user.orders = [];
        await user.save();
        res.json({ success: true, message: "Order history deleted." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};