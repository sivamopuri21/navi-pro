"use client";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
    >
      <FiMessageCircle className="text-accent mb-3" size={24} />
      <p className="text-gray-600 italic leading-relaxed">&ldquo;{testimonial.feedback}&rdquo;</p>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="font-semibold text-primary">{testimonial.name}</p>
      </div>
    </motion.div>
  );
}
