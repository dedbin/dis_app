"use client";
import qs from "query-string";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import axios from "axios";
import {useModal} from "@/hooks/use-modal-store";
import {useState} from "react";
import {Button} from "../ui/button";
import {useRouter} from "next/navigation";



export const DeleteChannelModal = () => {
  const {isOpen, onClose, type, data} = useModal();
  const {server, channel} = data;

  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteChannel";
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
        const url = qs.stringify({
          url: `/api/channels/${channel?.id}`,
          query: {
            serverId: server?.id
          }
        })
        setIsLoading(true);
        const response = await axios.delete(url);
        onClose();
        router.refresh();
        router.push(`/servers/${server?.id}`);
    }catch(error){
        console.log(error);
    }finally{
        setIsLoading(false);
    }
}
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            delete channel
          </DialogTitle>
          <DialogDescription className="text-sm p-2">
            are u sure you want to do this? <br/>
            <span className="font-bold text-[#10b981]">#{channel?.name} </span> will be permanently deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-2 bg-zinc-100">
          <div className="flex items-center justify-between w-full">
            <Button
                disabled={isLoading}
                onClick={onClose}
                variant={"destructive"}
            >
                cansel
            </Button>
            <Button 
                disabled={isLoading}
                onClick={onClick}
                variant={"primary"}
            >
                confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}