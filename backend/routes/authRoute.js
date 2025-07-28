const { Signup, Login, Logout } = require('../controllers/authController')
const router = require('express').Router()
const {isLoggedIn} = require("../middleware/authMiddleware");

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/", isLoggedIn)
router.get("/logout", Logout)

module.exports = router