"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSurveys } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function SurveysPage() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      const data = await getSurveys();
      setSurveys(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading surveys:", error);
      toast.error("Failed to load surveys");
      setSurveys([]);
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
            <h1 className="text-3xl font-bold">Surveys</h1>
            <p className="text-gray-500">Manage surveys</p>
          </div>
          <Link
            href="/surveys/new"
            data-cy="new-survey-btn"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded shadow"
          >
            + New Survey
          </Link>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search surveys..."
            data-cy="survey-search"
            className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <ul data-cy="survey-list" className="space-y-4">
        {surveys
          .filter((s) => !search || (s.title || "").toLowerCase().includes(search.toLowerCase()))
          .map((survey) => (
            <li
              key={survey.id}
              data-cy="survey-list-item"
              className="border p-4 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-blue-600 font-semibold">
                    {survey.title || "Untitled Survey"}
                  </div>
                  <p className="text-gray-600">Project ID: {survey.project_id || "N/A"}</p>
                </div>
                <div className="text-sm text-gray-500">#{survey.id}</div>
              </div>
            </li>
          ))}
        {surveys.length === 0 && (
          <li className="text-gray-500">No surveys found.</li>
        )}
      </ul>
    </div>
  );
}
