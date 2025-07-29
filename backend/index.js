if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStratagy = require("passport-local");
const MongoStore = require("connect-mongo");

const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const holdingRoute = require("./routes/holdingRoute");
const positionRoute = require("./routes/positionRoute");
const passwordResetRoute = require("./routes/passwordResetRoute");

const User = require("./models/UsersModel");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors(
    {
        origin: [CLIENT_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));

async function main() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

main()
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

main()

//Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SESSION_SECRET
    },
    touchAfter: 3600 * 24
});

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
        maxAge: 1000 * 60 * 60 * 24 * 3, //3 days
        httpOnly: true,
    }
}

//session middleware
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.use(new LocalStratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use("/", authRoute);
app.use("/orders", orderRoute);
app.use("/holdings", holdingRoute);
app.use("/positions", positionRoute);
app.use("/", passwordResetRoute);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});