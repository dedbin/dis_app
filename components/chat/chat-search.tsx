"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useParams, useRouter } from "next/navigation";

interface ChatSearchProps {
    data: {
      label: string;
      type: "message",
      data: {
        icon: React.ReactNode;
        name: string;
        id: string;
      }[] | undefined
    }[]
  }
export const ChatSearch = ({}) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
  
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "m" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      }
  
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down)
    }, []);
  
    const onClick = ({ id, type }: { id: string, type: "message"}) => {
        setOpen(false);

        //todo redirect to message
      }
    return (
        <>
          <button
            onClick={() => setOpen(true)}
            className="group flex w-full transition items-center hover:bg-zinc-700/10 rounded-md border border-none gap-x-2 px-2 py-2 text-sm text-primary dark:hover:bg-zinc-700/50 dark:text-primary"
          >
            <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
            <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600dark:group-hover:text-zinc-300 transition ">
                search for a message 
            </p>
            <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
            >
                <span className="text-xs">ctrl</span>M
            </kbd>
          </button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="search all messages"/>
              <CommandList>
                <CommandEmpty>
                    not implimented
                </CommandEmpty>
                    <span className="text-red-400 flex items-center justify-center"> not implimented yet</span>
                  </CommandList>
                </CommandDialog>
              </>
            )
}