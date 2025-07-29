const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    holdings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Holding"
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    }],
    positions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Position",
    }],
    resetCode: String,
    resetCodeExpiry: Date,
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    hashField: "password",
    errorMessages: {
        UserExistsError: "A user with the given email is already registered.",
        IncorrectPasswordError: "The password you entered is incorrect.",
        MissingUsernameError: "Please enter your email address.",
        MissingPasswordError: "Please enter your password.",
    }
})

module.exports = userSchema;