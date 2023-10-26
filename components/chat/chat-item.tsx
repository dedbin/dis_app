"use client";

import { Member, Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";
import CustomVideoPlayer from "./chat-video";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Form, FormControl, FormItem, FormField} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";

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
};

const formSchema = z.object({
    content: z.string().min(1)
});
//TODO: extract actual file name
function extractFileName(url: string): string {
    const path = url.split('/').pop();
    if (path) {
      return path.split('?')[0];
    }
    return '';
  };

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
    const [isEditing, setIsEditing] = useState(false);
    const {onOpen} = useModal();

    const fileType = fileUrl?.split(".").pop();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content
        }
    });

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape" || e.key === "Esc") {
                setIsEditing(false);
            }
        };
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        }
    }, []);

    useEffect(() => {
        form.setValue('content', content);
    }, [content]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            });
            await axios.patch(url, values);
            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

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
                
                    {isImage  &&  (
                        <a 
                        href={fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-45 w-45">
                            <Image src={fileUrl} alt={content} fill className="object-cover" />
                        </a>
                        
                    )}
                    { isVideo &&  (
                        <a 
                        href={fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative aspect-video rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-45 w-45">
                            <CustomVideoPlayer src={fileUrl} controls autoPlay className="rounded-md mt-2 h-45 w-45" />
                        </a>
                    )}
                    {isPdf && (
                         <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-7 w-7 fill-emerald-200 stroke-emerald-400" />
                            <a 
                            href={fileUrl}
                             download target="_blank" 
                             rel="noopener noreferrer" 
                             className="ml-2 text-sm text-emerald-500 dark:text-emerald-400 hover:underline">
                                <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded">
                                    download {fileType}
                                </button>
                                <p className="ml-2">{extractFileName(fileUrl)}</p>
                            </a>
                            
                        </div>
                    )}
                    <div className="text-sm font-semibold text-zinc-200">
                    {!fileUrl && !isEditing && (
                        <p className={cn("text-sm text-zinc-600 dark:text-zinc-300",deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1")}>
                            {content}
                            {isUpdate && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                (edited)
                                </span>
                            )}
                        </p>
                        )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form 
                                className="flex items-center gap-x-2 w-full"
                                onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField 
                                        control={form.control}
                                        name="content"
                                        render={({field}) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <div className="relative w-full">
                                                        <Input
                                                            disabled={isLoading}
                                                            className="bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                                            placeholder="Edit message"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" size='sm' disabled={isLoading} variant='primary'>
                                        save
                                    </Button>
                                    
                            </form>
                            <span className="text-xs mt-1 text-zinc-400">
                                        press escape to cancel, press enter to submit
                            </span>
                        </Form>
                    )}
                </div>
            </div>
        </div>
            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 top-2 right-5 bg-white border rounded-sm dark:bg-zinc-700">
                    {canEditMessage && (
                        <ActionTooltip label="edit">
                            <Edit 
                              className="h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 cursor-pointer ml-auto"
                              onClick={() => setIsEditing(true)}
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="delete">
                            <Trash2 onClick={() => onOpen('deleteMessage', {
                                apiUrl:`${socketUrl}/${id}`,
                                query: socketQuery
                            })} className="h-4 w-4 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer ml-auto " />
                        </ActionTooltip>
                </div>
            )}
        </div>
    );
}