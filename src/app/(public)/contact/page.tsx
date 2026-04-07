import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Navi Pro Projects Pvt. Ltd. for civil works, interior projects, hospital construction, and lab setup.",
};

export default function ContactPage() {
  return <ContactContent />;
}
