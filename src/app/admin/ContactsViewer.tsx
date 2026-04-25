"use client";
import { useEffect, useState } from "react";
import { getContacts, deleteContact, getContactRetentionDays, setContactRetentionDays } from "@/lib/firestore";
import type { Contact } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { FiMail, FiUser, FiClock, FiTrash2, FiShield, FiSettings } from "react-icons/fi";
import toast from "react-hot-toast";

export function ContactsViewer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [retentionDays, setRetentionDays] = useState(30);
  const [editDays, setEditDays] = useState("30");
  const [showSettings, setShowSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([getContacts(), getContactRetentionDays()])
      .then(([c, days]) => {
        setContacts(c);
        setRetentionDays(days);
        setEditDays(String(days));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const isExpired = (createdAt: number) => {
    const ageMs = Date.now() - createdAt;
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    return ageDays > retentionDays;
  };

  const getDaysRemaining = (createdAt: number) => {
    const ageMs = Date.now() - createdAt;
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    const remaining = Math.ceil(retentionDays - ageDays);
    return remaining > 0 ? remaining : 0;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact submission?")) return;
    try {
      await deleteContact(id);
      toast.success("Contact deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  const handleSaveSettings = async () => {
    const days = parseInt(editDays);
    if (isNaN(days) || days < 1) { toast.error("Enter a valid number of days (minimum 1)"); return; }
    setSavingSettings(true);
    try {
      await setContactRetentionDays(days);
      setRetentionDays(days);
      toast.success(`Retention period set to ${days} days`);
      setShowSettings(false);
    } catch { toast.error("Failed to save settings"); }
    finally { setSavingSettings(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">Contact Submissions</h2>
        <button onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-accent hover:bg-accent/5 rounded-lg transition-colors cursor-pointer">
          <FiSettings size={16} /> Retention: {retentionDays} days
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-semibold text-primary text-sm mb-3">Contact Retention Settings</h3>
          <p className="text-xs text-gray-400 mb-4">
            Contacts within the retention period are protected and cannot be deleted. Once expired, the delete option becomes available.
          </p>
          <div className="flex items-center gap-3">
            <input type="number" min="1" value={editDays} onChange={(e) => setEditDays(e.target.value)}
              className="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm" />
            <span className="text-sm text-gray-500">days</span>
            <Button size="sm" onClick={handleSaveSettings} disabled={savingSettings}>
              {savingSettings ? "Saving..." : "Save"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowSettings(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : contacts.length === 0 ? (
        <EmptyState message="No contact submissions yet" />
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => {
            const expired = isExpired(c.createdAt);
            const daysLeft = getDaysRemaining(c.createdAt);

            return (
              <div key={c.id} className={`bg-white rounded-xl shadow-sm border p-5 flex items-start gap-4 ${expired ? "border-red-100 bg-red-50/20" : "border-gray-100"}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
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
                  <div className="mt-2">
                    {expired ? (
                      <span className="inline-flex items-center gap-1 text-xs text-red-500 font-medium">
                        Expired — eligible for deletion
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <FiShield size={10} /> Protected — {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
                      </span>
                    )}
                  </div>
                </div>
                {expired ? (
                  <button onClick={() => handleDelete(c.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    aria-label="Delete contact" title="Delete expired contact">
                    <FiTrash2 size={18} />
                  </button>
                ) : (
                  <div className="p-2 text-gray-200 shrink-0" title={`Protected for ${daysLeft} more days`}>
                    <FiShield size={18} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
