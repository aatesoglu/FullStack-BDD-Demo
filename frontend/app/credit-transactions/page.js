"use client";

import { useEffect, useState } from "react";
import { getCreditTransactions } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function CreditTransactionsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getCreditTransactions();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading credit transactions:", error);
      toast.error("Failed to load credit transactions");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <Toaster position="top-right" />
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Credit Transactions</h1>
            <p className="text-gray-500">Manage credit transactions</p>
          </div>
          <a
            href="/credit-transactions/new"
            data-cy="new-credit-transaction-btn"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded shadow"
          >
            + New Credit Transaction
          </a>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            data-cy="credit-transaction-search"
            className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <ul data-cy="credit-transaction-list" className="space-y-4">
        {items
          .filter((x) => !search || JSON.stringify(x).toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
            <li key={item.id} className="border p-4 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-blue-600 font-semibold">Transaction #{item.id}</div>
                  <p className="text-gray-600 truncate text-sm">{JSON.stringify(item)}</p>
                </div>
                <div className="text-sm text-gray-500">#{item.id}</div>
              </div>
            </li>
          ))}
        {items.length === 0 && <li className="text-gray-500">No credit transactions found.</li>}
      </ul>
    </div>
  );
}
