import { env } from "@/env";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize the S3 client for Cloudflare R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

// Function to get signed URL for uploading a file to Cloudflare R2
export async function getSignedUrlForS3Object(key: string, fileType: string) {
  // Determine the correct MIME type based on file extension
  let contentType: string;

  // Check if the file is a PDF
  if (fileType === "pdf") {
    contentType = "application/pdf";
  } else if (fileType === "image/jpeg") {
    contentType = "image/jpeg";
  } else if (fileType === "image/png") {
    contentType = "image/png";
  } else if (fileType === "image/jpg") {
    contentType = "image/jpg";
  } else {
    // Fallback for other file types, e.g., handle additional image types, etc.
    contentType = "application/octet-stream";  // Default for other files
  }

  // Get the signed URL for uploading the file
  return await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: key,
      ContentType: contentType,  // Use dynamically determined MIME type
    }),
    { expiresIn: 3600 }  // URL expiration time (1 hour)
  );
}
