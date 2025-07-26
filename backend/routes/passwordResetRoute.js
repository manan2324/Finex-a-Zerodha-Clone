const router = require('express').Router();
const { forgotPassword, verifyCode, resetPassword } = require('../controllers/passwordResetController');

router.post('/forgot-password', forgotPassword);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);

module.exports = router;