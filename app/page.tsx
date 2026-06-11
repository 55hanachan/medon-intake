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

export default function Page() {
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

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value } = target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? target.checked
          : type === "range"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "送信エラー");
      }

      alert("送信成功");

      setForm({
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
    } catch (err: any) {
      alert("エラー: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>オンライン問診</h1>
        <p style={styles.subtitle}>
          事前にご入力ください（所要時間：約3分）
        </p>

        <input
          name="name"
          placeholder="お名前"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="visit_id"
          placeholder="visit_id"
          value={form.visit_id}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="chief_complaint"
          placeholder="主訴"
          value={form.chief_complaint}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.block}>
          <label>
            重症度: {form.severity}
            <input
              type="range"
              name="severity"
              min="1"
              max="10"
              value={form.severity}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <label style={styles.check}>
          <input
            type="checkbox"
            name="has_fever"
            checked={form.has_fever}
            onChange={handleChange}
          />
          発熱あり
        </label>

        <label style={styles.check}>
          <input
            type="checkbox"
            name="has_pain"
            checked={form.has_pain}
            onChange={handleChange}
          />
          痛みあり
        </label>

        <label style={styles.check}>
          <input
            type="checkbox"
            name="has_chronic_disease"
            checked={form.has_chronic_disease}
            onChange={handleChange}
          />
          慢性疾患あり
        </label>

        <label style={styles.check}>
          <input
            type="checkbox"
            name="pregnancy_possible"
            checked={form.pregnancy_possible}
            onChange={handleChange}
          />
          妊娠の可能性あり
        </label>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "送信中..." : "送信"}
        </button>
      </form>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    padding: 20,
  } as React.CSSProperties,

  card: {
    width: "100%",
    maxWidth: 600,
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  } as React.CSSProperties,

  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
  } as React.CSSProperties,

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    border: "1px solid #ddd",
    borderRadius: 10,
    fontSize: 14,
  } as React.CSSProperties,

  block: {
    marginBottom: 12,
  } as React.CSSProperties,

  check: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    fontSize: 14,
  } as React.CSSProperties,

  button: {
    width: "100%",
    padding: 14,
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 700,
    marginTop: 10,
    cursor: "pointer",
  } as React.CSSProperties,
};
