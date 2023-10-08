"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { date } from "zod";
import { useState } from "react";
import axios from "axios";



export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const { server } = data;

  const isModalOpen = isOpen && type === "invite";
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteLink = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const onNew =async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite", {server: response.data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }    
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            invite people 
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-medium text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
            className="bg-zinc-100 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" 
            value={inviteLink}
            disabled={isLoading}
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied 
              ? <Check className="h-5 w-5" />
              : <Copy className="h-5 w-5" /> }
              
            </Button>
          </div>
          <Button
          onClick={onNew}
          disabled={isLoading}
          variant='link'
          size="sm"
          className="mt-4 text-xs text-zinc-600">
            generate a new link
            <RefreshCw className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}