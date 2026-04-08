"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function ShowcaseHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-75 hidden lg:block">
        <Image
          src="/hero-illustration.svg"
          alt=""
          fill
          className="object-contain object-right"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 z-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent-light to-transparent z-20" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute right-[-10%] top-[-10%] w-[700px] h-[700px] border border-accent/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute right-[5%] top-[10%] w-[400px] h-[400px] border border-accent/10 rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent mb-8"
          />
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Crafting{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Spaces
            </span>{" "}
            That Inspire
          </h1>
          <p className="mt-6 text-xl text-gray-300 leading-relaxed">
            From hospitals to laboratories — we transform visions into
            architectural reality with precision and elegance.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects">
              <Button size="lg" className="text-base">Explore Projects</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="lg" className="!text-white border border-accent/30 hover:!bg-accent/10 text-base">
                Our Story
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md">
            {[
              { num: "50+", label: "Projects" },
              { num: "10+", label: "Years" },
              { num: "100%", label: "Commitment" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.15 }}>
                <div className="text-3xl font-bold text-accent">{s.num}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
