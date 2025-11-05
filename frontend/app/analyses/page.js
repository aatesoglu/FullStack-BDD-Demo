"use client";

import { useEffect, useState } from "react";
import { getAnalyses } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function AnalysesPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = async () => {
    try {
      setLoading(true);
      const data = await getAnalyses();
      setAnalyses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading analyses:", error);
      toast.error("Failed to load analyses");
      setAnalyses([]);
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
            <h1 className="text-3xl font-bold">Analyses</h1>
            <p className="text-gray-500">Manage analyses</p>
          </div>
          <a
            href="/analyses/new"
            data-cy="new-analysis-btn"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded shadow"
          >
            + New Analysis
          </a>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search analyses..."
            data-cy="analysis-search"
            className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <ul data-cy="analysis-list" className="space-y-4">
        {analyses
          .filter((a) => !search || JSON.stringify(a).toLowerCase().includes(search.toLowerCase()))
          .map((analysis) => (
            <li key={analysis.id} className="border p-4 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-blue-600 font-semibold">Analysis #{analysis.id}</div>
                  <p className="text-gray-600 truncate text-sm">{JSON.stringify(analysis)}</p>
                </div>
                <div className="text-sm text-gray-500">#{analysis.id}</div>
              </div>
            </li>
          ))}
        {analyses.length === 0 && <li className="text-gray-500">No analyses found.</li>}
      </ul>
    </div>
  );
}
