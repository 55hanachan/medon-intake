import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    console.log('intake received:', data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('intake error:', err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
