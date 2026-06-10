"use client";

import { useState } from "react";

type FormState = {
  visit_id: string;
  name: string;
  birthday: string;
  chief_complaint: string;
  symptoms_duration: string;
  severity: number;
  has_fever: boolean;
  has_pain: boolean;
  has_chronic_disease: boolean;
  pregnancy_possible: boolean;
};

export default function IntakePage() {
  const [form, setForm] = useState<FormState>({
    visit_id: "",
    name: "",
    birthday: "",
    chief_complaint: "",
    symptoms_duration: "",
    severity: 5,
    has_fever: false,
    has_pain: false,
    has_chronic_disease: false,
    pregnancy_possible: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <form onSubmit={handleSubmit} style={{ padding: 20, maxWidth: 600 }}>
      <h1>🧑‍⚕️ 問診フォーム</h1>

      <div>
        <label>visit_id</label>
        <input
          name="visit_id"
          value={form.visit_id}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
          placeholder="例: V20260610-0001"
        />
      </div>

      <div>
        <label>氏名</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
          placeholder="例: 伊勢秀昭"
        />
      </div>

      <div>
        <label>生年月日</label>
        <input
          type="date"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>

      <div>
        <label>主訴</label>
        <input
          name="chief_complaint"
          value={form.chief_complaint}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>

      <div>
        <label>症状の期間</label>
        <input
          name="symptoms_duration"
          value={form.symptoms_duration}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>

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

      <button
        type="submit"
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
    </form>
  );
}
