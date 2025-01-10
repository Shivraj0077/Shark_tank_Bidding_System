
import { Building2, DollarSign, PieChart, Clock, FileDown, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { database } from "@/db/database";
import { items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getImageUrl } from '@/util/files';
import Link from 'next/link';



export default async function ItemPage({
  params,
}: {
  params: { itemId: string };
}) {


  const { itemId } = await params;
  const item = await database.query.items.findFirst({where: eq(items.id,parseInt(itemId))});


  if(!item){
    return <div> no startup found</div>
}
console.log(getImageUrl(item.filepdf))

  function getpdfUrl(filekey: string): string | undefined {
    throw new Error('Function not implemented.');
  }

  return (
  
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="h-screen relative flex items-center">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(item.filekey)}
            alt="Modern Architecture"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative max-w-[1920px] mx-auto px-8 w-full">
          <h1 className="text-7xl font-bold text-white mb-6 max-w-3xl">
            {item.name}
          </h1>
          <p className="text-2xl text-gray-200 max-w-2xl mb-8">
            Start your investment journey today
          </p>
          <Button
  variant="outline"
  size="lg"
  className=" text-white border-red-950 hover:bg-white bg-red-950 hover:text-black transition-all p-8 text-lg flex items-center justify-center "
>
  <Link href={`/invest/${item.id}`} className="flex items-center space-x-2">
  <span>Invest</span>
    <ArrowRight className="h-5 w-5" />
    
  </Link>
</Button>

         
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-[1920px] mx-auto px-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 -mt-32 relative z-10 mb-24">
          <Card className="p-8 bg-white dark:bg-zinc-900 border-0">
            <DollarSign className="w-12 h-12 mb-4 text-black dark:text-white" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Investment Required</p>
            <h3 className="text-3xl font-bold">{item.startingPrice}</h3>
          </Card>

          <Card className="p-8 bg-white dark:bg-zinc-900 border-0">
            <PieChart className="w-12 h-12 mb-4 text-black dark:text-white" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Equity Offered</p>
            <h3 className="text-3xl font-bold">{item.equity}%</h3>
          </Card>

          <Card className="p-8 bg-white dark:bg-zinc-900 border-0">
            <Clock className="w-12 h-12 mb-4 text-black dark:text-white" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Investment Interval</p>
            <h3 className="text-3xl font-bold">6 Months</h3>
          </Card>

          <Card className="p-8 bg-white dark:bg-zinc-900 border-0">
            <Building2 className="w-12 h-12 mb-4 text-black dark:text-white" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Company Valuation</p>
            <h3 className="text-3xl font-bold">{item.companyval}</h3>
          </Card>
        </div>

        {/* Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          <div>
            <h2 className="text-4xl font-bold mb-8">About TechVision AI</h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
          
              <p>
                {item.description}
              </p>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-zinc-900 p-12">
            <h3 className="text-2xl font-bold mb-6">Market Traction</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
            This PDF contains comprehensive information about the startup, covering all key aspects in detail. It provides insights into the company's mission, vision, goals, and operational strategies. You will find valuable details to understand the startup's purpose, progress, and future plans.
            </p>
            <a
      href={getImageUrl(item.filepdf)}// Replace with your full URL
      target="_blank" // Optional: Opens the link in a new tab
      rel="noopener noreferrer" // For security when using target="_blank"
      className="w-full bg-black text-white   dark:bg-white dark:text-black dark:hover:bg-gray-200 p-2 rounded-lg block text-center"
    >
      <Button size="lg" className='bg-black'>
        <FileDown className="mr-2 h-5 w-5" />
        View PDF
      </Button>
    </a>
          </div>
        </div>
      </div>
    </div>
  );
}

