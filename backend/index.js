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
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const holdingRoute = require("./routes/holdingRoute");
const positionRoute = require("./routes/positionRoute");
const passwordResetRoute = require("./routes/passwordResetRoute");

const User = require("./models/UsersModel");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;
const CLIENT_URL = process.env.CLIENT_URL;

app.set("trust proxy", 1);

// Correct CORS setup
app.use(cors({
    origin: [CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

async function main() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

main()
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

// Middlewares
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
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }
};

// Session middleware
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// Passport config
// Google OAuth Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find user by Google ID or email, else create new user
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/", authRoute);
app.use("/orders", orderRoute);
app.use("/holdings", holdingRoute);
app.use("/positions", positionRoute);
app.use("/", passwordResetRoute);

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: true
    }),
    (req, res) => {
        res.redirect(`${CLIENT_URL}/?justLoggedIn=true`); // After success, redirect home
    }
);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});