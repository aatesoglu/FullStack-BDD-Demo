"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getScales, deleteScale } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function ScalesPage() {
  const [scales, setScales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadScales();
  }, []);

  const loadScales = async () => {
    try {
      setLoading(true);
      const data = await getScales();
      setScales(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading scales:", error);
      toast.error("Failed to load scales");
      setScales([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete scale: ${title || '#' + id}?`)) return;
    try {
      await deleteScale(id);
      toast.success("Scale deleted");
      loadScales();
    } catch (err) {
      console.error("Delete scale error:", err);
      // Some backends may return 422 even if the record is actually deleted via callbacks.
      // Reload the list; if the scale is gone, treat it as success to keep UX stable.
      try {
        const fresh = await getScales();
        setScales(Array.isArray(fresh) ? fresh : []);
        const stillExists = (fresh || []).some((s) => s.id === id);
        if (!stillExists) {
          toast.success("Scale deleted");
          return;
        }
      } catch (_) {}
      toast.error("Failed to delete scale");
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
            <h1 className="text-3xl font-bold">Scales</h1>
            <p className="text-gray-500">Manage survey scales</p>
          </div>
          <Link
            href="/scales/new"
            data-cy="new-scale-btn"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded shadow"
          >
            + New Scale
          </Link>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scales..."
            data-cy="scale-search"
            className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <ul data-cy="scale-list" className="space-y-4">
        {scales
          .filter((s) => !search || (s.title || "").toLowerCase().includes(search.toLowerCase()))
          .map((scale) => (
            <li
              key={scale.id}
              data-cy="scale-list-item"
              className="border p-4 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-blue-600 font-semibold">
                    {scale.title || "Untitled Scale"}
                  </div>
                  <p className="text-gray-600">Language: {scale.language || "N/A"}</p>
                  <p className="text-sm text-gray-500">Status: {scale.status || "N/A"} | Items: {scale.item_count ?? 0}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/scales/${scale.id}/edit`}
                    data-cy={`edit-scale-${scale.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(scale.id, scale.title)}
                    data-cy={`delete-scale-${scale.id}`}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <div className="text-sm text-gray-500">#{scale.id}</div>
                </div>
              </div>
            </li>
          ))}
        {scales.length === 0 && (
          <li className="text-gray-500">No scales found.</li>
        )}
      </ul>
    </div>
  );
}
