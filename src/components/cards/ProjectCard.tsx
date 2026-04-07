"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types";

interface Props {
  project: Project;
  variant?: "grid" | "showcase";
  onClick?: () => void;
}

export function ProjectCard({ project, variant = "grid", onClick }: Props) {
  const thumb = project.imageUrls?.[0] || "/placeholder.svg";

  if (variant === "showcase") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white"
        onClick={onClick}
      >
        <div className="relative h-72 sm:h-80">
          <Image
            src={thumb}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-sm text-gray-200 mt-1 line-clamp-2">{project.description}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={thumb}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-blue-deep group-hover:text-gold transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-3">{project.description}</p>
        <span className="inline-block mt-3 text-gold text-sm font-medium">
          View Details →
        </span>
      </div>
    </motion.div>
  );
}
