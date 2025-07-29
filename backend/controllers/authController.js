const User = require("../models/UsersModel");
const passport = require("passport");

module.exports.Signup = async (req, res, next) => {
  const { email, password, username, createdAt } = req.body;

  try {
    const newUser = new User({ email, username, createdAt });

    User.register(newUser, password, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(201).json({
          success: true,
          message: "User registered and logged in successfully",
          user: user,
        });
      });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.Login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: user,
      });
    });
  })(req, res, next);
}

module.exports.Logout = async (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logout successful" });
    });
  });
}

module.exports.Verify = (req, res) => {
  res.status(200).json({
    status: true,
    user: req.user.username
  });
}