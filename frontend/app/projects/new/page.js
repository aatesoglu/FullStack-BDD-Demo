"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProject, getUsers } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user_id: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
      if (data.length > 0 && !formData.user_id) {
        setFormData((prev) => ({ ...prev, user_id: data[0].id }));
      }
    } catch (error) {
      console.error("Kullanıcılar yüklenirken hata:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.user_id) {
      toast.error("Lütfen tüm gerekli alanları doldurun");
      setLoading(false);
      return;
    }

    try {
      await createProject({
        ...formData,
        status: "active",
        credit_allocated: 0,
        credit_used: 0,
      });
      toast.success("Proje oluşturuldu", { id: "toast-success" });
      router.push("/projects");
    } catch (error) {
      console.error("Proje oluşturma hatası:", error);
      const errorMsg =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        "Proje oluşturulamadı";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">Yeni Proje</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            İsim
          </label>
          <input
            type="text"
            id="title"
            name="title"
            data-cy="project-title-input"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Açıklama
          </label>
          <textarea
            id="description"
            name="description"
            data-cy="project-description-input"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">
            Kullanıcı
          </label>
          <select
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Kullanıcı seçin</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Oluşturuluyor..." : "Oluştur"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

