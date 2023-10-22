"use client";

import { Member, Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & { profile: Profile };
    time:string;
    fileUrl: string | null;
    deleted: boolean;
    isUpdate: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
    currentMember: Member;

};

const roleIconMap = {
    "GUEST": null,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-[#10b981]"/>,
}
//TODO: extract actual file name
function extractFileName(url: string): string {
    const path = url.split('/').pop();
    if (path) {
      return path.split('?')[0];
    }
    return '';
  }

export const ChatItem = ({
    id,
    content,
    member,
    time,
    fileUrl,
    deleted,
    isUpdate,
    socketUrl,
    socketQuery,
    currentMember
}: ChatItemProps) => {
    const fileType = fileUrl?.split(".").pop();
    const isAdmin = currentMember.role === "ADMIN";
    const isModerator = currentMember.role === "MODERATOR";
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted &&  isOwner && !fileUrl;
    const isPdf = fileType === "pdf" && fileUrl;
    const isVideo = fileType === "mp4" && fileUrl;
    const isImage = (fileType === "png" || fileType === "jpg" || fileType === "jpeg") && fileUrl;



    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl}/>
                </div>
                <div className="flex flex-col w-full hover:bg-zinc-700/10">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="text-sm font-semibold hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                    {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{time}</span>
                    </div>
                    <div className="text-sm font-semibold text-zinc-200">
                    {!isImage && !isVideo && !isPdf && (
                        <p>{content}</p>
                    )}
                    </div>
                    {isImage  &&  (
                        <img src={fileUrl} alt="Message Image" className="rounded-md mt-2 h-40 w-40" />
                    )}
                    { isVideo &&  (
                        <video src={fileUrl} controls className="rounded-md mt-2 h-40 w-40" />

                    )}
                    {isPdf && (
                         <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-7 w-7 fill-emerald-200 stroke-emerald-400" />
                            <a href={fileUrl} download target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-emerald-500 dark:text-emerald-400 hover:underline">
                                <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded">
                                    Скачать PDF
                                </button>
                            </a>
                            <p className="ml-2">{extractFileName(fileUrl)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}