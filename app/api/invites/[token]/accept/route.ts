import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/db";

const isValidCode = (code: string) => /^[A-Za-z]+$/.test(code);

export async function POST(
  _request: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  const invite = await prisma.invite.findUnique({ where: { token } });
  if (!invite) {
    return NextResponse.json({ error: "Invalid invite." }, { status: 404 });
  }

  if (invite.acceptedAt || invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invite expired." }, { status: 400 });
  }

  if (!isValidCode(invite.code)) {
    return NextResponse.json({ error: "Invalid code." }, { status: 400 });
  }

  const creator = await prisma.creator.create({
    data: {
      name: invite.name,
      email: invite.email,
      code: invite.code.toUpperCase()
    }
  });

  await prisma.invite.update({
    where: { id: invite.id },
    data: { acceptedAt: new Date(), status: "accepted", creatorId: creator.id }
  });

  return NextResponse.json({ creatorId: creator.id, code: creator.code });
}
