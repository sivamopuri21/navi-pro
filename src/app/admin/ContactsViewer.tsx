"use client";
import { useEffect, useState } from "react";
import { getContacts } from "@/lib/firestore";
import type { Contact } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { FiMail, FiUser, FiClock } from "react-icons/fi";

export function ContactsViewer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Contact Submissions</h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <EmptyState message="No contact submissions yet" />
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
            >
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
          ))}
        </div>
      )}
    </div>
  );
}
