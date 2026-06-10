<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
=======
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
>>>>>>> c158259 (Add Supabase JS SDK)

export async function POST(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { ok: false, error: "Missing Supabase environment variables" },
        { status: 500 }
      );
    }

<<<<<<< HEAD
    const supabase = createClient(url, key);

    const body = await req.json();
    console.log("D: intake received:", body);

    const {
      visit_id,
      name,
      birthday,
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
      name,
      birthday,
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
=======
    // Supabase保存
    const { data: saved, error } = await supabase
      .from('intake_forms')
      .insert([
        {
          patient_name: data.patient_name,
          age: Number(data.age),
          sex: data.sex,
          symptoms: data.symptoms,
          history: data.history,
          medications: data.medications,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { ok: false, error: error.message },
>>>>>>> c158259 (Add Supabase JS SDK)
        { status: 500 }
      );
    }

<<<<<<< HEAD
    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err: any) {
    console.log("H: catch error:", err);
=======
    return NextResponse.json({
      ok: true,
      data: saved,
    });

  } catch (err) {
    console.error('intake error:', err);
>>>>>>> c158259 (Add Supabase JS SDK)
    return NextResponse.json(
      {
        ok: false,
        error: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
