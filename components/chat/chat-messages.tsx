"use client";

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Fragment, ElementRef, useRef } from "react";
import { Loader2, ServerCrash } from "lucide-react";
import { MessageWithMemberWithProfile } from "@/types";
import { ChatItem } from "./chat-item";
import {format} from "date-fns";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

interface ChatMessagesProps {
    name: string;
    member: Member;
    type: 'channel' | 'conversation';
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: 'conversationId' | 'channelId';
    paramValue: string;
}

export const ChatMessages = ({
    name,
    member,
    type,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;

    const chatRef = useRef<ElementRef<'div'>>(null);
    const bottomRef = useRef<ElementRef<'div'>>(null);

    const data_format = 'd MMM yyyy HH:mm:ss';
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
      });
      useChatSocket({queryKey, addKey, updateKey});
      useChatScroll({
        chatRef, 
        bottomRef, 
        loadMoreMessages: fetchNextPage,
        shouldLoadMoreMessages: !isFetchingNextPage && !!hasNextPage,
        cnt: data?.pages?.[0]?.items?.length ?? 0
    });


      if (status === 'pending') {
        return <div className="flex flex-col flex-1 justify-center items-center">
            <Loader2 className="animate-spin h-8 w-8 text-zinc-500 my-4"/>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">loading messages...</p>
            </div>;
      }

      if (status === 'error') {
        return <div className="flex flex-col flex-1 justify-center items-center">
            <ServerCrash className=" h-8 w-8 text-zinc-500 my-4"/>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">fcup server is down</p>
            </div>;
      }

      return (
        <div ref={chatRef} className="flex flex-col flex-1 py-4 overflow-y-auto">
          {!hasNextPage &&<div className="flex-1"/>}
          {!hasNextPage &&<ChatWelcome
                name={name}
                type={type}
            />}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="animate-spin h-8 w-8 text-zinc-500 my-4"/>
                    ): (
                        <button 
                            onClick={() => fetchNextPage()} 
                            className="text-sm transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-500">
                                load more
                            </button>
                    )}
                </div>
            )}
          <div className="flex flex-col-reverse mt-auto">
            {data?.pages?.map((group, i) => (
                <Fragment key={i}>
                    {group?.items?.map((message: MessageWithMemberWithProfile) => (
                        <ChatItem
                            currentMember={member}
                            key={message.id}
                            id={message.id}
                            content={message.content}
                            member={message.member}
                            time={format(new Date(message.createdAt), data_format)}
                            fileUrl={message.fileUrl}
                            deleted={message.deleted}
                            isUpdate={message.updatedAt !== message.createdAt}
                            socketUrl={socketUrl}
                            socketQuery={socketQuery}
                        />
                    ))}
                </Fragment>
                ))}
            </div>
            <div ref={bottomRef}/>
        </div>
    );
}