"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAnalysis } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function NewAnalysisPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    analysis_type: "descriptive",
    project_id: "",
    survey_id: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAnalysis(form);
      toast.success("Analysis created");
      router.push("/analyses");
    } catch (err) {
      console.error("Create analysis error:", err);
      toast.error("Failed to create analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">New Analysis</h1>
          <p className="text-gray-500">Create a new analysis</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="analysis_type">Analysis Type</label>
          <select id="analysis_type" name="analysis_type" value={form.analysis_type} onChange={onChange} className="w-full px-3 py-2 border rounded">
            <option value="descriptive">descriptive</option>
            <option value="correlation">correlation</option>
            <option value="regression">regression</option>
            <option value="factor_analysis">factor_analysis</option>
            <option value="reliability">reliability</option>
            <option value="chi_square">chi_square</option>
            <option value="survival">survival</option>
            <option value="roc">roc</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="project_id">Project ID</label>
          <input id="project_id" name="project_id" value={form.project_id} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="survey_id">Survey ID</label>
          <input id="survey_id" name="survey_id" value={form.survey_id} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50">{loading ? "Saving..." : "+ Create"}</button>
          <button type="button" onClick={() => router.push("/analyses")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
