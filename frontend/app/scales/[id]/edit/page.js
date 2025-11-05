"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getScale, updateScale } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function EditScalePage() {
  const router = useRouter();
  const params = useParams();
  const scaleId = params?.id;

  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "tr",
    status: "draft",
    project_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (scaleId) {
      loadScale(scaleId);
    }
  }, [scaleId]);

  const loadScale = async (id) => {
    try {
      setLoadingData(true);
      const data = await getScale(id);
      setForm({
        title: data.title || "",
        description: data.description || "",
        language: data.language || "tr",
        status: data.status || "draft",
        project_id: data.project_id ?? "",
      });
    } catch (err) {
      console.error("Load scale error:", err);
      toast.error("Failed to load scale");
      router.push("/scales");
    } finally {
      setLoadingData(false);
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateScale(scaleId, form);
      toast.success("Scale updated");
      router.push("/scales");
    } catch (err) {
      console.error("Update scale error:", err);
      toast.error("Failed to update scale");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Scale</h1>
          <p className="text-gray-500">Update scale details</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Name</label>
          <input id="title" name="title" value={form.title} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={onChange} className="w-full px-3 py-2 border rounded" rows={3} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="language">Language</label>
            <input id="language" name="language" value={form.language} onChange={onChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={onChange} className="w-full px-3 py-2 border rounded">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="project_id">Project ID (optional)</label>
            <input id="project_id" name="project_id" value={form.project_id} onChange={onChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50">{loading ? "Saving..." : "Save"}</button>
          <button type="button" onClick={() => router.push("/scales")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
