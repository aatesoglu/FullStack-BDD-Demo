"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createResponse } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function NewResponsePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    participant_id: "",
    response_data: "{}",
    survey_id: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Parse response_data if it looks like JSON
      let payload = { ...form };
      try { payload.response_data = JSON.parse(form.response_data || "{}"); } catch {}
      await createResponse(payload);
      toast.success("Response created");
      router.push("/responses");
    } catch (err) {
      console.error("Create response error:", err);
      toast.error("Failed to create response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">New Response</h1>
          <p className="text-gray-500">Create a new response</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="participant_id">Participant ID</label>
          <input id="participant_id" name="participant_id" value={form.participant_id} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="survey_id">Survey ID</label>
          <input id="survey_id" name="survey_id" value={form.survey_id} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="response_data">Response Data (JSON)</label>
          <textarea id="response_data" name="response_data" value={form.response_data} onChange={onChange} className="w-full px-3 py-2 border rounded" rows={4} />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50">{loading ? "Saving..." : "+ Create"}</button>
          <button type="button" onClick={() => router.push("/responses")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
