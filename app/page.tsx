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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
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
      console.error(err);
      alert(`エラー: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h1 style={titleStyle}>オンライン診療 事前問診</h1>

        <p style={subStyle}>
          診療をスムーズに行うため、事前にご入力ください（3〜5分）
        </p>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>① 基本情報</h2>

          <Field label="お名前">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="生年月日">
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="visit_id">
            <input
              name="visit_id"
              value={form.visit_id}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>② ご相談内容</h2>

          <Field label="主訴">
            <textarea
              name="chief_complaint"
              value={form.chief_complaint}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: 100 }}
            />
          </Field>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>③ 症状の期間</h2>

          <Field label="期間">
            <input
              name="symptoms_duration"
              value={form.symptoms_duration}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>④ 重症度</h2>

          <label style={labelStyle}>
            重症度: {form.severity}
          </label>

          <input
            type="range"
            name="severity"
            min="1"
            max="10"
            value={form.severity}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>⑤ チェック項目</h2>

          <CheckBox
            name="has_fever"
            checked={form.has_fever}
            onChange={handleChange}
            label="発熱あり"
          />

          <CheckBox
            name="has_pain"
            checked={form.has_pain}
            onChange={handleChange}
            label="痛みあり"
          />

          <CheckBox
            name="has_chronic_disease"
            checked={form.has_chronic_disease}
            onChange={handleChange}
            label="慢性疾患あり"
          />

          <CheckBox
            name="pregnancy_possible"
            checked={form.pregnancy_possible}
            onChange={handleChange}
            label="妊娠の可能性あり"
          />
        </section>

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "送信中..." : "送信する"}
        </button>
      </form>
    </main>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function CheckBox({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: any;
  label: string;
}) {
  return (
    <label style={{ display: "block", marginBottom: 8 }}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ marginRight: 8 }}
      />
      {label}
    </label>
  );
}

/* ---------------- STYLES ---------------- */

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f4f4f4",
  padding: 16,
};

const cardStyle: React.CSSProperties = {
  maxWidth: 600,
  margin: "0 auto",
  background: "#fff",
  padding: 24,
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const titleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginBottom: 8,
};

const subStyle: React.CSSProperties = {
  color: "#666",
  marginBottom: 20,
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 20,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 10,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  color: "#555",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 14,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
};
