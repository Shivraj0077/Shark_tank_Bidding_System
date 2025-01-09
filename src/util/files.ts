import { env } from "@/env";

export function getImageUrl(fileKey: string) {
  return `${env.NEXT_PUBLIC_BUCKET_URL}/${fileKey}`;
}export function getpdfurl(filepdf: string) {
  return `${env.NEXT_PUBLIC_BUCKET_URL}/${filepdf}`;
}
