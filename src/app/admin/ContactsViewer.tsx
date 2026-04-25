"use client";
import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "@/lib/firestore";
import type { Contact } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { FiMail, FiUser, FiClock, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export function ContactsViewer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getContacts().then(setContacts).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact submission?")) return;
    try {
      await deleteContact(id);
      toast.success("Contact deleted");
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Contact Submissions</h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : contacts.length === 0 ? (
        <EmptyState message="No contact submissions yet" />
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    <FiUser size={14} /> {c.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <FiMail size={14} /> {c.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 ml-auto">
                    <FiClock size={12} />
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{c.message}</p>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label="Delete contact"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
