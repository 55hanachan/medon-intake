import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    console.log("A: /api/intake hit");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("B: env check", {
      hasUrl: !!url,
      hasKey: !!key,
    });

    if (!url || !key) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing Supabase environment variables",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(url, key);
    console.log("C: supabase client ready");

    const body = await req.json();
    console.log("D: intake received:", body);

    const {
      visit_id,
      chief_complaint,
      symptoms_duration,
      severity,
      has_fever,
      has_pain,
      has_chronic_disease,
      pregnancy_possible,
    } = body;

    const payload = {
      visit_id,
      chief_complaint,
      symptoms_duration,
      severity: severity === "" || severity == null ? null : Number(severity),
      has_fever:
        has_fever === true ||
        has_fever === "true" ||
        has_fever === 1 ||
        has_fever === "1",
      has_pain:
        has_pain === true ||
        has_pain === "true" ||
        has_pain === 1 ||
        has_pain === "1",
      has_chronic_disease:
        has_chronic_disease === true ||
        has_chronic_disease === "true" ||
        has_chronic_disease === 1 ||
        has_chronic_disease === "1",
      pregnancy_possible:
        pregnancy_possible === true ||
        pregnancy_possible === "true" ||
        pregnancy_possible === 1 ||
        pregnancy_possible === "1",
    };

    console.log("E: payload:", payload);
    console.log("F: before insert");

    const { data, error } = await supabase
      .from("intake_forms")
      .insert([payload])
      .select()
      .single();

    console.log("G: insert result:", { data, error });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
          details: error.details ?? null,
          hint: error.hint ?? null,
          code: error.code ?? null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err: any) {
    console.log("H: catch error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
