"use client";

import { useState } from "react";

export default function IntakePage() {
  const [form, setForm] = useState({
    visit_id: "",
    chief_complaint: "",
    symptoms_duration: "",
    severity: 5,
    has_fever: false,
    has_pain: false,
    has_chronic_disease: false,
    pregnancy_possible: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "severity"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("saved:", data);

    if (data.ok) {
      alert("送信成功");
    } else {
      alert("エラー");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1>🧑‍⚕️ 問診フォーム</h1>

      {/* 主訴 */}
      <div>
        <label>主訴</label>
        <input
          name="chief_complaint"
          value={form.chief_complaint}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>

      {/* 期間 */}
      <div>
        <label>症状の期間</label>
        <input
          name="symptoms_duration"
          value={form.symptoms_duration}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>

      {/* 重症度 */}
      <div>
        <label>重症度（1〜10）: {form.severity}</label>
        <input
          type="range"
          name="severity"
          min="1"
          max="10"
          value={form.severity}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>

      {/* チェック項目 */}
      <div>
        <label>
          <input
            type="checkbox"
            name="has_fever"
            checked={form.has_fever}
            onChange={handleChange}
          />
          発熱あり
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="has_pain"
            checked={form.has_pain}
            onChange={handleChange}
          />
          痛みあり
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="has_chronic_disease"
            checked={form.has_chronic_disease}
            onChange={handleChange}
          />
          慢性疾患あり
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="pregnancy_possible"
            checked={form.pregnancy_possible}
            onChange={handleChange}
          />
          妊娠の可能性あり
        </label>
      </div>

      {/* 送信 */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: 20,
          padding: 10,
          width: "100%",
          background: "black",
          color: "white",
        }}
      >
        送信
      </button>
    </div>
  );
}
