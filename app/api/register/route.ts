import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function makeId() {
  return Math.random().toString(36).substring(2, 12);
}

export async function POST(req: Request) {
  const data = await req.formData();
  const avatarFile = data.get("avatar") as File | null;

  const id = makeId();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  let avatar: string | null = null;

  try {
    // 📸 записване на файл
    if (avatarFile) {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + "-" + avatarFile.name;

      const uploadDir = path.join(process.cwd(), "public/uploads");

      // ако няма папка → създай я
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      avatar = "/uploads/" + fileName;
    }

    const user = await prisma.user.create({
      data: {
        id,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        avatar,
      },
    });

    return Response.json(user, { status: 201 });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    const error = err as any;

    if (error.code === "P2002") {
      return Response.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }

    return Response.json({ message: "Error creating user" }, { status: 500 });
  }
}
