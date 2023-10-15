import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search,";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
    serverId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2"/>,
    [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2"/>,
    [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2"/>,
};

const roleiconMap = {
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500"/>,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-[#10b981]"/>,
    [MemberRole.GUEST]: null,
}
export const SeverSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                  profile: true, 
                },
                orderBy: {
                    role: "asc",
                }

            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#252629] bg=[#F2F3F5]">
            <ServerHeader 
            server={server}
            role ={role} />
            <ScrollArea className="flex-1 px-3">
               <div className="mt-3">
                <ServerSearch 
                  data={[
                    {
                      label:'Text Channels',
                      type: 'channel',
                      data: textChannels?.map((channel) => ({
                         id: channel.id,
                         name: channel.name,
                         icon: iconMap[channel.type], 
                      }))
                    },
                    {
                      label:'Audio Channels',
                      type: 'channel',
                      data: audioChannels?.map((channel) => ({
                         id: channel.id,
                         name: channel.name,
                         icon: iconMap[channel.type], 
                      }))
                    },
                    {
                      label:'Video Channels',
                      type: 'channel',
                      data: videoChannels?.map((channel) => ({
                         id: channel.id,
                         name: channel.name,
                         icon: iconMap[channel.type], 
                      }))
                    },
                    {
                      label:'Members',
                      type: 'member',
                      data: members?.map((member) => ({
                         id: member.id,
                         name: member.profile.name,
                         icon: roleiconMap[member.role], 
                      }))
                    }
                ]}
            />
        </div> 
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-13 mx-auto my-2"/>
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
                    </div>
                </div>
                )}
            {!!audioChannels?.length && (
            <div className="mb-2">
                <ServerSection
                sectionType="channels"
                channelType={ChannelType.AUDIO}
                role={role}
                label="audio channels"
                />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="video channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember
                  key={member.id}
                  member={member}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
            </ScrollArea>
        </div>
    );
}