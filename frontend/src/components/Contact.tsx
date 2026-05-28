"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Code2, Briefcase, MessageSquare } from "lucide-react";
import axios from "axios";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      if (response.data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.response?.data?.error || err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-emerald-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-accent-primary mx-auto md:ml-auto md:mr-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6">Let's talk about everything!</h3>
            <p className="text-foreground/70">
              Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-background transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-foreground/50 font-medium">Mail me at</div>
                  <div className="font-bold">vkmakvana.dev@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-secondary group-hover:bg-accent-secondary group-hover:text-background transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-foreground/50 font-medium">Location</div>
                  <div className="font-bold">Kota, Rajastha, India</div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="text-lg font-bold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: <Code2 className="w-5 h-5" />, href: "https://github.com/VinayKumarMakvana" },
                  { icon: <Briefcase className="w-5 h-5" />, href: "https://www.linkedin.com/in/vinay-kumar-makvana-2371ba391/" },
                  { icon: <MessageSquare className="w-5 h-5" />, href: "mailto:vkmakvana.dev@gmail.com" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-foreground/10 hover:text-accent-primary transition-all hover:-translate-y-1">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 rounded-2xl border border-foreground/10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-3 outline-none focus:border-accent-primary transition-colors text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-3 outline-none focus:border-accent-primary transition-colors text-foreground"
                    placeholder="yourgamil@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Subject (Optional)</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-3 outline-none focus:border-accent-primary transition-colors text-foreground"
                  placeholder="Job Opportunity"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-3 outline-none focus:border-accent-primary transition-colors text-foreground resize-none"
                  placeholder="Hello Vinay, I'd like to talk about..."
                />
              </div>

              {status === "error" && <div className="text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-lg">{errorMsg}</div>}
              {status === "success" && <div className="text-emerald-400 text-sm font-medium bg-emerald-400/10 p-3 rounded-lg">Message sent successfully! I'll get back to you soon.</div>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gradient-to-r from-accent-primary to-emerald-400 hover:opacity-90 text-background font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Message"} 
                {!status && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
