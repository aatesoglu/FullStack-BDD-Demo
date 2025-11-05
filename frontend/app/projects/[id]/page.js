"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProject } from "@/lib/api";
import Link from "next/link";

export default function ProjectDetailPage() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id;

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId]);

  const loadProject = async (id) => {
    try {
      setLoading(true);
      const data = await getProject(id);
      setProject(data);
    } catch (error) {
      console.error("Proje yüklenirken hata:", error);
      router.push("/projects");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!project) {
    return <div className="p-8">Project not found</div>;
  }

  return (
    <div className="container mx-auto p-8" data-cy="project-detail">
      <Link href="/projects" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back
      </Link>
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <p className="mt-1 text-lg" data-cy="project-title">
            {project.title || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <p className="mt-1 text-lg" data-cy="project-description">
            {project.description || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <p className="mt-1 text-lg">{project.status || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Credit Allocated</label>
          <p className="mt-1 text-lg">{project.credit_allocated || 0}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Credit Used</label>
          <p className="mt-1 text-lg">{project.credit_used || 0}</p>
        </div>
      </div>

      <div className="mt-6" data-cy="project-scales">
        <h2 className="text-xl font-semibold mb-2">Scales</h2>
        <p className="text-gray-500">Scale list will be shown here</p>
      </div>

      <div className="mt-6">
        <Link
          href={`/projects/${project.id}/edit`}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

