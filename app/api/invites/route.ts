import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

const isValidCode = (code: string) => /^[A-Za-z]+$/.test(code);

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, code } = body as {
    email?: string;
    name?: string;
    code?: string;
  };

  if (!email || !name || !code || !isValidCode(code)) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  const invite = await prisma.invite.create({
    data: {
      email,
      name,
      code: code.toUpperCase(),
      token,
      expiresAt
    }
  });

  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const inviteLink = `${appUrl}/invite/${invite.token}`;

  return NextResponse.json({ inviteLink, token: invite.token });
}
