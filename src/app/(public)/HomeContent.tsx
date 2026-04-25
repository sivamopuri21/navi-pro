"use client";
import { useEffect, useState } from "react";
import { getTemplate } from "@/lib/template";
import { getProjects, getApprovedTestimonials } from "@/lib/firestore";
import type { Project, Testimonial } from "@/types";
import { CorporateHero } from "@/components/hero/CorporateHero";
import { ShowcaseHero } from "@/components/hero/ShowcaseHero";
import { Section, SectionTitle } from "@/components/ui/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { ProjectCardSkeleton, TestimonialSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAward, FiUsers, FiArrowRight } from "react-icons/fi";

const template = getTemplate();

const services = [
  { icon: FiCheckCircle, title: "Hospital Construction", desc: "End-to-end hospital building and renovation with modern standards." },
  { icon: FiAward, title: "Lab Setup", desc: "Precision lab infrastructure for research and diagnostics." },
  { icon: FiUsers, title: "Interior Works", desc: "Elegant interiors for commercial and healthcare spaces." },
];

export function HomeContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    Promise.all([getProjects(), getApprovedTestimonials()])
      .then(([p, t]) => { setProjects(p); setTestimonials(t); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {template === "showcase" ? <ShowcaseHero /> : <CorporateHero />}

      <Section>
        <SectionTitle sub="We specialize in civil and interior works for healthcare and infrastructure">
          Our Services
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <s.icon size={28} />
              </div>
              <h3 className="mt-5 font-bold text-lg text-primary">{s.title}</h3>
              <p className="mt-2 text-gray-500 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services">
            <Button variant="ghost" className="!text-accent hover:!bg-accent/5">
              All Services <FiArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </Section>

      <Section className="!bg-surface-alt">
        <SectionTitle sub="A glimpse of our recent work across India">Featured Projects</SectionTitle>
        {loading ? (
          <div className={`grid gap-8 ${template === "showcase" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
            {[1, 2, 3].map((i) => <ProjectCardSkeleton key={i} />)}
          </div>
        ) : projects.length === 0 ? (
          <EmptyState message="Projects coming soon" />
        ) : (
          <div className={`grid gap-8 ${template === "showcase" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
            {projects.slice(0, template === "showcase" ? 4 : 6).map((p) => (
              <ProjectCard key={p.id} project={p} variant={template === "showcase" ? "showcase" : "grid"} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link href="/projects"><Button>View All Projects</Button></Link>
        </div>
      </Section>

      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Start Your Project?</h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">Let&apos;s discuss how NaviPro Projects can bring your vision to life.</p>
          <div className="mt-8"><Link href="/contact"><Button size="lg">Contact Us Today</Button></Link></div>
        </div>
      </Section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
