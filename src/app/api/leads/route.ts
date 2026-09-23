import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function discountCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `VWT5-${code}`;
}

export async function POST(request: Request) {
  let body: { email?: string; locale?: string; source?: string };
  try {
    body = (await request.json()) as {
      email?: string;
      locale?: string;
      source?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().slice(0, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const code = discountCode();
  try {
    await db.insert(leads).values({
      email,
      locale: (body.locale ?? "en").slice(0, 8),
      source: (body.source ?? "exit_intent").slice(0, 40),
      discountCode: code,
    });
  } catch (error) {
    console.error("Failed to store lead", error);
  }

  return NextResponse.json({ ok: true, discountCode: code }, { status: 201 });
}
