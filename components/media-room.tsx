"use client";

import { useEffect, useState } from "react";
import { ControlBar, LiveKitRoom, RoomAudioRenderer, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

export const MediaRoom = ({
    chatId, video, audio
}: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return;

        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try{
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data = await resp.json();
                setToken(data.token);
            }catch(e){
                console.log(e);
            }
        })();
    }, [user?.firstName, user?.lastName, chatId])

    if (token === ''){
        return(
            <div className="flex justify-center items-center flex-col flex-1">
                <Loader2 className="w-10 h-10 animate-spin text-zinc-500 my-6" />
                <p className="text-zinc-500 text-sm dark:text-zinc-400">
                    loading...
                </p>
            </div>
        );
    }

    return(
        <LiveKitRoom
        video={video}
        audio={audio}
        token={token}
        connectOptions={{ autoSubscribe: false }}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: '100dvh' }}
        >
            <VideoConference/>
            <RoomAudioRenderer />
        </LiveKitRoom>
    );
}