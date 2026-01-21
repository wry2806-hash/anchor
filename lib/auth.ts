import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "anchor_session";

const getSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Missing AUTH_SECRET");
  }
  return new TextEncoder().encode(secret);
};

type SessionPayload = {
  role: "admin" | "creator";
  creatorCode?: string;
};

export const createSessionToken = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
};

export const verifySessionToken = async (token: string) => {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as SessionPayload;
};

export const setSessionCookie = async (payload: SessionPayload) => {
  const token = await createSessionToken(payload);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
};

export const clearSessionCookie = () => {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
};

export const getSessionFromCookies = async () => {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
};
