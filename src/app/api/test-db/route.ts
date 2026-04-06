import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sessions = await prisma.session.findMany();
    return NextResponse.json({
      status: "success",
      message: `Found ${sessions.length} sessions in DB! Prisma is connected internally.`,
      data: sessions
    });
  } catch (error: any) {
    console.error("Next.js DB Connection error:", error);
    return NextResponse.json({
      status: "error",
      message: error.message
    }, { status: 500 });
  }
}
