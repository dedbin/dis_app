"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
    data: {
      label: string;
      type: "channel" | "member",
      data: {
        icon: React.ReactNode;
        name: string;
        id: string;
      }[] | undefined
    }[]
  }
export const ServerSearch = ({
    data
  }: ServerSearchProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
  
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      }
  
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down)
    }, []);
  
    const onClick = ({ id, type }: { id: string, type: "channel" | "member"}) => {
        setOpen(false);
    
        if (type === "member") {return router.push(`/servers/${params?.serverId}/conversations/${id}`)}
        if (type === "channel") {return router.push(`/servers/${params?.serverId}/channels/${id}`)}
      }
    return (
        <>
          <button
            onClick={() => setOpen(true)}
            className="group flex w-full transition items-center hover:bg-zinc-700/10 rounded-md border border-primaru gap-x-2 px-2 py-2 text-sm text-primaru dark:hover:bg-zinc-700/50 dark:text-primaru"
          >
            <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
            <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600dark:group-hover:text-zinc-300 transition ">
              Search
            </p>
            <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
            >
                <span className="text-xs">ctrl</span>K
            </kbd>
          </button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="search all channels or members"/>
              <CommandList>
                <CommandEmpty>
                    no results found.
                </CommandEmpty>
                {data.map(({label, type, data}) =>{
                    if (!data?.length) return null;
                    
                    return (
                        <CommandGroup key={label} heading={label}>
                            {data?.map(({ id, icon, name }) => {
                              return (
                                <CommandItem key={id} onSelect={() => onClick({id, type})}>
                                  {icon}
                                  <span>{name}</span>
                                </CommandItem>
                              )
                            })}
                        </CommandGroup>
                      )
                    })}
                  </CommandList>
                </CommandDialog>
              </>
            )
}