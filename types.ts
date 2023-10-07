import { Server, Member, Profile } from "@prisma/client";

/**
 * Represents a server with its members and their profiles.
 * It extends the 'Server' type and includes an array of 'Member' objects with their associated 'Profile'.
 */
export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};
