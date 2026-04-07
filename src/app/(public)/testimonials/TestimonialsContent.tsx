"use client";
import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/firestore";
import type { Testimonial } from "@/types";
import { Section, SectionTitle } from "@/components/ui/Section";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { TestimonialSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { motion } from "framer-motion";

export function TestimonialsContent() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials()
      .then(setTestimonials)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-blue-deep to-blue-medium py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Client <span className="text-gold">Testimonials</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-gray-300"
          >
            Hear from the people who trust us with their projects.
          </motion.p>
        </div>
      </section>

      <Section>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <EmptyState message="No testimonials yet" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
