"use client";
import { useState, FormEvent } from "react";
import { addContact } from "@/lib/firestore";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all fields"); return; }
    setSending(true);
    try {
      await addContact(form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch { toast.error("Failed to send message. Please try again."); }
    finally { setSending(false); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all";

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-light py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold">
            Contact <span className="text-accent">Us</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-gray-300">
            We&apos;d love to hear from you. Let&apos;s build something great together.
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-primary mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
              </div>
              <Button type="submit" disabled={sending} size="lg" className="w-full sm:w-auto">
                {sending ? "Sending..." : "Send Message"} <FiSend className="ml-2" />
              </Button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0"><FiMapPin size={22} /></div>
                <div>
                  <p className="font-medium text-primary">Office Address</p>
                  <p className="text-gray-500 text-sm">#G-6, Aastha Meadows, Lalamma Gardens,<br />Puppalaguda, Manikonda, Hyderabad,<br />Telangana</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0"><FiMail size={22} /></div>
                <div>
                  <p className="font-medium text-primary">Email</p>
                  <a href="mailto:navipro89@gmail.com" className="text-gray-500 text-sm hover:text-accent transition-colors">navipro89@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-64">
              <iframe title="NaviPro Projects Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.37!3d17.39!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPuppalaguda%2C%20Manikonda%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
