"use client";
import { Section, SectionTitle } from "@/components/ui/Section";
import { motion } from "framer-motion";
import {
  FiHome,
  FiLayers,
  FiTool,
  FiGrid,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

const services = [
  { icon: FiHome, title: "Hospital Construction", desc: "Complete hospital building solutions from foundation to finishing, adhering to healthcare standards and regulations." },
  { icon: FiLayers, title: "Laboratory Setup", desc: "Precision-engineered lab infrastructure for diagnostics, research, and pathology with cleanroom standards." },
  { icon: FiTool, title: "Interior Works", desc: "Modern, functional interiors for hospitals, offices, and commercial spaces with attention to aesthetics and durability." },
  { icon: FiGrid, title: "Infrastructure Development", desc: "Large-scale infrastructure projects including roads, utilities, and public facilities." },
  { icon: FiShield, title: "Renovation & Retrofitting", desc: "Upgrading existing structures to modern standards while maintaining structural integrity." },
  { icon: FiTrendingUp, title: "Project Management", desc: "End-to-end project management ensuring timely delivery, quality control, and budget adherence." },
];

export function ServicesContent() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-deep to-blue-medium py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Our <span className="text-gold">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-gray-300"
          >
            Comprehensive civil and interior solutions tailored to your needs.
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-8 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all group bg-white"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                <s.icon size={28} />
              </div>
              <h3 className="mt-5 font-bold text-lg text-blue-deep">{s.title}</h3>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Need a Custom Solution?</h2>
          <p className="mt-3 text-gray-300">We tailor our services to match your project requirements.</p>
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-gold text-white rounded-lg font-medium hover:bg-gold-dark transition-colors"
          >
            Discuss Your Project
          </a>
        </div>
      </Section>
    </>
  );
}
