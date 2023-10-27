import { useSocket } from "@/components/providers/socket-provider";
import { Member, MemberRole, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
    queryKey: string;
    addKey: string;
    updateKey: string;    
};

type MessageWithMemberWithProfile = Message & {
    member:Member & {
        profile: Profile;
    }
};

export const useChatSocket = ({queryKey, addKey, updateKey}: ChatSocketProps) => {
    const {socket} = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket){return;}
        
        socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return oldData;
                }
                const newData = oldData.pages.map((page:any) => {
                    return {...page, items:page.items.map((item:MessageWithMemberWithProfile) => {return item.id === message.id ? message : item})}
                });
            
                    return{...oldData, pages: newData}   
                });
            });
        socket.on(addKey, (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {pages: [{items: [message]}]};
                }
                const newData =[...oldData.pages];
                newData[0] = {...newData[0], items: [message, ...newData[0].items ]
                };
                return {...oldData, pages: newData};
            });
        });
        return () => {
            socket.off(updateKey);
            socket.off(addKey);
        }    
    }, [queryClient, addKey,queryKey, socket, updateKey]);
}
