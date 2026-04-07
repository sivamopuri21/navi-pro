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
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

export function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getTestimonials()
      .then(setItems)
      .finally(() => setLoading(false));
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
    if (!name.trim() || !feedback.trim()) {
      toast.error("All fields are required");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateTestimonial(editing.id, { name, feedback });
        toast.success("Testimonial updated");
      } else {
        await addTestimonial({ name, feedback, createdAt: Date.now() });
        toast.success("Testimonial added");
      }
      resetForm();
      load();
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-blue-deep">Testimonials</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="sm">
            <FiPlus className="mr-1" /> Add Testimonial
          </Button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-blue-deep">
              {editing ? "Edit Testimonial" : "New Testimonial"}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FiX size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
            />
            <textarea
              placeholder="Feedback"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none resize-none"
            />
            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editing ? "Update" : "Add"}
              </Button>
              <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState message="No testimonials yet" />
      ) : (
        <div className="space-y-4">
          {items.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-blue-deep">{t.name}</h4>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{t.feedback}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(t)}
                  className="p-2 text-gray-400 hover:text-gold transition-colors cursor-pointer"
                  aria-label="Edit testimonial"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Delete testimonial"
                >
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
