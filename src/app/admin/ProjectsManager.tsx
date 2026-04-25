"use client";
import { useEffect, useState } from "react";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "@/lib/firestore";
import { uploadImage } from "@/lib/storage";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [pointOfContact, setPointOfContact] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setTitle("");
    setDescription("");
    setPointOfContact("");
    setFiles([]);
    setExistingImages([]);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setTitle(p.title);
    setDescription(p.description);
    setPointOfContact(p.pointOfContact || "");
    setExistingImages(p.imageUrls || []);
    setFiles([]);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      // Upload new files
      const newUrls: string[] = [];
      for (const file of files) {
        const url = await uploadImage(file, title.replace(/\s+/g, "-").toLowerCase());
        newUrls.push(url);
      }
      const allImages = [...existingImages, ...newUrls];

      if (editing) {
        await updateProject(editing.id, { title, description, pointOfContact, imageUrls: allImages });
        toast.success("Project updated");
      } else {
        await addProject({ title, description, pointOfContact, imageUrls: allImages, createdAt: Date.now() });
        toast.success("Project added");
      }
      resetForm();
      load();
    } catch {
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      toast.success("Project deleted");
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">Projects</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="sm">
            <FiPlus className="mr-1" /> Add Project
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary">
              {editing ? "Edit Project" : "New Project"}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FiX size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
            />
            <textarea
              placeholder="Project Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
            />
            <input
              type="text"
              placeholder="Point of Contact (e.g. Dr. Sharma - 9876543210)"
              value={pointOfContact}
              onChange={(e) => setPointOfContact(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
            />

            {/* Existing images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {existingImages.map((url, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden group">
                    <Image src={url} alt="" fill className="object-cover" sizes="96px" />
                    <button
                      onClick={() => setExistingImages((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File upload */}
            <div>
              <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-accent/50 transition-colors">
                <FiUpload className="text-accent" />
                <span className="text-sm text-gray-500">
                  {files.length > 0 ? `${files.length} file(s) selected` : "Upload images"}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
              </label>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editing ? "Update" : "Add Project"}
              </Button>
              <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState message="No projects yet. Add your first project!" />
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                {p.imageUrls?.[0] ? (
                  <Image src={p.imageUrls[0]} alt={p.title} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                    No img
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-primary truncate">{p.title}</h4>
                <p className="text-gray-500 text-sm truncate">{p.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 text-gray-400 hover:text-accent transition-colors cursor-pointer"
                  aria-label="Edit project"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Delete project"
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
