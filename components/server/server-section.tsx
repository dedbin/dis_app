"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType?: 'channels' | 'members';
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles
}

export const ServerSection = ({label, role, sectionType, channelType, server}: ServerSectionProps) => {

    const {onOpen} = useModal();
    
    return (
        <div className="flex py-2 items-center justify-between">
            <p className="text-xs font-semibold text-transform: lowercase text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === 'channels' && (
               <ActionTooltip label="Add Channel" side='top'>
                    <button 
                    className="group flex items-center text-zinc-500 hover:text-zinc-300" 
                    onClick={() => onOpen("createChannel", {channelType})}
                    >
                        <Plus className="h-5 w-5"/>
                    </button>
               </ActionTooltip> 
            )}
            {role === MemberRole.ADMIN && sectionType === 'members' && (
                <ActionTooltip label="manage members" side='top'>
                <button className="group flex items-center text-zinc-500 hover:text-zinc-300" onClick={() => onOpen("members", {server})}>
                    <Settings className="h-5 w-5"/>
                </button>
           </ActionTooltip> 
            )}
        </div>
    )
}