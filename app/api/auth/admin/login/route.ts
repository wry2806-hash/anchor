import { NextResponse } from "next/server";
import { setSessionCookie } from "../../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body as { password?: string };

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  await setSessionCookie({ role: "admin" });
  return NextResponse.json({ ok: true });
}
