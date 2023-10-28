import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (req.method !== 'POST') {return res.status(405).json({error: 'method not allowed'});}

    try{
        const profile = await currentProfilePages(req);
        const {content, fileUrl} = req.body;
        const {conversationId} = req.query;

        if (!profile) {return res.status(401).json({error: 'unauthorized'});}
        if (!conversationId) {return res.status(400).json({error: 'conversation id not found'});}
        if (!content) {return res.status(400).json({error: 'content not found'});}
        
        const conversation = await db.conversation.findFirst({
            where:{
                id: conversationId as string,
                OR: [{FirstMember: {profileId: profile.id}}, {SecondMember: {profileId: profile.id}}]
            },
            include: {
                FirstMember:{
                    include:{
                        profile: true
                    }
                },
                
                SecondMember:{
                    include:{
                        profile: true
                    }
                }
            }
        });

        if (!conversation) {return res.status(404).json({error: 'conversation not found'});}

        const member = conversation.FirstMember.profileId === profile.id ? conversation.FirstMember : conversation.SecondMember;

        if (!member) {return res.status(404).json({error: 'member not found'});}

        const message = await db.directMessage.create({
            data: {
                content,
                fileUrl,
                conversationId: conversation.id,
                memberId: member.id
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        }); 

        const channelKey = `chat:${conversationId}:messages`;
        
        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json(message);
    }catch(error){
        console.error('[DIRECT_MESSAGES_POST_ERROR]' + error);
        return res.status(500).json({error: 'internal server error'});
    }
}