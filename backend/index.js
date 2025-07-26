require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const holdingRoute = require("./routes/holdingRoute");
const positionRoute = require("./routes/positionRoute");
const passwordResetRoute = require("./routes/passwordResetRoute");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors(
    {
        origin: ["https://finex-dashboard.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", authRoute);
app.use("/orders", orderRoute);
app.use("/holdings", holdingRoute);
app.use("/positions", positionRoute);
app.use("/", passwordResetRoute);

app.get("/", (req, res) => {
    res.send("Hello");
});

// app.post("/newOrder", async (req, res) => {
//     const { userId, name, qty, price, mode } = req.body;

//     if (!userId || userId === "null") {
//         return res.status(400).json({ message: "Invalid or missing userId" });
//     }

//     try {
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const newOrder = new Order({ name, qty, price, mode, user: userId });
//         await newOrder.save();

//         user.orders.push(newOrder);

//         let holding = await Holding.findOne({ name: name, user: userId });

//         if (mode.toUpperCase() === "BUY") {
//             if (holding) {
//                 // Update qty and avg price
//                 const totalQty = holding.qty + Number(qty);
//                 const totalCost = (holding.avg * holding.qty) + (Number(price) * Number(qty));
//                 holding.qty = totalQty;
//                 holding.avg = totalCost / totalQty;
//                 holding.price = Number(price); // update to latest price
//                 await holding.save();
//             } else {
//                 // Create new holding
//                 const newHolding = new Holding({
//                     name,
//                     qty: Number(qty),
//                     avg: Number(price),
//                     price: Number(price),
//                     net: "%0",
//                     day: "%0",
//                     user: userId,
//                 });
//                 await newHolding.save();
//                 user.holdings.push(newHolding._id);
//             }
//         } else if (mode.toUpperCase() === "SELL") {
//             if (holding) {
//                 holding.qty = holding.qty - Number(qty);
//                 holding.price = Number(price); // update to latest price
//                 if (holding.qty <= 0) {
//                     await Holding.findByIdAndDelete(holding._id);
//                     user.holdings = user.holdings.filter(h => h.toString() !== holding._id.toString());
//                 } else {
//                     await holding.save();
//                 }
//             }
//         }

//         await user.save();

//         res.send("Order saved to user and holdings updated");
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.get("/allHoldings", async (req, res) => {
//     try {
//         const holdings = await Holding.find();
//         res.json(holdings)
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// app.get("/allPositions", async (req, res) => {
//     try {
//         const positions = await Position.find();
//         res.json(positions);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// app.get("/allOrders/:userId", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId).populate("orders");
//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.json(user.orders);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// app.delete("/allOrders/:userId", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         await Order.deleteMany({ _id: { $in: user.orders } });
//         user.orders = [];
//         await user.save();
//         res.json({ success: true, message: "Order history deleted." });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// app.get("/userHoldings/:userId", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId).populate("holdings");
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.json(user.holdings);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// app.post("/forgot-password", async (req, res) => {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email required" });

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         // Generate 4-digit code
//         const code = Math.floor(1000 + Math.random() * 9000).toString();
//         user.resetCode = code;
//         user.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 min expiry
//         await user.save();

//         // Send email
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER, // add to .env
//                 pass: process.env.EMAIL_PASS, // add to .env
//             },
//         });

//         const mailOptions = {
//             from: `"Finex" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: "Your Password Reset Code",
//             html: `
//                 <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//                     <h2 style="color: #0056b3;">Password Reset Request</h2>
//                     <p>Hello ${user.username},</p>
//                     <p>We received a request to reset the password for your account. Please use the code below to complete the process.</p>
//                     <div style="text-align: center; margin: 20px 0;">
//                         <p style="font-size: 24px; font-weight: bold; background-color: #f2f2f2; padding: 10px 20px; border-radius: 5px; display: inline-block;">${code}</p>
//                     </div>
//                     <p>This code is valid for <strong>10 minutes</strong>.</p>
//                     <p>If you did not request a password reset, please ignore this email. Your account is secure.</p>
//                     <hr style="border: none; border-top: 1px solid #eee;" />
//                     <p>Thank you,</p>
//                     <p><strong>The Finex Team</strong></p>
//                 </div>
//             `
//         };

//         await transporter.sendMail(mailOptions);

//         res.json({ success: true, message: "Reset code sent to email." });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// app.post("/verify-code", async (req, res) => {
//     const { email, code } = req.body;

//     if (!email || !code) return res.status(400).json({ message: "All fields required" });

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         if (
//             user.resetCode !== code ||
//             !user.resetCodeExpiry ||
//             user.resetCodeExpiry < Date.now()
//         ) {
//             return res.status(400).json({ message: "Invalid or expired code" });
//         }

//         res.json({ success: true, message: "Code verified successfully." });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// app.post("/reset-password", async (req, res) => {
//     const { email, newPassword } = req.body;
//     if (!email || !newPassword) return res.status(400).json({ message: "All fields required" });

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         user.password = await bcrypt.hash(newPassword, 12);
//         user.resetCode = undefined;
//         user.resetCodeExpiry = undefined;
//         await user.save();

//         res.json({ success: true, message: "Password reset successful." });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

async function main() {
    mongoose
        .connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB is  connected successfully"))
        .catch((err) => console.error(err));
}

main()

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
