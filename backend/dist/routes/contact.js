"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactMessage_1 = require("../models/ContactMessage");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required." });
        }
        const newMessage = new ContactMessage_1.ContactMessage({ name, email, subject, message });
        await newMessage.save();
        // Here you would typically integrate with an email service like Resend, Nodemailer, or SendGrid
        // console.log("Simulating email send to admin...");
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    }
    catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
});
exports.default = router;
