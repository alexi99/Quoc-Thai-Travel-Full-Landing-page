import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: string; locale?: string };
  try {
    body = (await request.json()) as { email?: string; locale?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().slice(0, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  try {
    await db
      .insert(subscribers)
      .values({ email, locale: (body.locale ?? "en").slice(0, 8) })
      .onConflictDoNothing({ target: subscribers.email });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to store subscriber", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
