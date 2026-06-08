import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

// 環境変数（Vercel のプロジェクト設定で追加）
const S3_BUCKET = process.env.S3_BUCKET_NAME
const S3_REGION = process.env.S3_REGION
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY
const S3_SECRET_KEY = process.env.S3_SECRET_KEY
const CLINIC_NOTIFY_EMAIL = process.env.CLINIC_NOTIFY_EMAIL
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const s3client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY!,
    secretAccessKey: S3_SECRET_KEY!,
  },
})

async function uploadToS3(file: File, keyPrefix = 'intake/') {
  const buf = Buffer.from(await file.arrayBuffer())
  const key = `${keyPrefix}${Date.now()}-${file.name}`
  await s3client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: buf,
      ContentType: file.type,
    })
  )
  return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${key}`
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const data = Object.fromEntries(formData) as Record<string, any>

    // ファイルは FormData の file キーで送られる想定
    const file = formData.get('insuranceFile') as File | null

    let insuranceUrl = null
    if (file && file.size && S3_BUCKET) {
      insuranceUrl = await uploadToS3(file, `tfclinic/intake/${data.email ?? 'unknown'}/`)
    }

    // ここで DB に入れる、または外部 API に送る処理を行う（例：Xserver API）
    // まずは開発時にはログ出力
    console.log('intake received:', { ...data, insuranceUrl })

    // 例: 院へ通知メール（SendGrid）
    if (SENDGRID_API_KEY && CLINIC_NOTIFY_EMAIL) {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: CLINIC_NOTIFY_EMAIL }] }],
          from: { email: 'no-reply@medon.jp', name: 'medon' },
          subject: `[tfclinic] 新しい問診票が届きました (${data.name ?? '無名'})`,
          content: [
            {
              type: 'text/plain',
              value: `患者名: ${data.name}\nメール: ${data.email}\n内容: ${data.consultation}\n保険証URL: ${insuranceUrl ?? 'なし'}`,
            },
          ],
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
