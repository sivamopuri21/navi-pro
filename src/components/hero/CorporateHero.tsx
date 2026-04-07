"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CorporateHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-deep via-blue-medium to-blue-deep min-h-[85vh] flex items-center overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gold/5" />
      <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] rounded-full bg-gold/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6">
              Civil &amp; Interior Excellence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Building Tomorrow&apos;s{" "}
              <span className="text-gold">Infrastructure</span> Today
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl">
              Navi Pro Projects Pvt. Ltd. delivers world-class civil and interior
              solutions for hospitals, laboratories, and infrastructure projects
              across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/projects">
                <Button size="lg">View Our Projects</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="!text-white border border-white/20 hover:!bg-white/10">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
