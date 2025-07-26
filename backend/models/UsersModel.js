const mongoose = require('mongoose');
const userSchema = require('../schemas/UsersSchema');

module.exports = mongoose.model("User", userSchema);