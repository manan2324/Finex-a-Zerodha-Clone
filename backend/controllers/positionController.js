    const Position = require("../models/PositionsModel");

module.exports.allPositions = async (req, res) => {
    try {
        const positions = await Position.find();
        res.json(positions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};