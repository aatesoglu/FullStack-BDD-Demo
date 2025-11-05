"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCreditTransaction } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function NewCreditTransactionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    transaction_type: "purchase",
    amount: "",
    balance_after: "",
    user_id: "",
    project_id: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // number cast
      const payload = {
        ...form,
        amount: parseFloat(form.amount),
        balance_after: parseFloat(form.balance_after),
      };
      await createCreditTransaction(payload);
      toast.success("Credit transaction created");
      router.push("/credit-transactions");
    } catch (err) {
      console.error("Create credit transaction error:", err);
      toast.error("Failed to create credit transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">New Credit Transaction</h1>
          <p className="text-gray-500">Create a new credit transaction</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="transaction_type">Type</label>
          <select id="transaction_type" name="transaction_type" value={form.transaction_type} onChange={onChange} className="w-full px-3 py-2 border rounded">
            <option value="purchase">purchase</option>
            <option value="usage">usage</option>
            <option value="refund">refund</option>
            <option value="bonus">bonus</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="amount">Amount</label>
            <input id="amount" name="amount" type="number" step="0.01" value={form.amount} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="balance_after">Balance After</label>
            <input id="balance_after" name="balance_after" type="number" step="0.01" value={form.balance_after} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="user_id">User ID</label>
            <input id="user_id" name="user_id" value={form.user_id} onChange={onChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="project_id">Project ID (optional)</label>
            <input id="project_id" name="project_id" value={form.project_id} onChange={onChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50">{loading ? "Saving..." : "+ Create"}</button>
          <button type="button" onClick={() => router.push("/credit-transactions")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
