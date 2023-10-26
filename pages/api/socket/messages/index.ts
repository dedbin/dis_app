import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

//TODO: разобраться с ошибкой Property 'status' does not exist on type 'NextApiResponseServerIo'

export default async (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (req.method !== 'POST') {return res.status(405).json({error: 'method not allowed'});}

    try{
        const profile = await currentProfilePages(req);
        const {content, fileUrl} = req.body;
        const {serverId, channelId} = req.query;

        if (!profile) {return res.status(401).json({error: 'unauthorized'});}
        if (!serverId) {return res.status(400).json({error: 'server id not found'});}
        if (!channelId) {return res.status(400).json({error: 'channel id not found'});}
        if (!content) {return res.status(400).json({error: 'content not found'});}
        
        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            }, 
            include: {
                members: true
            }
        });

        if (!server) {return res.status(404).json({error: 'server not found'});}

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string,
            }
        });

        if (!channel) {return res.status(404).json({error: 'channel not found'});}

        const member = await server.members.find((member) => member.profileId === profile.id);

        if (!member) {return res.status(404).json({error: 'member not found'});}

        const message = await db.message.create({
            data: {
                content,
                fileUrl,
                channelId: channel.id,
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

        const channelKey = `chat:${channel.id}:messages`;
        
        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json(message);
    }catch(error){
        console.error('[MESSAGES_POST_ERROR]' + error);
        return res.status(500).json({error: 'internal server error'});
    }
}