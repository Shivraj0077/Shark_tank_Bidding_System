import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Building2, PlusCircle, Briefcase } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-white border-b border-gray-100 py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 group"
          >
            <Image 
              src="/shark-tank-logo-DFC6B1B261-seeklogo.com.png" 
              width="50" 
              height="50" 
              alt="Logo"
              className="rounded-lg"
            />
            <span className="font-bold text-xl text-gray-800 group-hover:text-gray-600">
              sharktank
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-6">
            <nav className="hidden md:flex items-center gap-4">
              <Link
                href="/items/create"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-black hover:text-gray-900 hover:bg-gray-50"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a startup</span>
              </Link>
              
              <Link
                href="/items/my-startups"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-black hover:text-gray-900 hover:bg-gray-50"
              >
                <Building2 className="w-4 h-4" />
                <span>My Startups</span>
              </Link>
            </nav>

            {session?.user?.name && (
              <div className="hidden md:flex items-center gap-2 text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{session.user.name}</span>
              </div>
            )}

            <MobileNav />
            
            <div>
              {session ? <SignOut /> : <SignIn />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}