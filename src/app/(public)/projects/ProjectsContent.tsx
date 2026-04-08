"use client";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/firestore";
import { getTemplate } from "@/lib/template";
import type { Project } from "@/types";
import { Section, SectionTitle } from "@/components/ui/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { motion } from "framer-motion";

const template = getTemplate();
const PAGE_SIZE = 6;

export function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => { getProjects().then(setProjects).finally(() => setLoading(false)); }, []);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-light py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold">
            Our <span className="text-accent">Projects</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-gray-300">
            Explore our portfolio of completed and ongoing projects.
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="max-w-md mx-auto mb-10">
          <input type="text" placeholder="Search projects..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
        </div>

        {loading ? (
          <div className={`grid gap-8 ${template === "showcase" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
            {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState message={search ? "No projects match your search" : "No projects yet"} />
        ) : (
          <>
            <div className={`grid gap-8 ${template === "showcase" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
              {paginated.map((p) => (
                <ProjectCard key={p.id} project={p} variant={template === "showcase" ? "showcase" : "grid"} onClick={() => setSelectedProject(p)} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button onClick={() => setPage((prev) => prev + 1)} className="px-8 py-3 bg-accent/10 text-accent rounded-lg font-medium hover:bg-accent/20 transition-colors cursor-pointer">
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </Section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
