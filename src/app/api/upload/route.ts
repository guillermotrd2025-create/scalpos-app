import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file     = formData.get("file") as File | null;
    const tradeId  = formData.get("trade_id") as string | null;
    const field    = formData.get("field") as "screenshot_pre" | "screenshot_post" | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Compress image to WebP format to minimize DB storage size
    // We resize it to max 1280px width to keep it very lightweight
    // This allows us to store it in DB (Vercel has read-only filesystem)
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    // Convert to Data URL (base64) string
    const base64Str = compressedBuffer.toString("base64");
    const dataUrl = `data:image/webp;base64,${base64Str}`;

    // If we have a tradeId, persist to DB immediately
    if (tradeId && field) {
      const id = parseInt(tradeId, 10);
      if (!isNaN(id)) {
        await prisma.trade.update({
          where: { id },
          data: { [field]: dataUrl },
        });
      }
    }

    // Return the Base64 data URL to the frontend
    return NextResponse.json({ path: dataUrl });
  } catch (err) {
    console.error("[UPLOAD]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
