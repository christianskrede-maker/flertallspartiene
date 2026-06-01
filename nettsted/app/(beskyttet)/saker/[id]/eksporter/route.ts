import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    melding: "Samlet eksport kommer i neste versjon",
    status: "ok",
  });
}
