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
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
 } from "../ui/dropdown-menu";

const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="ml-2 h-5 w-5" />,
  "ADMIN": <ShieldAlert className="ml-2 h-5 w-5 text-rose-600" />,
}

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data as { server: ServerWithMembersWithProfiles };
  const [loadingId, setLoading] = useState('');

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
                  {server.profileId !== member.profileId && loadingId !== member.id && (
                    <div className="ml-auto">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical className="h-5 w-5 text-zinc-600 mr-1" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="left">
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="flex items-center">
                                <ShieldQuestion className="h-5 w-5 mr-2"/>
                                <span>role</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem>
                                    <Shield className="h-5 w-5 mr-2" />
                                    guest
                                    {member.role === "GUEST" && (
                                      <Check className="ml-auto h-5 w-5"/>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <ShieldCheck className="h-5 w-5 mr-2" />
                                    moderator
                                    {member.role === "MODERATOR" && (
                                      <Check className="ml-auto h-5 w-5"/>
                                    )}
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                              <Gavel className="h-5 w-5 mr-2"/>
                              kick
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  )}
                  {loadingId === member.id && (
                    <Loader2 className="h-5 w-5 ml-auto animate-spin text-zinc-500"/>
                  )}
              </div>))}
          </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}