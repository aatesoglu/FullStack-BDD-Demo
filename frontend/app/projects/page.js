"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProjects, deleteProject } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading projects:", error);
      toast.error("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete ${title}?`)) {
      return;
    }

    try {
      await deleteProject(id);
      toast.success("Project deleted");
      loadProjects();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
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
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-gray-500">View and manage projects</p>
          </div>
          <Link
            href="/projects/new"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded shadow"
            data-cy="new-project-btn"
          >
            + New Project
          </Link>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            data-cy="project-search"
            className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <ul data-cy="project-list" className="space-y-4">
        {projects
          .filter((p) => !search || (p.title || '').toLowerCase().includes(search.toLowerCase()))
          .map((project) => (
            <li
              key={project.id}
              data-cy="project-list-item"
              className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
              role="button"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {project.title || "Untitled Project"}
                  </Link>
                  <p className="text-gray-600">{project.description || "No description"}</p>
                  <p className="text-sm text-gray-500">
                    Status: {project.status || "N/A"} | User ID: {project.user_id}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link
                    href={`/projects/${project.id}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(project.id, project.title); }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                    data-cy="delete-project"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        {projects.length === 0 && (
          <li className="text-gray-500">No projects found.</li>
        )}
      </ul>
    </div>
  );
}

