"use client";
import { Section, SectionTitle } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

const values = [
  { icon: FiTarget, title: "Mission", desc: "To deliver world-class civil and interior solutions that exceed expectations, on time and within budget." },
  { icon: FiEye, title: "Vision", desc: "To be the most trusted name in hospital construction, lab setup, and infrastructure development across India." },
  { icon: FiHeart, title: "Values", desc: "Integrity, quality, innovation, and a deep commitment to client satisfaction drive everything we do." },
];

const milestones = [
  { year: "2014", text: "Company founded in Hyderabad" },
  { year: "2016", text: "First major hospital project completed" },
  { year: "2018", text: "Expanded to lab setup and infrastructure" },
  { year: "2020", text: "50+ projects milestone achieved" },
  { year: "2023", text: "Pan-India operations established" },
];

export function AboutContent() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-blue-deep to-blue-medium py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            About <span className="text-gold">Navi Pro Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
          >
            A decade of excellence in civil and interior works for healthcare and infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle sub="How it all began">Our Story</SectionTitle>
          <p className="text-gray-600 leading-relaxed">
            Navi Pro Projects Private Limited was established with a singular vision — to
            transform the landscape of civil and interior construction in India. Starting
            from Hyderabad, we have grown into a trusted partner for hospitals, diagnostic
            laboratories, and large-scale infrastructure projects. Our team combines
            engineering expertise with a passion for quality, delivering projects that stand
            the test of time.
          </p>
        </div>
      </Section>

      {/* Mission / Vision / Values */}
      <Section className="!bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-md text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                <v.icon size={28} />
              </div>
              <h3 className="mt-5 font-bold text-xl text-blue-deep">{v.title}</h3>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <SectionTitle sub="Key moments in our journey">Milestones</SectionTitle>
        <div className="max-w-2xl mx-auto space-y-6">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="shrink-0 w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="font-bold text-gold">{m.year}</span>
              </div>
              <div className="pt-4">
                <p className="text-gray-700">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
