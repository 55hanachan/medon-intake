"use client";

import React, {
useState,
ChangeEvent,
FormEvent,
ReactNode,
CSSProperties,
} from "react";

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

const [loading, setLoading] = useState(false);

const handleChange = (
e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
const target = e.target as HTMLInputElement;
const { name, type, value } = target;

```
setForm((prev) => ({
  ...prev,
  [name]:
    type === "checkbox"
      ? target.checked
      : type === "range"
      ? Number(value)
      : value,
}));
```

};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();

```
try {
  setLoading(true);

  console.log("送信データ", form);

  const res = await fetch("/api/intake", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  console.log("API結果", data);

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
```

};

return ( <main style={pageStyle}> <form onSubmit={handleSubmit} style={cardStyle}> <h1 style={titleStyle}>オンライン診療 事前問診</h1>

```
    <p style={subStyle}>
      診療をスムーズに行うため、事前にご入力ください（3〜5分）
    </p>

    <section style={sectionStyle}>
      <h2 style={sectionTitleStyle}>① 基本情報</h2>

      <Field label="お名前">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          placeholder="例：伊勢秀昭"
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

      <Field label="診察ID（visit_id）">
        <input
          type="text"
          name="visit_id"
          value={form.visit_id}
          onChange={handleChange}
          style={inputStyle}
          placeholder="例：V20260610-0001"
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
          style={textareaStyle}
          placeholder="例：体重減少相談"
        />
      </Field>
    </section>

    <section style={sectionStyle}>
      <h2 style={sectionTitleStyle}>③ 現在の健康状態</h2>

      <Field label="症状の期間">
        <input
          type="text"
          name="symptoms_duration"
          value={form.symptoms_duration}
          onChange={handleChange}
          style={inputStyle}
          placeholder="例：3か月"
        />
      </Field>
    </section>

    <section style={sectionStyle}>
      <h2 style={sectionTitleStyle}>④ 重症度</h2>

      <label style={labelStyle}>
        重症度（1〜10）: {form.severity}
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
      <h2 style={sectionTitleStyle}>⑤ 症状の有無</h2>

      <CheckRow
        name="has_fever"
        checked={form.has_fever}
        onChange={handleChange}
        label="発熱あり"
      />

      <CheckRow
        name="has_pain"
        checked={form.has_pain}
        onChange={handleChange}
        label="痛みあり"
      />

      <CheckRow
        name="has_chronic_disease"
        checked={form.has_chronic_disease}
        onChange={handleChange}
        label="慢性疾患あり"
      />

      <CheckRow
        name="pregnancy_possible"
        checked={form.pregnancy_possible}
        onChange={handleChange}
        label="妊娠の可能性あり"
      />
    </section>

    <button
      type="submit"
      disabled={loading}
      style={{
        ...buttonStyle,
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? "送信中..." : "送信"}
    </button>
  </form>
</main>
```

);
}

function Field({
label,
children,
}: {
label: string;
children: ReactNode;
}) {
return (
<div style={{ marginBottom: 16 }}> <label style={labelStyle}>{label}</label>
{children} </div>
);
}

function CheckRow({
name,
checked,
onChange,
label,
}: {
name: string;
checked: boolean;
onChange: (
e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;
label: string;
}) {
return ( <label style={checkStyle}> <input
     type="checkbox"
     name={name}
     checked={checked}
     onChange={onChange}
   />
{label} </label>
);
}

const pageStyle: CSSProperties = {
minHeight: "100vh",
background: "#f4f4f4",
padding: 16,
};

const cardStyle: CSSProperties = {
maxWidth: 560,
margin: "0 auto",
background: "#ffffff",
borderRadius: 16,
padding: 24,
boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const titleStyle: CSSProperties = {
fontSize: 24,
fontWeight: 700,
marginBottom: 8,
};

const subStyle: CSSProperties = {
color: "#666",
marginBottom: 24,
};

const sectionStyle: CSSProperties = {
marginBottom: 24,
};

const sectionTitleStyle: CSSProperties = {
fontSize: 16,
fontWeight: 700,
marginBottom: 12,
};

const labelStyle: CSSProperties = {
display: "block",
fontSize: 13,
color: "#666",
marginBottom: 6,
};

const inputStyle: CSSProperties = {
width: "100%",
boxSizing: "border-box",
padding: "12px 14px",
border: "1px solid #ddd",
borderRadius: 10,
fontSize: 16,
background: "#fff",
};

const textareaStyle: CSSProperties = {
...inputStyle,
minHeight: 120,
resize: "vertical",
};

const checkStyle: CSSProperties = {
display: "flex",
alignItems: "center",
gap: 8,
marginTop: 10,
fontSize: 14,
};

const buttonStyle: CSSProperties = {
width: "100%",
padding: "14px",
border: "none",
borderRadius: 10,
background: "#000",
color: "#fff",
fontSize: 16,
fontWeight: 700,
cursor: "pointer",
};
