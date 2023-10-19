import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        serverId: string;
        memberId: string;
    }
}

const MemberIdPage = async ({params}: MemberIdPageProps) => {
    const profile = await currentProfile();
    if (!profile) {return redirectToSignIn();}
    
    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        },
        include: {
            profile: true
        }
    });
    if (!currentMember) {return redirect("/");}

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);
    if (!conversation) {return redirect(`/server/${params.serverId}`);}

    const {FirstMember, SecondMember} = conversation;
    const otherMember = FirstMember.id === currentMember.id ? SecondMember : FirstMember;
    return ( 
    <div className="bg-white dark:bg-[#0a0a0a] flex flex-col h-full">
        <ChatHeader
            imageUrl={otherMember.profile.imageUrl}
            name={otherMember.profile.name}
            type="conversation"
            serverId={params.serverId}
        />
    </div> );
}
 
export default MemberIdPage;