import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our comprehensive civil and interior services — hospital construction, lab setup, infrastructure development, and more.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
