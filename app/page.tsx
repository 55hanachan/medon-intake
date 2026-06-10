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

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "24px 16px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    maxWidth: 640,
    margin: "0 auto",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  title: {
    margin: "0 0 20px",
    fontSize: 24,
    fontWeight: 700,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: 600,
    fontSize: 14,
  },
  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: 8,
    fontSize: 16,
    background: "#fff",
  },
  rangeWrap: {
    marginBottom: 16,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    fontSize: 15,
  },
  button: {
    marginTop: 20,
    padding: "12px 16px",
    width: "100%",
    border: "none",
    borderRadius: 8,
    background: "#111",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
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

    console.log("current form:", form);

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
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>問診フォーム</h1>

        <div style={styles.field}>
          <label style={styles.label}>visit_id</label>
          <input
            name="visit_id"
            value={form.visit_id}
            onChange={handleChange}
            style={styles.input}
            placeholder="例: V20260610-0001"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>氏名</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="例: 伊勢秀昭"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>生年月日</label>
          <input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>主訴</label>
          <input
            name="chief_complaint"
            value={form.chief_complaint}
            onChange={handleChange}
            style={styles.input}
            placeholder="例: GLP-1治療相談"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>症状の期間</label>
          <input
            name="symptoms_duration"
            value={form.symptoms_duration}
            onChange={handleChange}
            style={styles.input}
            placeholder="例: 3か月"
          />
        </div>

        <div style={styles.rangeWrap}>
          <label style={styles.label}>重症度（1〜10）: {form.severity}</label>
          <input
            type="range"
            name="severity"
            min="1"
            max="10"
            value={form.severity}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            name="has_fever"
            checked={form.has_fever}
            onChange={handleChange}
          />
          発熱あり
        </label>

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            name="has_pain"
            checked={form.has_pain}
            onChange={handleChange}
          />
          痛みあり
        </label>

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            name="has_chronic_disease"
            checked={form.has_chronic_disease}
            onChange={handleChange}
          />
          慢性疾患あり
        </label>

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            name="pregnancy_possible"
            checked={form.pregnancy_possible}
            onChange={handleChange}
          />
          妊娠の可能性あり
        </label>

        <button type="submit" style={styles.button}>
          送信
        </button>
      </form>
    </div>
  );
}
