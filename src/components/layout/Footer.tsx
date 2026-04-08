"use client";
import Link from "next/link";
import { FiMail, FiMapPin } from "react-icons/fi";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Logo size="md" light />
            </div>
            <p className="text-sm font-medium text-gray-200 mb-2">
              NaviPro Projects Private Limited
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Delivering excellence in civil &amp; interior works for hospitals,
              labs, and infrastructure projects across India.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-accent mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/projects", label: "Projects" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-accent mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 shrink-0" />
                <span>
                  #G-6, Aastha Meadows, Lalamma Gardens,
                  <br />
                  Puppalaguda, Manikonda, Hyderabad,
                  <br />
                  Telangana
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="shrink-0" />
                <a href="mailto:navipro89@gmail.com" className="hover:text-accent transition-colors">
                  navipro89@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} NaviPro Projects Private Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
