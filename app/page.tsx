'use client';

import { useState } from 'react';

type FormState = {
  name: string;
  birthday: string;
  height: string;
  weight: string;
  consultation: string;
  healthStatus: string;
  other: string;
  phone: string;
  email: string;
  emergencyName: string;
  emergencyPhone: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeInsurance: boolean;
};

export default function Home() {
  const [form, setForm] = useState<FormState>({
    name: '',
    birthday: '',
    height: '',
    weight: '',
    consultation: '体重減少相談',
    healthStatus: '',
    other: '',
    phone: '',
    email: '',
    emergencyName: '',
    emergencyPhone: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeInsurance: false,
  });

  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    setForm((prev) => ({
      ...prev,
      [target.name]:
        target instanceof HTMLInputElement && target.type === 'checkbox'
          ? target.checked
          : target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsuranceFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.birthday || !form.phone || !form.email) {
      alert('氏名・生年月日・電話番号・メールアドレスは必須です。');
      return;
    }

    if (!form.agreeTerms || !form.agreePrivacy) {
      alert('利用規約・個人情報の取り扱いへの同意が必要です。');
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('name', form.name);
      payload.append('birthday', form.birthday);
      payload.append('height', form.height);
      payload.append('weight', form.weight);
      payload.append('consultation', form.consultation);
      payload.append('healthStatus', form.healthStatus);
      payload.append('other', form.other);
      payload.append('phone', form.phone);
      payload.append('email', form.email);
      payload.append('emergencyName', form.emergencyName);
      payload.append('emergencyPhone', form.emergencyPhone);
      payload.append('agreeTerms', String(form.agreeTerms));
      payload.append('agreePrivacy', String(form.agreePrivacy));
      payload.append('agreeInsurance', String(form.agreeInsurance));

      if (insuranceFile) {
        payload.append('insuranceFile', insuranceFile);
      }

      const res = await fetch('/api/intake', {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) {
        throw new Error('送信失敗');
      }

      alert('問診票を送信しました。');
      window.location.href = '/thanks';
    } catch {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
          オンライン診療 事前問診
        </h1>

        <p style={{ marginBottom: '30px', color: '#555' }}>
          診療をスムーズに行うため、事前にご入力ください（3〜5分）
        </p>

        <h2 style={{ marginTop: '20px' }}>① 基本情報</h2>

        <input name="name" value={form.name} onChange={handleChange} placeholder="お名前" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />
        <input name="birthday" value={form.birthday} onChange={handleChange} placeholder="生年月日" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />
        <input name="height" value={form.height} onChange={handleChange} placeholder="身長(cm)" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />
        <input name="weight" value={form.weight} onChange={handleChange} placeholder="体重(kg)" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="電話番号" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="メールアドレス" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />

        <h2 style={{ marginTop: '30px' }}>② ご相談内容</h2>

        <select name="consultation" value={form.consultation} onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
          <option>体重減少相談</option>
          <option>GLP-1治療相談</option>
          <option>糖尿病相談</option>
          <option>マンジャロ継続希望</option>
          <option>その他</option>
        </select>

        <h2 style={{ marginTop: '30px' }}>③ 現在の健康状態</h2>

        <textarea
          name="healthStatus"
          value={form.healthStatus}
          onChange={handleChange}
          placeholder="現在の病気・服薬・症状など"
          style={{ width: '100%', height: '120px', padding: '10px', marginTop: '10px' }}
        />

        <h2 style={{ marginTop: '30px' }}>④ 保険証のアップロード</h2>

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          style={{ width: '100%', marginTop: '10px' }}
        />

        <label style={{ display: 'block', marginTop: '10px' }}>
          <input
            type="checkbox"
            name="agreeInsurance"
            checked={form.agreeInsurance}
            onChange={handleChange}
            style={{ marginRight: '8px' }}
          />
          保険証は本人のものです
        </label>

        <h2 style={{ marginTop: '30px' }}>⑤ 緊急連絡先</h2>

        <input name="emergencyName" value={form.emergencyName} onChange={handleChange} placeholder="緊急連絡先の氏名" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />
        <input name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} placeholder="緊急連絡先の電話番号" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />

        <h2 style={{ marginTop: '30px' }}>⑥ その他</h2>

        <textarea
          name="other"
          value={form.other}
          onChange={handleChange}
          placeholder="自由記述"
          style={{ width: '100%', height: '120px', padding: '10px', marginTop: '10px' }}
        />

        <h2 style={{ marginTop: '30px' }}>⑦ 同意事項</h2>

        <label style={{ display: 'block', marginTop: '10px' }}>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={form.agreeTerms}
            onChange={handleChange}
            style={{ marginRight: '8px' }}
          />
          利用規約に同意します
        </label>

        <label style={{ display: 'block', marginTop: '10px' }}>
          <input
            type="checkbox"
            name="agreePrivacy"
            checked={form.agreePrivacy}
            onChange={handleChange}
            style={{ marginRight: '8px' }}
          />
          個人情報の取り扱いに同意します
        </label>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            width: '100%',
            marginTop: '30px',
            padding: '15px',
            background: submitting ? '#666' : 'black',
            color: 'white',
            borderRadius: '10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {submitting ? '送信中...' : '問診を送信する'}
        </button>
      </div>
    </div>
  );
}
