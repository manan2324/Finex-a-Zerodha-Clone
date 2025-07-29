const { Signup, Login, Logout, Verify } = require('../controllers/authController')
const router = require('express').Router()
const {isLoggedIn} = require("../middleware/authMiddleware");

router.post("/signup", Signup)
router.post("/login", Login)
router.get("/verify", isLoggedIn, Verify)
router.get("/logout", Logout)

module.exports = router