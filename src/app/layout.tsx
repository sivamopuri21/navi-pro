import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Navi Pro Projects Pvt. Ltd. | Civil & Interior Works",
    template: "%s | Navi Pro Projects",
  },
  description:
    "Navi Pro Projects Pvt. Ltd. delivers world-class civil and interior solutions for hospitals, laboratories, and infrastructure projects across India.",
  keywords: [
    "civil works",
    "interior works",
    "hospital construction",
    "lab setup",
    "infrastructure projects",
    "Navi Pro Projects",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Navi Pro Projects Pvt. Ltd.",
    title: "Navi Pro Projects Pvt. Ltd. | Civil & Interior Works",
    description:
      "Delivering excellence in civil & interior works for hospitals, labs, and infrastructure projects.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
