import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file     = formData.get("file") as File | null;
    const tradeId  = formData.get("trade_id") as string | null;
    const field    = formData.get("field") as "screenshot_pre" | "screenshot_post" | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Sanitise filename
    const ext      = path.extname(file.name) || ".png";
    const safeName = `trade_${tradeId ?? "tmp"}_${field ?? "img"}_${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "screenshots");

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, safeName), buffer);

    const publicPath = `/uploads/screenshots/${safeName}`;

    // If we have a tradeId, persist to DB
    if (tradeId && field) {
      const id = parseInt(tradeId, 10);
      if (!isNaN(id)) {
        await prisma.trade.update({
          where: { id },
          data: { [field]: publicPath },
        });
      }
    }

    return NextResponse.json({ path: publicPath });
  } catch (err) {
    console.error("[UPLOAD]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
