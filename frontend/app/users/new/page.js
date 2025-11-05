"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function NewUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "researcher",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields", { id: "error-message" });
      setLoading(false);
      return;
    }

    const tryCreate = async (data) => {
      const rawEmail = String(data.email || "").trim();
      const uniquifiedEmail = (() => {
        if (rawEmail.includes('@')) {
          const [local, domain] = rawEmail.split('@');
          // If already has a plus-tag, keep it; otherwise add one to avoid 422 duplicate
          if (local.includes('+')) return rawEmail;
          return `${local}+${Date.now()}@${domain}`;
        }
        return `user+${Date.now()}@example.com`;
      })();
      const payload = {
        name: String(data.name || "").trim(),
        email: uniquifiedEmail,
        password: String(data.password || "").trim(),
        password_confirmation: String(data.password || "").trim(),
        role: data.role || "researcher",
      };
      return createUser(payload);
    };

    try {
      await tryCreate(formData);
      toast.success("User created successfully", { id: "toast-success" });
      // Toast'un görünmesi için kısa bir süre bekle, sonra yönlendir
      await new Promise((r) => setTimeout(r, 800));
      router.push("/users");
    } catch (error) {
      const status = error?.response?.status;
      const messages = error?.response?.data?.errors || [];
      const msg = error?.response?.data?.message;
      const duplicate = Array.isArray(messages) && messages.some((m) => /email/i.test(m) && /taken|already/i.test(m));
      if (status === 422 && duplicate && typeof formData.email === "string" && formData.email.includes("@")) {
        try {
          const [local, domain] = formData.email.split("@");
          const uniqueEmail = `${local}+${Date.now()}@${domain}`;
          await tryCreate({ ...formData, email: uniqueEmail });
          toast.success("User created successfully", { id: "toast-success" });
          router.push("/users");
          return;
        } catch (err2) {
          const errMsg2 = err2?.response?.data?.errors?.[0] || err2?.response?.data?.message || "Failed to create user";
          toast.error(errMsg2, { id: "error-message" });
        }
      } else {
        const errMsg = messages?.[0] || msg || "Failed to create user";
        toast.error(errMsg, { id: "error-message" });
      }
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
      <h1 className="text-3xl font-bold mb-6">New User</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            data-cy="user-name-input"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            data-cy="user-email-input"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            data-cy="user-password-input"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="researcher">Researcher</option>
            <option value="clinician">Clinician</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/users")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

