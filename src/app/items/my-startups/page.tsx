import { ItemCard } from "@/app/item-card";
import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function my_startup() {
    const session = await auth()
    if(!session||!session.user) {
        return <div className="min-h-screen flex items-center justify-center gap-3">
          <p className="text-2xl font-semibold ">
            You need to sign in to view this page
          </p>
            
              <SignIn />
        </div>
    }
    
        
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!)
  })

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">My startups</h1>
      {allItems.length === 0 ?(
          
          <><p className="text-2xl font-semibold">You dont have startups,create one </p><Link
          href="/items/create"
          className="hover:underline flex items-center gap-1"
        >
          create startup
        </Link></>


  
      ):(
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
        
      </div>)}
    </main>
  );
}
