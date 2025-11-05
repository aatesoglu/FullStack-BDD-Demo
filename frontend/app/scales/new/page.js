"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createScale } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function NewScalePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "tr",
    status: "draft",
    project_id: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createScale(form);
      toast.success("Scale created");
      router.push("/scales");
    } catch (err) {
      console.error("Create scale error:", err);
      toast.error("Failed to create scale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">New Scale</h1>
          <p className="text-gray-500">Create a new survey scale</p>
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
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50">{loading ? "Saving..." : "+ Create"}</button>
          <button type="button" onClick={() => router.push("/scales")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
