"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/services/userServices";
import { FaTimes } from "react-icons/fa";

interface UpdateProfileProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  onClose: () => void;
}

export default function UpdateProfile({ user, onClose }: UpdateProfileProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState<"info" | "password">("info");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      setSuccess("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setTimeout(() => {
        setSuccess("");
        if (activeTab === "password") {
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      }, 2000);
    },
    onError: (error: any) => {
      setError(error.message || "Failed to update profile");
      setTimeout(() => setError(""), 3000);
    },
  });

  const handleUpdateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("All fields are required");
      return;
    }

    updateMutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setError("All password fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    updateMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-3 text-center font-medium transition ${
              activeTab === "info"
                ? "text-orange-500 border-b-2 border-b-orange-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-3 text-center font-medium transition ${
              activeTab === "password"
                ? "text-orange-500 border-b-2 border-b-orange-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Change Password
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="m-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="m-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {activeTab === "info" ? (
            <form onSubmit={handleUpdateInfo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInfoChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInfoChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInfoChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="w-full mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition font-medium"
              >
                {updateMutation.isPending
                  ? "Updating..."
                  : "Update Information"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="w-full mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition font-medium"
              >
                {updateMutation.isPending ? "Updating..." : "Change Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
