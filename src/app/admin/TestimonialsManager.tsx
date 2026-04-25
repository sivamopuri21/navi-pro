"use client";
import { useEffect, useState } from "react";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/firestore";
import type { Testimonial } from "@/types";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiClock } from "react-icons/fi";
import toast from "react-hot-toast";

export function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const load = () => {
    setLoading(true);
    getTestimonials().then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setName("");
    setFeedback("");
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setName(t.name);
    setFeedback(t.feedback);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!name.trim() || !feedback.trim()) { toast.error("All fields are required"); return; }
    setSaving(true);
    try {
      if (editing) {
        await updateTestimonial(editing.id, { name, feedback });
        toast.success("Testimonial updated");
      } else {
        await addTestimonial({ name, feedback, approved: true, createdAt: Date.now() });
        toast.success("Testimonial added");
      }
      resetForm();
      load();
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  const handleApprove = async (id: string) => {
    try {
      await updateTestimonial(id, { approved: true });
      toast.success("Testimonial approved — now visible on the website");
      load();
    } catch { toast.error("Failed to approve"); }
  };

  const handleReject = async (id: string) => {
    try {
      await updateTestimonial(id, { approved: false });
      toast.success("Testimonial hidden from website");
      load();
    } catch { toast.error("Failed to update"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Deleted");
      load();
    } catch { toast.error("Failed to delete"); }
  };

  const filtered = items.filter((t) => {
    if (filter === "pending") return !t.approved;
    if (filter === "approved") return t.approved;
    return true;
  });

  const pendingCount = items.filter((t) => !t.approved).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-primary">Testimonials</h2>
          {pendingCount > 0 && (
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
              {pendingCount} pending
            </span>
          )}
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="sm">
            <FiPlus className="mr-1" /> Add Testimonial
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer capitalize ${
              filter === f ? "bg-accent text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            {f} {f === "pending" && pendingCount > 0 ? `(${pendingCount})` : ""}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary">
              {editing ? "Edit Testimonial" : "New Testimonial"}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FiX size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Client Name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none" />
            <textarea placeholder="Feedback" rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none" />
            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editing ? "Update" : "Add"}
              </Button>
              <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState message={filter === "pending" ? "No pending testimonials" : "No testimonials yet"} />
      ) : (
        <div className="space-y-4">
          {filtered.map((t) => (
            <div key={t.id}
              className={`bg-white rounded-xl shadow-sm border p-4 flex items-start gap-4 ${
                !t.approved ? "border-amber-200 bg-amber-50/30" : "border-gray-100"
              }`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-primary">{t.name}</h4>
                  {t.approved ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      <FiCheck size={10} /> Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      <FiClock size={10} /> Pending
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">{t.feedback}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {!t.approved ? (
                  <button onClick={() => handleApprove(t.id)}
                    className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                    aria-label="Approve" title="Approve">
                    <FiCheck size={18} />
                  </button>
                ) : (
                  <button onClick={() => handleReject(t.id)}
                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                    aria-label="Hide" title="Hide from website">
                    <FiClock size={18} />
                  </button>
                )}
                <button onClick={() => openEdit(t)}
                  className="p-2 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-colors cursor-pointer"
                  aria-label="Edit">
                  <FiEdit2 size={18} />
                </button>
                <button onClick={() => handleDelete(t.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  aria-label="Delete">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
