"use client";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { ProjectsManager } from "./ProjectsManager";
import { TestimonialsManager } from "./TestimonialsManager";
import { ContactsViewer } from "./ContactsViewer";
import { ContentManager } from "./ContentManager";
import { FiLogOut, FiFolder, FiMessageCircle, FiMail, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";

const tabs = [
  { id: "projects", label: "Projects", icon: FiFolder },
  { id: "testimonials", label: "Testimonials", icon: FiMessageCircle },
  { id: "contacts", label: "Contacts", icon: FiMail },
  { id: "content", label: "Content", icon: FiFileText },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-blue-deep flex items-center justify-center text-white font-bold text-xs">
              NP
            </div>
            <span className="font-bold text-blue-deep">Admin Dashboard</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <FiLogOut className="mr-2" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gold text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "testimonials" && <TestimonialsManager />}
        {activeTab === "contacts" && <ContactsViewer />}
        {activeTab === "content" && <ContentManager />}
      </div>
    </div>
  );
}
