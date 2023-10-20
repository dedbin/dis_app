import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({params}: ChannelIdPageProps) => {

    const profile = await currentProfile();
    if (!profile) {return redirectToSignIn();}
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        }
    })
    const members = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        },
    })

    if (!members || !channel) {return redirect("/")}
    return ( 
    <div className="flex flex-col h-full">
        <ChatHeader 
            serverId={params.serverId} 
            name={channel.name} 
            type="channel"
        />
        <div className="flex-1">
            future message
        </div>
        <ChatInput
          name={channel.name}
          type="channel"
          apiUrl="/api/socket/messages"
          query={{channelId: channel.id, serverId: channel.serverId}}
        />
    </div> );
}
 
export default ChannelIdPage;