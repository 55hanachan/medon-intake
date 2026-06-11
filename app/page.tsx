"use client";

import { useState } from "react";

export default function Page() {
const [form, setForm] = useState({
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

const handleChange = (e: any) => {
const { name, value, type, checked } = e.target;

setForm((prev) => ({
  ...prev,
  [name]:
    type === "checkbox"
      ? checked
      : type === "range"
      ? Number(value)
      : value,
}));

};

const handleSubmit = async (e: any) => {
e.preventDefault();

try {
  setLoading(true);

  const res = await fetch("/api/intake", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "送信エラー");
  }

  alert("送信しました");

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

const page = {
background: "#f5f7fb",
minHeight: "100vh",
padding: 20,
};

const card = {
maxWidth: 720,
margin: "0 auto",
background: "white",
borderRadius: 16,
padding: 24,
boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const section = {
marginBottom: 20,
paddingBottom: 20,
borderBottom: "1px solid #eee",
};

const title = {
fontSize: 22,
fontWeight: "bold",
marginBottom: 16,
};

const label = {
fontSize: 13,
color: "#444",
marginBottom: 6,
display: "block",
};

const input = {
width: "100%",
padding: 10,
borderRadius: 8,
border: "1px solid #ccc",
marginBottom: 12,
};

const button = {
width: "100%",
padding: 12,
background: loading ? "#999" : "#111",
color: "white",
border: "none",
borderRadius: 10,
fontSize: 16,
cursor: "pointer",
};

return (
<div style={page}>
<form style={card} onSubmit={handleSubmit}>
<div style={title}>🧑‍⚕️ オンライン問診フォーム</div>

    <div style={section}>
      <label style={label}>visit ID</label>
      <input name="visit_id" style={input} value={form.visit_id} onChange={handleChange} />

      <label style={label}>氏名</label>
      <input name="name" style={input} value={form.name} onChange={handleChange} />

      <label style={label}>生年月日</label>
      <input type="date" name="birthday" style={input} value={form.birthday} onChange={handleChange} />
    </div>

    <div style={section}>
      <label style={label}>主訴</label>
      <input name="chief_complaint" style={input} value={form.chief_complaint} onChange={handleChange} />

      <label style={label}>症状の期間</label>
      <input name="symptoms_duration" style={input} value={form.symptoms_duration} onChange={handleChange} />
    </div>

    <div style={section}>
      <label style={label}>重症度: {form.severity}</label>
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

    <div style={section}>
      <label>
        <input type="checkbox" name="has_fever" checked={form.has_fever} onChange={handleChange} />
        発熱あり
      </label>

      <br />

      <label>
        <input type="checkbox" name="has_pain" checked={form.has_pain} onChange={handleChange} />
        痛みあり
      </label>

      <br />

      <label>
        <input type="checkbox" name="has_chronic_disease" checked={form.has_chronic_disease} onChange={handleChange} />
        慢性疾患あり
      </label>

      <br />

      <label>
        <input type="checkbox" name="pregnancy_possible" checked={form.pregnancy_possible} onChange={handleChange} />
        妊娠の可能性あり
      </label>
    </div>

    <button type="submit" style={button} disabled={loading}>
      {loading ? "送信中..." : "送信する"}
    </button>
  </form>
</div>

);
}
