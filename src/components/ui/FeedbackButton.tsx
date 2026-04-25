"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { submitTestimonial } from "@/lib/firestore";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) {
      toast.error("Please fill in your name and feedback");
      return;
    }
    setSubmitting(true);
    try {
      await submitTestimonial({ name: name.trim(), feedback: feedback.trim() });
      toast.success("Thank you! Your feedback will appear after approval.");
      setName("");
      setFeedback("");
      setOpen(false);
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm";

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-dark hover:shadow-xl transition-all cursor-pointer group"
        aria-label="Share feedback"
      >
        <FiMessageSquare size={18} />
        <span className="text-sm font-medium hidden sm:inline">Testimonials</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-primary text-lg">Share Your Testimonial</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Your testimonial will be published after approval</p>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <FiX size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="fb-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input id="fb-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="fb-msg" className="block text-sm font-medium text-gray-700 mb-1">Your Testimonial</label>
                  <textarea id="fb-msg" rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)}
                    className={`${inputClass} resize-none`} placeholder="Share your experience with NaviPro..." />
                </div>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Submitting..." : "Submit Testimonial"} <FiSend className="ml-2" />
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
