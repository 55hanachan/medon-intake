import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("D: intake received:", body);
    return NextResponse.json(
      { ok: true, test: "reached after body" },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("H: catch error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
