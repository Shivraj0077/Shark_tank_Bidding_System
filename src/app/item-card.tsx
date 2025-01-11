
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Building2, TrendingUp, Percent, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/util/files";
import Image from "next/image";
import Link from "next/link";
import { Item } from "@/db/schema";
import { format } from "date-fns";

interface ItemCardProps {
  item: {
    id: string;
    name: string;
    filekey: string;
    startingPrice: number;
    equity: number;
   
  };
}

export function ItemCard({ item }: { item:  Item }) {


  return (
    <Card className="w-full max-w-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getImageUrl(item.filekey)}
          alt={item.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-primary/90 hover:bg-primary">
          Featured
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Building2 className="w-6 h-6" />
          {item.name}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Start your investment journey
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Investment</p>
              <p className="font-semibold"> ₹{(item.startingPrice).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Equity</p>
              <p className="font-semibold">{item.equity}%</p>
            </div>
               
           
           
           
          </div>
          <p className="font-semibold ml-3 whitespace-nowrap">
  Ends on: {format(item.endDate, "eeee dd/M/yy")}
</p>

        </div>
      </CardContent>

      <CardFooter>
        
         
      
          <Button className="w-full">
            <Link href={`/items/${item.id}`}>know more</Link>
          </Button>

      </CardFooter>
    </Card>
  );
}
