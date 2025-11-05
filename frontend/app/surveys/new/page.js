"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSurvey } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function NewSurveyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    project_id: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSurvey(form);
      toast.success("Survey created");
      router.push("/surveys");
    } catch (err) {
      console.error("Create survey error:", err);
      toast.error("Failed to create survey");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">New Survey</h1>
          <p className="text-gray-500">Create a new survey</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
          <input id="title" name="title" value={form.title} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={onChange} className="w-full px-3 py-2 border rounded" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="project_id">Project ID (optional)</label>
          <input id="project_id" name="project_id" value={form.project_id} onChange={onChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50">{loading ? "Saving..." : "+ Create"}</button>
          <button type="button" onClick={() => router.push("/surveys")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
