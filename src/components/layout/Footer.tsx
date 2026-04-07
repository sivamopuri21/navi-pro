"use client";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="bg-blue-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-white font-bold text-sm">
                NP
              </div>
              <span className="font-bold text-lg">Navi Pro Projects</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Navi Pro Projects Pvt. Ltd. — Delivering excellence in civil &amp;
              interior works for hospitals, labs, and infrastructure projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/projects", label: "Projects" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="shrink-0" />
                <span>info@naviproprojects.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Navi Pro Projects Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
