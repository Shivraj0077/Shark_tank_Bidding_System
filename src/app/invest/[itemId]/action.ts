"use server";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export async function createBidAction (itemId:number) {
    const session =  await auth();
    if(!session||!session.user||!session.user.id){
        throw new Error("must be logged in to create a bid")
   

}
const item = await database.query.items.findFirst({
   where:eq(items.id,itemId)})


if(!item){
    throw new Error("item does not exist")
}
const latestBidvalue=item.currentBid+item.bidInterval

await database.insert(bids).values({
    amount: latestBidvalue,
    itemId,
    userId:session.user.id
})
await database.update(items).set({
    currentBid:latestBidvalue,
})
.where(eq(items.id,itemId))
revalidatePath(`/invest/${itemId}`)
}
