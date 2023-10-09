"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, SettingsIcon, Trash, UserPlus, UsersIcon } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
};

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
    const {onOpen} = useModal();
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button
                className="w-full text-md font-semibold px-3 flex items-center h-12
                 border-neutral-200 dark:border-neutral-800 border-b-2
                 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    {server.name}
                    <ChevronDown className="ml-auto h-5 w-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-mono text-black dark:text-neutral-400 spase-y-[2px]"
            >
                {isModerator && (
                    <DropdownMenuItem
                    onClick={() => onOpen("invite",{server})}
                    className="text-emerald-600 dark:text-emerald-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        invite people
                        <UserPlus className="ml-auto h-5 w-5" />
                    </DropdownMenuItem>
                )}

                {isAdmin && (
                    <DropdownMenuItem
                    onClick={() => onOpen("editServer",{server})}
                    className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        server settings
                        <SettingsIcon className="ml-auto h-5 w-5" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    onClick={() => onOpen("members",{server})}
                    className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        manage members
                        <UsersIcon className="ml-auto h-5 w-5" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                    onClick={() => onOpen("createChannel")}
                    className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        create channel
                        <PlusCircle className="ml-auto h-5 w-5" />
                    </DropdownMenuItem>
                )}

                {isModerator && (
                    <DropdownMenuSeparator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    className=" px-3 py-2 text-sm cursor-pointer text-red-500"
                    >
                        delete server
                        <Trash className="ml-auto h-5 w-5" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                    className=" px-3 py-2 text-sm cursor-pointer text-red-500"
                    >
                        leave server
                        <LogOut className="ml-auto h-5 w-5" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}