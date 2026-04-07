import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Navi Pro Projects Pvt. Ltd. — our mission, values, and commitment to excellence in civil and interior works.",
};

export default function AboutPage() {
  return <AboutContent />;
}
