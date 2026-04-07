import type { Metadata } from "next";
import { ProjectsContent } from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse our portfolio of completed civil and interior projects — hospitals, labs, and infrastructure across India.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
