import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

// 環境変数
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

