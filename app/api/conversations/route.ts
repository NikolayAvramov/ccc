import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key",
    ) as { id: string };

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ senderId: decoded.id }, { receiverId: decoded.id }],
      },
      include: {
        sender: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        receiver: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { updatedAt: "desc" },
    });

    return new Response(JSON.stringify(conversations), { status: 200 });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch conversations" }),
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies(); // ❗ махни await
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const { carId } = await req.json();

    if (!carId) {
      return new Response(JSON.stringify({ error: "carId is required" }), {
        status: 400,
      });
    }

    // 🔥 намираме owner-а
    const car = await prisma.car.findUnique({
      where: { id: carId },
      select: { owner: true }, // 👈 при теб е owner, не ownerId
    });

    if (!car) {
      return new Response(JSON.stringify({ error: "Car not found" }), {
        status: 404,
      });
    }

    const receiverId = car.owner;

    // ❗ не можеш да пишеш на себе си
    if (receiverId === decoded.id) {
      return new Response(
        JSON.stringify({ error: "Cannot message yourself" }),
        { status: 400 },
      );
    }

    // ✅ ако вече има разговор
    const existing = await prisma.conversation.findFirst({
      where: {
        OR: [
          { senderId: decoded.id, receiverId },
          { senderId: receiverId, receiverId: decoded.id },
        ],
        carId,
      },
    });

    if (existing) {
      return new Response(JSON.stringify(existing), { status: 200 });
    }

    // ✅ създаване
    const conversation = await prisma.conversation.create({
      data: {
        senderId: decoded.id,
        receiverId,
        carId,
      },
      include: {
        sender: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        receiver: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    return new Response(JSON.stringify(conversation), { status: 201 });
  } catch (error) {
    console.error("FULL ERROR:", error);

    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
    });
  }
}
