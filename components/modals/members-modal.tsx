"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";


const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="ml-2 h-5 w-5" />,
  "ADMIN": <ShieldAlert className="ml-2 h-5 w-5 text-rose-600" />,
}

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const isModalOpen = isOpen && type === "members";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            manage members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
          <ScrollArea className="mt-8 max-h-[420px] pr-6">
            {server?.members?.map((member) => (
              <div key={member.id} className="flex items-center gap-x-2 mb-6">
                <UserAvatar src={member.profile?.imageUrl}/>
                  <div className="flex flex-col gap-y-1">
                    <div className="text-s font-mono flex items-center">
                      {member.profile?.name}
                      {roleIconMap[member.role]}
                      </div>
                      <p className="text-s font-mono">
                        {member.profile.email}
                      </p>
                  </div>
              </div>))}
          </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}