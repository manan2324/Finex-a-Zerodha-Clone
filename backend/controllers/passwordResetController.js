const User = require("../models/UsersModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate 4-digit code
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetCode = code;
        user.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 min expiry
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // add to .env
                pass: process.env.EMAIL_PASS, // add to .env
            },
        });

        const mailOptions = {
            from: `"Finex" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your Password Reset Code",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">Password Reset Request</h2>
                    <p>Hello ${user.username},</p>
                    <p>We received a request to reset the password for your account. Please use the code below to complete the process.</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <p style="font-size: 24px; font-weight: bold; background-color: #f2f2f2; padding: 10px 20px; border-radius: 5px; display: inline-block;">${code}</p>
                    </div>
                    <p>This code is valid for <strong>10 minutes</strong>.</p>
                    <p>If you did not request a password reset, please ignore this email. Your account is secure.</p>
                    <hr style="border: none; border-top: 1px solid #eee;" />
                    <p>Thank you,</p>
                    <p><strong>The Finex Team</strong></p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Reset code sent to email." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) return res.status(400).json({ message: "All fields required" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (
            user.resetCode !== code ||
            !user.resetCodeExpiry ||
            user.resetCodeExpiry < Date.now()
        ) {
            return res.status(400).json({ message: "Invalid or expired code" });
        }

        res.json({ success: true, message: "Code verified successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return res.status(400).json({ message: "All fields required" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = await bcrypt.hash(newPassword, 12);
        user.resetCode = undefined;
        user.resetCodeExpiry = undefined;
        await user.save();

        res.json({ success: true, message: "Password reset successful." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};