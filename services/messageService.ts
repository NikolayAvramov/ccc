type ChatUser = {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
};

export type ChatMessage = {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: ChatUser;
};

export type ChatConversation = {
  id: string;
  senderId: string;
  receiverId: string;
  carId?: string | null;
  createdAt: string;
  updatedAt: string;
  sender: ChatUser;
  receiver: ChatUser;
  messages: ChatMessage[];
};

export type CurrentUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
};

export async function fetchCurrentUser(): Promise<CurrentUser> {
  const res = await fetch("/api/user", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function fetchConversations(): Promise<ChatConversation[]> {
  const res = await fetch("/api/conversations", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch conversations");
  return res.json();
}

export async function fetchConversation(id: string): Promise<ChatConversation> {
  const res = await fetch(`/api/conversations/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch conversation");
  return res.json();
}

export async function sendMessage(conversationId: string, content: string) {
  const res = await fetch("/api/messages", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, content }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export async function createConversation(
  carId: string,
): Promise<ChatConversation> {
  const res = await fetch("/api/conversations", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ carId }),
  });

  if (!res.ok) throw new Error("Failed to create conversation");
  const data = await res.json();
  return {
    ...data,
    messages: data.messages ?? [],
  };
}