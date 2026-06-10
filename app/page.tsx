"use client";

import { useState } from "react";

type FormState = {
  visit_id: string;
  name: string;
  birthday: string;
  height: string;
  weight: string;
  phone: string;
  email: string;
  consultation: string;
  healthStatus: string;
  other: string;
  emergencyName: string;
  emergencyPhone: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeInsurance: boolean;
  insuranceFile: File | null;
};

export default function IntakePage() {
  const [form, setForm] = useState<FormState>({
    visit_id: "",
    name: "",
    birthday: "",
    height: "",
    weight: "",
    phone: "",
    email: "",
    consultation: "",
    healthStatus: "",
    other: "",
    emergencyName: "",
    emergencyPhone: "",
    agreeTerms: false,
    agreePrivacy: false,
    agreeInsurance: false,
    insuranceFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? target.checked
          : type === "file"
          ? target.files?.[0] ?? null
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("current form:", form);

    const payload = {
      visit_id: form.visit_id,
      name: form.name,
      birthday: form.birthday,
      height: form.height,
      weight: form.weight,
      phone: form.phone,
      email: form.email,
      consultation: form.consultation,
      healthStatus: form.healthStatus,
      other: form.other,
      emergencyName: form.emergencyName,
      emergencyPhone: form.emergencyPhone,
      agreeTerms: form.agreeTerms,
      agreePrivacy: form.agreePrivacy,
      agreeInsurance: form.agreeInsurance,
    };

    const res = await fetch("/api/intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
    <div style={{ minHeight: "100vh", background: "#f4f4f4", padding: 16 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 560,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          オンライン診療 事前問診
        </h1>
        <p style={{ color: "#666", marginBottom: 24 }}>
          診療をスムーズに行うため、事前にご入力ください（3〜5分）
        </p>

        <Section title="① 基本情報">
          <Field label="visit_id">
            <input name="visit_id" value={form.visit_id} onChange={handleChange} style={inputStyle} placeholder="例: V20260610-0001" />
          </Field>

          <Field label="お名前">
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} placeholder="例: 伊勢秀昭" />
          </Field>

          <Field label="生年月日">
            <input type="date" name="birthday" value={form.birthday} onChange={handleChange} style={inputStyle} />
          </Field>

          <Field label="身長(cm)">
            <input name="height" value={form.height} onChange={handleChange} style={inputStyle} placeholder="例: 176cm" />
          </Field>

          <Field label="体重(kg)">
            <input name="weight" value={form.weight} onChange={handleChange} style={inputStyle} placeholder="例: 75kg" />
          </Field>

          <Field label="電話番号">
            <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} placeholder="例: 08012345678" />
          </Field>

          <Field label="メールアドレス">
            <input type="email" name="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="例: example@mail.com" />
          </Field>
        </Section>

        <Section title="② ご相談内容">
          <Field label="ご相談内容">
            <select name="consultation" value={form.consultation} onChange={handleChange} style={inputStyle}>
              <option value="">選択してください</option>
              <option value="体重減少相談">体重減少相談</option>
              <option value="GLP-1治療相談">GLP-1治療相談</option>
              <option value="糖尿病相談">糖尿病相談</option>
              <option value="その他">その他</option>
            </select>
          </Field>
        </Section>

        <Section title="③ 現在の健康状態">
          <Field label="現在の病気・経過・症状など">
            <textarea
              name="healthStatus"
              value={form.healthStatus}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: 96, resize: "vertical" }}
              placeholder="例: 体重増加傾向"
            />
          </Field>
        </Section>

        <Section title="④ 保険証のアップロード">
          <Field label="ファイルを選択">
            <input type="file" name="insuranceFile" onChange={handleChange} style={inputStyle} />
          </Field>

          <label style={checkStyle}>
            <input type="checkbox" name="agreeInsurance" checked={form.agreeInsurance} onChange={handleChange} />
            保険証は本人のものです
          </label>
        </Section>

        <Section title="⑤ 緊急連絡先">
          <Field label="緊急連絡先の氏名">
            <input name="emergencyName" value={form.emergencyName} onChange={handleChange} style={inputStyle} placeholder="例: 伊勢たえ子" />
          </Field>

          <Field label="緊急連絡先の電話番号">
            <input name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} style={inputStyle} placeholder="例: 0901234567" />
          </Field>
        </Section>

        <Section title="⑥ その他">
          <Field label="自由記述">
            <textarea
              name="other"
              value={form.other}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: 96, resize: "vertical" }}
              placeholder="自由記述"
            />
          </Field>
        </Section>

        <Section title="⑦ 同意事項">
          <label style={checkStyle}>
            <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} />
            利用規約に同意します
          </label>

          <label style={checkStyle}>
            <input type="checkbox" name="agreePrivacy" checked={form.agreePrivacy} onChange={handleChange} />
            個人情報の取り扱いに同意します
          </label>
        </Section>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "none",
            borderRadius: 10,
            background: "#000",
            color: "#fff",
            fontWeight: 700,
            marginTop: 16,
            cursor: "pointer",
          }}
        >
          問診を送信する
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{title}</h2>
      <div style={{ display: "grid", gap: 12 }}>{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  border: "1px solid #ddd",
  borderRadius: 10,
  fontSize: 15,
  background: "#fff",
};

const checkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  marginTop: 8,
};
