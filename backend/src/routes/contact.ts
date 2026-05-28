import { Router, Request, Response } from "express";
import { ContactMessage } from "../models/ContactMessage";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    // Here you would typically integrate with an email service like Resend, Nodemailer, or SendGrid
    // console.log("Simulating email send to admin...");

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

export default router;
