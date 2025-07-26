const Holding = require("../models/HoldingsModel");
const User = require("../Models/UsersModel");

module.exports.allHoldings = async (req, res) => {
    try {
        const holdings = await Holding.find();
        res.json(holdings)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports.userHoldings = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("holdings");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user.holdings);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};