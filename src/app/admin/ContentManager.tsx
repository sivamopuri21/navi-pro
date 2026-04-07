"use client";
import { useEffect, useState } from "react";
import { getSiteContent, updateSiteContent } from "@/lib/firestore";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { FiPlus, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

export function ContentManager() {
  const [about, setAbout] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteContent()
      .then((data) => {
        if (data) {
          setAbout(data.about || "");
          setServices(data.services || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const addService = () => {
    if (!newService.trim()) return;
    setServices((prev) => [...prev, newService.trim()]);
    setNewService("");
  };

  const removeService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteContent({ about, services });
      toast.success("Content updated");
    } catch {
      toast.error("Failed to update. Make sure the 'siteContent/main' document exists in Firestore.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-deep mb-6">Site Content</h2>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-6">
        {/* About */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Us Content
          </label>
          <textarea
            rows={6}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none resize-none"
            placeholder="Write about your company..."
          />
        </div>

        {/* Services */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services List
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {services.map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 text-gold rounded-full text-sm"
              >
                {s}
                <button
                  onClick={() => removeService(i)}
                  className="hover:text-red-500 cursor-pointer"
                  aria-label={`Remove ${s}`}
                >
                  <FiX size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addService()}
              placeholder="Add a service..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm"
            />
            <Button onClick={addService} size="sm" variant="ghost">
              <FiPlus size={16} />
            </Button>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Note: Create a document at <code>siteContent/main</code> in Firestore if it doesn&apos;t exist yet.
      </p>
    </div>
  );
}
