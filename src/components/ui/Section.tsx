"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className = "", id, dark }: Props) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${dark ? "bg-blue-deep text-white" : "bg-white"} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionTitle({ children, sub, light }: { children: ReactNode; sub?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <h2 className={`text-3xl sm:text-4xl font-bold ${light ? "text-white" : "text-blue-deep"}`}>
        {children}
      </h2>
      <div className="mt-3 mx-auto w-16 h-1 bg-gold rounded-full" />
      {sub && (
        <p className={`mt-4 max-w-2xl mx-auto ${light ? "text-gray-300" : "text-gray-500"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
