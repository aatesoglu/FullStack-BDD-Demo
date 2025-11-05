"use client";

import { useEffect, useState } from "react";
import { getScaleItems } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function ScaleItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getScaleItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading scale items:", error);
      toast.error("Failed to load scale items");
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
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Scale Items</h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
              Total: {items.length}
            </span>
          </div>
          <a
            href="/scale-items/new"
            data-cy="new-scale-item-btn"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded shadow"
          >
            + New Scale Item
          </a>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scale items..."
            data-cy="scale-item-search"
            className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <ul data-cy="scale-item-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items
          .filter((it) => !search || (it.content || "").toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
            <li
              key={item.id}
              data-cy="scale-item-list-item"
              className="border p-4 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full mb-2">Order {item.order ?? 0}</span>
                  <div className="text-blue-600 font-semibold">
                    {item.content || "Item"}
                  </div>
                  <p className="text-gray-600">Type: {item.item_type || "N/A"}</p>
                  <p className="text-sm text-gray-500">Scale ID: {item.scale_id}</p>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <span className="cursor-pointer" title="Edit">✏️</span>
                  <span className="cursor-pointer" title="Delete">🗑️</span>
                </div>
              </div>
            </li>
          ))}
        {items.length === 0 && (
          <li className="text-gray-500">No scale items found.</li>
        )}
      </ul>
    </div>
  );
}
