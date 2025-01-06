import { ItemCard } from "@/app/item-card";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function my_startup() {
    const session = await auth()
    if(!session||!session.user) throw new Error("Unauthorized")
        
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!)
  })

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
