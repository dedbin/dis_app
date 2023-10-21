import { Server, Member, Profile, Message } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiRequest } from "next";
import { Server as IOServer } from "socket.io";
/**
 * Represents a server with its members and their profiles.
 * It extends the 'Server' type and includes an array of 'Member' objects with their associated 'Profile'.
 */
export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo= NextApiRequest & {
    socket: Socket & {
        server: NetServer & {
            io: IOServer;
        };
    }
};

export type MessageWithMemberWithProfile = Message & {member: Member & { profile: Profile };}
