import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // ✅ JSONで受け取る（ここが重要）
    const body = await req.json();

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

    const { data, error } = await supabase
      .from("intake_forms")
      .insert([
        {
          visit_id,
          chief_complaint,
          symptoms_duration,
          severity: Number(severity),
          has_fever: Boolean(has_fever),
          has_pain: Boolean(has_pain),
          has_chronic_disease: Boolean(has_chronic_disease),
          pregnancy_possible: Boolean(pregnancy_possible),
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data });

  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
