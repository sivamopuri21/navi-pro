"use client";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/firestore";
import { getTemplate } from "@/lib/template";
import type { Project } from "@/types";
import { Section, SectionTitle } from "@/components/ui/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { motion } from "framer-motion";

const template = getTemplate();
const PAGE_SIZE = 6;

export function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lightbox, setLightbox] = useState<{ open: boolean; images: string[] }>({
    open: false,
    images: [],
  });

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const openLightbox = (project: Project) => {
    if (project.imageUrls?.length) {
      setLightbox({ open: true, images: project.imageUrls });
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-blue-deep to-blue-medium py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Our <span className="text-gold">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-gray-300"
          >
            Explore our portfolio of completed and ongoing projects.
          </motion.p>
        </div>
      </section>

      <Section>
        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
          />
        </div>

        {loading ? (
          <div className={`grid gap-8 ${template === "showcase" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState message={search ? "No projects match your search" : "No projects yet"} />
        ) : (
          <>
            <div className={`grid gap-8 ${template === "showcase" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
              {paginated.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  variant={template === "showcase" ? "showcase" : "grid"}
                  onClick={() => openLightbox(p)}
                />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-8 py-3 bg-gold/10 text-gold rounded-lg font-medium hover:bg-gold/20 transition-colors cursor-pointer"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </Section>

      <ImageLightbox
        images={lightbox.images}
        open={lightbox.open}
        onClose={() => setLightbox({ open: false, images: [] })}
      />
    </>
  );
}
