"use client";

import { User, Mail, LogOut, Settings, X, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserType {
  userId: string;
  name?: string;
  email?: string;
  createdAt?: Date | string;
}

const ProfilePageClient = ({ user }: { user: UserType }) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(user.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
  
      if (!res.ok) throw new Error("Logout failed");
  
      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };
  

  // Handle profile update
  const handleSaveProfile = async () => {
    if (!editedName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });

      if (response.ok) {
        setIsEditModalOpen(false);
        router.refresh();
      } else {
        setError("Failed to update profile");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Format member since date
  const formatMemberDate = (date?: Date | string) => {
    if (!date) return "Recently";
    
    try {
      const memberDate = new Date(date);
      return memberDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <>
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Card */}
        <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
              <User size={22} />
            </div>

            <div>
              <p className="text-lg font-semibold text-slate-900">
                {user.name || "Unnamed User"}
              </p>
              <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={14} />
                {user.email || "No email"}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm transition-colors hover:bg-slate-50"
            >
              <Settings size={16} />
              Edit profile
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-100"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </section>

        {/* Account Info */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Account type</p>
            <p className="mt-1 font-medium text-slate-900">Free plan</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Member since</p>
            <p className="mt-1 font-medium text-slate-900">
              {formatMemberDate(user.createdAt)}
            </p>
          </div>
        </section>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Edit Profile
              </h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditedName(user.name || "");
                  setError("");
                }}
                className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-500 outline-none"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditedName(user.name || "");
                  setError("");
                }}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={16} />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePageClient;