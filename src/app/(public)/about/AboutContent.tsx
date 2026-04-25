"use client";
import { Section, SectionTitle } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { FiTarget, FiEye, FiCpu, FiShield, FiCrosshair, FiCheckCircle, FiGlobe } from "react-icons/fi";

const coreValues = [
  { icon: FiCpu, title: "Technical Mastery", desc: "We pride ourselves on an educationally qualified and technically trained workforce. Our expertise isn\u2019t just in building, but in understanding the physics of shielding, the complexity of MEP services, and the nuances of medical gas and clinical workflows." },
  { icon: FiShield, title: "Regulatory Integrity", desc: "We take the burden of compliance off our clients. By mastering AERB permissions and local liaison requirements, we ensure every project is built on a foundation of safety and legal excellence." },
  { icon: FiCrosshair, title: "Precision & Specialization", desc: "Whether it is a LINAC vault, a PET-CT suite, or a Brachytherapy room, we understand that \u201Cnear enough\u201D is never enough. We execute with the high-tolerance precision required for heavy radiation structures." },
  { icon: FiCheckCircle, title: "End-to-End Accountability", desc: "We own the process from the first design sketch to the final clinical handover. Our commitment to turnkey execution ensures a unified vision across design, MEP, and construction." },
  { icon: FiGlobe, title: "National Reach, Local Excellence", desc: "With a footprint extending from the South to the North and the Far East, we bring consistent, high-tier construction standards to every corner of the country, regardless of geographical challenges." },
];

const milestones = [
  { year: "2014", text: "Company founded in Hyderabad" },
  { year: "2016", text: "First major hospital project completed" },
  { year: "2018", text: "Expanded to specialized radiation oncology vaults" },
  { year: "2020", text: "50+ projects milestone achieved" },
  { year: "2023", text: "Pan-India operations established" },
];

export function AboutContent() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary to-primary-light py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold">
            About <span className="text-accent">NaviPro Projects</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Building the future of healthcare with precision, regulatory mastery, and a deep understanding of life-saving technology.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle sub="How it all began">Our Story</SectionTitle>
          <p className="text-gray-600 leading-relaxed">
            NaviPro Projects Private Limited was established with a singular vision &mdash;
            building the future of healthcare requires more than just bricks and mortar;
            it requires precision, regulatory mastery, and a deep understanding of
            life-saving technology. Based out of Hyderabad, Telangana, we have grown into
            a trusted partner for hospitals, diagnostic laboratories, radiation oncology
            facilities, and large-scale healthcare infrastructure projects across India.
          </p>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="!bg-surface-alt">
        <SectionTitle sub="What drives us forward">Mission &amp; Vision</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-md">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5">
              <FiTarget size={28} />
            </div>
            <h3 className="font-bold text-xl text-primary mb-3">Mission</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              To deliver world-class, specialized healthcare infrastructure by integrating
              advanced engineering with seamless turnkey solutions. From complex radiation
              oncology vaults to high-precision diagnostic suites, we bridge the gap between
              architectural design and clinical readiness, ensuring every facility we build
              meets the highest standards of safety, technology, and healing.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-md">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5">
              <FiEye size={28} />
            </div>
            <h3 className="font-bold text-xl text-primary mb-3">Vision</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              To be the premier pan-India benchmark for specialized medical construction,
              recognized for transforming complex clinical requirements into state-of-the-art
              facilities that empower healthcare providers to deliver life-saving care without limits.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <SectionTitle sub="The principles that drive everything we do">Core Values</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-7 shadow-md border border-gray-100 hover:border-accent/20 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <v.icon size={24} />
              </div>
              <h3 className="mt-4 font-bold text-lg text-primary">{v.title}</h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* The NaviPro Edge */}
      <Section dark>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-6 py-2.5 bg-accent/20 text-accent-light rounded-full text-4xl font-bold mb-6 tracking-wide">
              The NaviPro Edge
            </span>
            <h2 className="text-3xl sm:text-2xl font-bold text-white">
              &ldquo;From Shielding to Surgery&rdquo;
            </h2>
            <p className="mt-6 text-gray-300 leading-relaxed text-lg">
              NaviPro specializes in the specialized. We don&apos;t just build hospitals; we
              engineer environments where technology meets humanity. Our unique ability to
              handle the entire lifecycle &mdash; design, AERB liaison, MEP, and execution &mdash; allows
              clinical teams to focus on what matters most: the patient.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Milestones */}
      <Section>
        <SectionTitle sub="Key moments in our journey">Milestones</SectionTitle>
        <div className="max-w-2xl mx-auto space-y-6">
          {milestones.map((m, i) => (
            <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start gap-4">
              <div className="shrink-0 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="font-bold text-accent">{m.year}</span>
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
