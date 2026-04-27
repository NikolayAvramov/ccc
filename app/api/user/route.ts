import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 🍪 1. взимаме token от cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 🔐 2. декодираме JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    console.log("DECODED TOKEN:", decoded);
    // 🧠 3. взимаме user от DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    console.log("DB USER:", user);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // ❗ махаме sensitive данни
    const { password, ...safeUser } = user;

    // 📤 4. връщаме user
    return Response.json(safeUser);
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    // 🍪 1. взимаме token от cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 🔐 2. декодираме JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // 📥 3. взимаме данните от request body
    const body = await req.json();
    const { firstName, lastName, email, currentPassword, newPassword } = body;

    // 🧠 4. взимаме user от DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // 🔒 5. ако се опитва да промени пароля, проверяваме текущата
    if (newPassword) {
      if (!currentPassword) {
        return Response.json(
          { error: "Current password is required" },
          { status: 400 },
        );
      }

      const bcrypt = require("bcrypt");
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        return Response.json(
          { error: "Current password is incorrect" },
          { status: 401 },
        );
      }

      // 🔐 хешираме новата парола
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // 🔄 обновяваме user с нова парола
      const updatedUser = await prisma.user.update({
        where: { id: decoded.id },
        data: {
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          email: email || user.email,
          password: hashedPassword,
        },
      });

      const { password, ...safeUser } = updatedUser;
      return Response.json(safeUser);
    }

    // 🔄 6. обновяваме user без промена на паролата
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
      },
    });

    const { password, ...safeUser } = updatedUser;
    return Response.json(safeUser);
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}
