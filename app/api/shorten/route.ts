import { NextResponse } from "next/server";
import { createAlias, findAlias } from "@/lib/db";

function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const { alias, url } = await req.json();

  if (!alias || !url) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  if (!isValidURL(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const existing = await findAlias(alias);
  if (existing) {
    return NextResponse.json({ error: "Alias already taken" }, { status: 409 });
  }

  await createAlias(alias, url);
  return NextResponse.json({ success: true, shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${alias}` });
}
