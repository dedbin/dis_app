import { db } from "./db";
export const getOrCreateConversation = async (FirstMemberId: string, SecondMemberId: string) => {
    let conversation = await getConversation(FirstMemberId, SecondMemberId) || await getConversation(SecondMemberId, FirstMemberId);
    
    if(!conversation){conversation = await createConversation(FirstMemberId, SecondMemberId);}
    
    return conversation;
}

const getConversation = async (FirstMemberId: string, SecondMemberId: string) => {
    try{
        return await db.conversation.findFirst({
            where: {
                AND: [
                    {FirstMemberId: FirstMemberId},
                    {SecondMemberId: SecondMemberId}
                ]},
            include: {
                FirstMember:{
                    include: {
                        profile: true
                    }
                },
                SecondMember:{
                    include: {
                        profile: true
                    }
                }
            }
        });
    }catch{
        return null;
    }
}

const createConversation = async (FirstMemberId: string, SecondMemberId: string) => {
    try{
        return await db.conversation.create({
            data: {
                FirstMemberId: FirstMemberId,
                SecondMemberId: SecondMemberId
            },
            include: {
                FirstMember:{
                    include: {
                        profile: true
                    }
                },
                SecondMember:{
                    include: {
                        profile: true
                    }
                }
            }
        });
    }catch{
        return null;
    }
}