"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUser } from "@/lib/api";
import Link from "next/link";

export default function UserDetailPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  useEffect(() => {
    if (userId) {
      loadUser(userId);
    }
  }, [userId]);

  const loadUser = async (id) => {
    try {
      setLoading(true);
      const data = await getUser(id);
      setUser(data);
    } catch (error) {
      console.error("Kullanıcı yüklenirken hata:", error);
      router.push("/users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>;
  }

  if (!user) {
    return <div className="p-8">Kullanıcı bulunamadı</div>;
  }

  return (
    <div className="container mx-auto p-8" data-cy="user-detail">
      <Link href="/users" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back
      </Link>
      <h1 className="text-3xl font-bold mb-6">User Details</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ad</label>
          <p className="mt-1 text-lg" data-cy="user-name">
            {user.name || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-lg" data-cy="user-email">
            {user.email || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <p className="mt-1 text-lg">{user.role || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Kredi Bakiyesi</label>
          <p className="mt-1 text-lg">{user.credits_balance || 0}</p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={`/users/${user.id}/edit`}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

