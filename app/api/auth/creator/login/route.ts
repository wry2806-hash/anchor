import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/db";
import { setSessionCookie } from "../../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, code } = body as { email?: string; code?: string };

  if (!email || !code) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const creator = await prisma.creator.findUnique({
    where: { code: code.toUpperCase() }
  });

  if (!creator || creator.email.toLowerCase() !== email.toLowerCase()) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  await setSessionCookie({ role: "creator", creatorCode: creator.code });
  return NextResponse.json({ ok: true, code: creator.code });
}
