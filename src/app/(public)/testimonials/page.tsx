import type { Metadata } from "next";
import { TestimonialsContent } from "./TestimonialsContent";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what our clients say about Navi Pro Projects — trusted by hospitals, labs, and infrastructure developers.",
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}
