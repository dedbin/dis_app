"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({ subsets: ["latin"] });

export const LandingNavbar = () => {


    return (
        <nav className="p-4 bg-transparent flex items-center justify-between ">
          <Link href='/' className='flex items-center'>
            <div className="relative h-10 w-10 mr-4">
              <Image
                src="/logo.png"
                alt="logo"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-contain"
              />
            </div>
            <h1 className={cn(font.className, "text-2xl font-bold text-white")}>
                dis-app
            </h1>
          </Link>
          <div className="flex items-center gap-x-2">
            <Link href={`/servers`}>
                <Button className="rounded-full">
                    Начнем?
                </Button>
            </Link>
          </div>
        </nav>
    )
}