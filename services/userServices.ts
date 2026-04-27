import { useQueryClient } from "@tanstack/react-query";

export async function getUserProfile() {
  const res = await fetch("/api/user", {
    credentials: "include",
  });
  return res.json();
}

export async function updateUserProfile(data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}) {
  const res = await fetch("/api/user", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update profile");
  }
  return res.json();
}

export async function logout() {
  await fetch("/api/logout", {
    method: "POST",
    credentials: "include",
  });
}
