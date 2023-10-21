"use client";

import { X } from "lucide-react";

export const ServerCrash = () => {
    const onCrash = () => {
        throw new Error("Intentional crash for debugging");
      }
    return (
        <button
            className="bg-rose-500 text-white p-1 rounded-full absolute bottom-5 right-17 shadow-sm"
            onClick={onCrash}    
            title="DON'T CLICK IT"
            >
                <X className="h-4 w-48" />
        </button>
    )
}