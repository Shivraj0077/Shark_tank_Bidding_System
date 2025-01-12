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

export function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="w-full max-w-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={getImageUrl(item.filekey)}
          alt={item.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary/90 hover:bg-primary">
          Featured
        </Badge>
      </div>

      <CardHeader className="space-y-1 sm:space-y-2 p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
          <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="truncate">{item.name}</span>
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-muted-foreground">
          Start your investment journey
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Investment</p>
              <p className="text-sm sm:text-base font-semibold">₹{(item.startingPrice).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Equity</p>
              <p className="text-sm sm:text-base font-semibold">{item.equity}%</p>
            </div>
          </div>
        </div>
        <p className="text-sm sm:text-base font-semibold mt-3 whitespace-nowrap">
          Ends on: {format(item.endDate, "eeee dd/M/yy")}
        </p>
      </CardContent>

      <CardFooter className="p-4 sm:p-6">
        <Button className="w-full text-sm sm:text-base">
          <Link href={`/items/${item.id}`}>Know More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}