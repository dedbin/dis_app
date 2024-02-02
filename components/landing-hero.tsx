"use client";
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypeWriterComponent from 'typewriter-effect'
import { Button } from "./ui/button";

export const LandingHero = () => {
    const isSignedIn =true;
    return(
        <div className="text-white font-bold py-36 text-center space-y-5">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>Лучшая <span className="text-emerald-500">соцсеть</span> для общения с</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 py-4">
              <TypeWriterComponent 
                options={{
                    strings: [
                        "друзьями.",
                        "близкими.",
                        "любимыми.",
                        "тимейтами.",
                        "коллегами.",
                        "учителями.",

                    ],
                    autoStart: true,
                    loop: true
                }}
              />
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
              Общайтесь ближе, больше, комфортнее
            </div>
            <div>
              <Link href={"/servers"}>
                <Button variant={"default"} size={"lg"} className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                    Общайтесь
                </Button>
              </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
              Абсолютно бесплатно для всех
            </div>
          </div>    
        </div>
    )
}