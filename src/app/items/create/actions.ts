"use server";

import { revalidatePath } from "next/cache";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSignedUrlForS3Object } from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function createItemAction({
  fileName,
  name,
  startingPrice,
  equity,
companyval,
description,  
filepdf,
bidInterval,
endDate,
  

}: {
  fileName: string;
  name: string;
  startingPrice: number;
  equity:number;
  companyval:string;
  description:string;
  filepdf:string;
  bidInterval:number;
  endDate: Date
  

}) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  await database.insert(items).values({
    name,
    startingPrice,
    filekey: fileName,
    userId: user.id,
    equity,
    description,
    companyval,
    filepdf,
    bidInterval,
    endDate,
    

  });

  redirect("/dashboard");
}
