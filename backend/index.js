require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
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
        origin: [process.env.CLIENT_URL],
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
