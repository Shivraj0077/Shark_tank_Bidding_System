import { Building2, Timer, Users, TrendingUp, ArrowRight, Clock, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from '@/auth';
import { database } from '@/db/database';
import { items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getImageUrl } from '@/util/files';
import { getBidsForItem } from '@/data-access/bids';
import { getItem } from '@/data-access/items';
import { create } from 'node:domain';
import { createBidAction } from './action';

export default async function ItemPage({
    params: { itemId },
  }: {
    params: { itemId: string };
  }) {

    const session = await auth();
    const item = await getItem(parseInt(itemId));
   

   
 
    if(!item){
        return (
            <h1>the item u are searching is invald</h1>
        )
       }

       const allBids = await getBidsForItem(item.id);


       const hasBids = allBids.length > 0;
       console.log(allBids)


  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div className="absolute inset-0">
          <img 
          src={getImageUrl(item.filekey)}
            alt={item.name}
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1920px] mx-auto px-8 w-full">
            <h1 className="text-6xl font-bold text-white mb-4">{item.name}</h1>
            <p className="text-xl text-gray-200 max-w-2xl">{item.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bidding Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 bg-white dark:bg-zinc-900 border-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Bid</p>
                  <p className="text-3xl font-bold"> ₹{item.currentBid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Min Increment</p>
                  <p className="text-3xl font-bold"> ₹{item.bidInterval}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Valuation</p>
                  <p className="text-3xl font-bold"> ₹{item.companyval}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Equity</p>
                  <p className="text-3xl font-bold">{item.equity}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Equity</p>
                  <p className="text-3xl font-bold"> ₹{item.startingPrice}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                 
                </div>
                <form action={createBidAction.bind(null,item.id)}>
                <Button
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 h-12 px-8"
                >
                  invest <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                </form>
              </div>
            </Card>

            {/* Bidding History */}
        
            <Card className="p-8 bg-white dark:bg-zinc-900 border-0">
              <h2 className="text-2xl font-bold mb-6">Bidding History</h2>
              <div className="space-y-4">
                {allBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between py-4 border-b dark:border-zinc-800">
                    <div>
                      <p className="font-semibold">{bid.user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{}</p>
                    </div>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <ChevronUp className="w-4 h-4 mr-1" />
                      {bid.amount}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
            
                {/* <div>
                    no bidding started
                </div>
             */}
        

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="p-8 bg-white dark:bg-zinc-900 border-0">
              <div className="mb-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time Remaining</p>
                <p className="text-3xl font-bold flex items-center">
                  {/* <Clock className="w-6 h-6 mr-2" />
                  {getTimeRemaining(startup.endDate)} */}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Bidders</p>
                <p className="text-3xl font-bold flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  {/* {startup.totalBids} */}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

