"use client";

import { useEffect, useState } from "react";
import { getResponses } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function ResponsesPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    try {
      setLoading(true);
      const data = await getResponses();
      setResponses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading responses:", error);
      toast.error("Failed to load responses");
      setResponses([]);
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
            <h1 className="text-3xl font-bold">Responses</h1>
            <p className="text-gray-500">Manage responses</p>
          </div>
          <a
            href="/responses/new"
            data-cy="new-response-btn"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded shadow"
          >
            + New Response
          </a>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search responses..."
            data-cy="response-search"
            className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <ul data-cy="response-list" className="space-y-4">
        {responses
          .filter((r) => !search || JSON.stringify(r).toLowerCase().includes(search.toLowerCase()))
          .map((response) => (
            <li key={response.id} className="border p-4 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-blue-600 font-semibold">Response #{response.id}</div>
                  <p className="text-gray-600 truncate text-sm">{JSON.stringify(response)}</p>
                </div>
                <div className="text-sm text-gray-500">#{response.id}</div>
              </div>
            </li>
          ))}
        {responses.length === 0 && <li className="text-gray-500">No responses found.</li>}
      </ul>
    </div>
  );
}
