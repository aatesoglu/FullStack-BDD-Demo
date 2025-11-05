"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createScaleItem } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function NewScaleItemPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    content: "",
    item_type: "likert",
    order: 1,
    scale_id: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createScaleItem(form);
      toast.success("Scale item created");
      router.push("/scale-items");
    } catch (err) {
      console.error("Create scale item error:", err);
      toast.error("Failed to create scale item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">New Scale Item</h1>
          <p className="text-gray-500">Create a new scale item</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="content">Content</label>
          <input id="content" name="content" value={form.content} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="item_type">Type</label>
            <select id="item_type" name="item_type" value={form.item_type} onChange={onChange} className="w-full px-3 py-2 border rounded">
              <option value="likert">Likert</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="open_ended">Open Ended</option>
              <option value="boolean">Boolean</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="order">Order</label>
            <input id="order" name="order" type="number" value={form.order} onChange={onChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="scale_id">Scale ID</label>
            <input id="scale_id" name="scale_id" value={form.scale_id} onChange={onChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50">{loading ? "Saving..." : "+ Create"}</button>
          <button type="button" onClick={() => router.push("/scale-items")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
