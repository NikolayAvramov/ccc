"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

type Message = {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
};

type Conversation = {
  id: string;
  senderId: string;
  receiverId: string;
  sender: any;
  receiver: any;
  messages: Message[];
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

async function fetchCurrentUser(): Promise<User> {
  const res = await fetch("/api/user", { credentials: "include" });
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

async function fetchConversation(id: string): Promise<Conversation> {
  const res = await fetch(`/api/conversations/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch conversation");
  return res.json();
}

async function sendMessage(conversationId: string, content: string) {
  const res = await fetch("/api/messages", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, content }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

// 🔥 ВАЖНО: само carId
async function createConversation(carId: string): Promise<Conversation> {
  const res = await fetch("/api/conversations", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ carId }),
  });

  if (!res.ok) throw new Error("Failed to create conversation");
  return res.json();
}

interface MessagesProps {
  onClose: () => void;
  carId?: string; // 👈 подаваш това от car page
}

export default function Messages({ onClose, carId }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
    retry: false,
    enabled: !!currentUser,
  });

  const { data: selectedConv } = useQuery({
    queryKey: ["conversation", selectedConversation],
    queryFn: () => fetchConversation(selectedConversation!),
    enabled: !!selectedConversation && !!currentUser,
    retry: false,
  });

  // ✅ send message
  const sendMutation = useMutation({
    mutationFn: ({
      conversationId,
      content,
    }: {
      conversationId: string;
      content: string;
    }) => sendMessage(conversationId, content),

    onSuccess: () => {
      setMessageText("");
      queryClient.invalidateQueries({
        queryKey: ["conversation", selectedConversation],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },

    onError: (err: any) => {
      setError(err.message);
    },
  });

  // ✅ create conversation
  const createConvMutation = useMutation({
    mutationFn: (carId: string) => createConversation(carId),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setSelectedConversation(data.id);
    },

    onError: (err: any) => {
      setError(err.message);
    },
  });

  const handleSendMessage = () => {
    if (!selectedConversation || !messageText.trim()) return;

    sendMutation.mutate({
      conversationId: selectedConversation,
      content: messageText,
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-5xl h-[700px] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-600" size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mx-4 mt-4 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* LEFT - CONVERSATIONS LIST */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
            {/* START CHAT BUTTON */}
            {carId && (
              <button
                onClick={() => createConvMutation.mutate(carId)}
                className="m-4 p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                + Start New Conversation
              </button>
            )}

            {/* CONVERSATIONS LIST */}
            <div className="overflow-y-auto flex-1">
              {conversations.length === 0 ? (
                <div className="p-4 text-gray-500 text-center text-sm">
                  No conversations yet
                </div>
              ) : (
                conversations.map((conv) => {
                  const otherUser =
                    conv.senderId === currentUser?.id
                      ? conv.receiver
                      : conv.sender;
                  const isSelected = selectedConversation === conv.id;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 text-left transition-colors border-b border-gray-100 hover:bg-white ${
                        isSelected ? "bg-white shadow-sm border-l-4 border-l-orange-500" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                          {otherUser.firstName[0]}
                          {otherUser.lastName[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">
                            {otherUser.firstName} {otherUser.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {conv.messages.length > 0
                              ? conv.messages[conv.messages.length - 1].content.substring(0, 30) + "..."
                              : "No messages yet"}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT - MESSAGES AREA */}
          <div className="w-2/3 flex flex-col bg-white">
            {!selectedConversation ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4 text-gray-300">💬</div>
                <p className="text-gray-500 text-lg">Select a conversation to start</p>
              </div>
            ) : (
              <>
                {/* MESSAGES CONTAINER */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {selectedConv?.messages && selectedConv.messages.length > 0 ? (
                    selectedConv.messages.map((msg, index) => {
                      const isOwn = msg.senderId === currentUser?.id;
                      const showTimestamp =
                        index === 0 ||
                        new Date(selectedConv.messages[index - 1].createdAt).toDateString() !==
                          new Date(msg.createdAt).toDateString();

                      return (
                        <div key={msg.id}>
                          {showTimestamp && (
                            <div className="flex justify-center my-4">
                              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                {formatDate(msg.createdAt)}
                              </span>
                            </div>
                          )}
                          <div
                            className={`flex gap-3 ${
                              isOwn ? "justify-end" : "justify-start"
                            }`}
                          >
                            {!isOwn && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {msg.sender.firstName[0]}
                                {msg.sender.lastName[0]}
                              </div>
                            )}
                            <div
                              className={`max-w-xs px-4 py-3 rounded-2xl break-words ${
                                isOwn
                                  ? "bg-orange-500 text-white rounded-br-none"
                                  : "bg-gray-200 text-gray-800 rounded-bl-none"
                              }`}
                            >
                              {!isOwn && (
                                <p className="text-xs font-semibold mb-1 opacity-75">
                                  {msg.sender.firstName}
                                </p>
                              )}
                              <p>{msg.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  isOwn
                                    ? "text-orange-100"
                                    : "text-gray-500"
                                }`}
                              >
                                {formatTime(msg.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No messages yet. Start the conversation!
                    </div>
                  )}
                </div>

                {/* INPUT AREA */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  {currentUser ? (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full p-3 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <FaPaperPlane size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="bg-orange-50 border-2 border-orange-300 p-4 rounded-lg text-center">
                      <p className="text-orange-700 font-semibold">
                        You must be logged in to send messages
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
