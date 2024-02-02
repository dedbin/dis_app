import { SeverSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

/**
 * Renders the layout for a specific server ID.
 * If the server does not exist, redirect to the home page.
 * If the user is not logged in, redirect to the sign in page.
 */
const ServerIdLayout = async ({
    children,
    params
}: {children: React.ReactNode;
    params: {serverId: string};
}) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const serverId = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (!serverId) {
        return redirect("/");
    }
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <SeverSidebar serverId={params.serverId}/>
            </div>
            <main className="md:pl-60 h-full ">
                {children}
            </main>
        </div>
    );
}

export default ServerIdLayout;