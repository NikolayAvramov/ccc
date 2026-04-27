import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // 👈 това също се сменя
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // 🔥 FIX ТУК
    const { id: conversationId } = await params;

    if (!conversationId) {
      return new Response(JSON.stringify({ error: "Missing id" }), {
        status: 400,
      });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        sender: true,
        receiver: true,
        messages: {
          include: {
            sender: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!conversation) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
      });
    }

    // 🔐 optional security
    if (
      conversation.senderId !== decoded.id &&
      conversation.receiverId !== decoded.id
    ) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    return new Response(JSON.stringify(conversation), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch conversation" }),
      { status: 500 },
    );
  }
}
