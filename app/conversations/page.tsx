"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoute from "@/app/components/ProtectedRoute";

type Message = {
  id: string;
  content: string;
  createdAt: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
};

type Conversation = {
  id: string;
  senderId: string;
  receiverId: string;
  sender: User;
  receiver: User;
  messages: Message[];
};

type CurrentUser = {
  id: string;
};

async function fetchCurrentUser(): Promise<CurrentUser> {
  const res = await fetch("/api/user", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

async function fetchConversations(): Promise<Conversation[]> {
  const res = await fetch("/api/conversations", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch conversations");
  return res.json();
}

function ConversationsContent() {
  const router = useRouter();

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
    retry: false,
    enabled: !!currentUser,
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading conversations...</p>;
  }

  if (!conversations.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No conversations yet
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-3">
      {conversations.map((conv) => {
        const otherUser =
          conv.senderId === currentUser?.id ? conv.receiver : conv.sender;

        const lastMessage = conv.messages?.[0]?.content || "No messages yet";

        return (
          <div
            key={conv.id}
            onClick={() => router.push(`/messages/${conv.id}`)}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border hover:shadow-md cursor-pointer transition"
          >
            {/* AVATAR */}
            <img
              src={
                otherUser.avatar
                  ? `http://localhost:3000/${otherUser.avatar}`
                  : "/default-avatar.png"
              }
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">
                {otherUser.firstName} {otherUser.lastName}
              </p>

              <p className="text-xs text-gray-500 truncate">{lastMessage}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ConversationsList() {
  return (
    <ProtectedRoute>
      <ConversationsContent />
    </ProtectedRoute>
  );
}
