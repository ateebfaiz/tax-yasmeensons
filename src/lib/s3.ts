import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const TAX_BUCKET = process.env.S3_BUCKET || "assets";
export const TAX_PREFIX = "tax/";

export function getS3() {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  if (!endpoint || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("Neon object storage is not configured.");
  }
  return new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

export function viewPath(key: string) {
  return `/api/documents/view?key=${encodeURIComponent(key)}`;
}

export function assertTaxKey(key: string) {
  if (!key.startsWith(TAX_PREFIX) || key.includes("..") || key.includes("\\")) {
    throw new Error("Invalid document key.");
  }
}

export async function putTaxObject(key: string, body: Buffer, contentType: string) {
  const s3 = getS3();
  await s3.send(
    new PutObjectCommand({
      Bucket: TAX_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function signedGetUrl(key: string, expiresIn = 3600) {
  assertTaxKey(key);
  const s3 = getS3();
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: TAX_BUCKET, Key: key }), { expiresIn });
}
