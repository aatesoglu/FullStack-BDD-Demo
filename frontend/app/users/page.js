"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, deleteUser } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const router = useRouter();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    if (!confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    // Optimistic update
    setDeletingIds((prev) => new Set(prev).add(id));
    const prevUsers = users;
    setUsers((list) => list.filter((u) => u.id !== id));
    try {
      await deleteUser(id);
      toast.success("User deleted");
    } catch (error) {
      console.error("Delete error:", error);
      // If backend returns 422 but the user is actually gone, keep success UX.
      try {
        const fresh = await getUsers();
        setUsers(Array.isArray(fresh) ? fresh : []);
        const stillExists = (fresh || []).some((u) => u.id === id);
        if (!stillExists) {
          toast.success("User deleted");
        } else {
          toast.error("Failed to delete user");
          // Revert optimistic update
          setUsers(prevUsers);
        }
      } catch (_) {
        toast.error("Failed to delete user");
        setUsers(prevUsers);
      }
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link
          href="/users/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New User
        </Link>
      </div>

      <ul data-cy="user-list" className="space-y-4">
        {users.length === 0 ? (
          <li className="text-gray-500">No users found.</li>
        ) : (
          users.map((user) => (
            <li
              key={user.id}
              data-cy={`user-list-item`}
              className="border p-4 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Link
                    href={`/users/${user.id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {user.name || "Unnamed"}
                  </Link>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Role: {user.role || "N/A"}</p>
                </div>
                <div className="space-x-2">
                  <Link
                    href={`/users/${user.id}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                    data-cy={`edit-user-${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                    data-cy={`delete-user-${user.id}`}
                    disabled={deletingIds.has(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

