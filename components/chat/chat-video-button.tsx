'use client';

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Video, VideoOff} from "lucide-react";
import { ActionTooltip } from "../action-tooltip";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video") === "true";

  const tooltipLabel = isVideo ? "end video call" : "start video call";
  const Icon = isVideo ? VideoOff : Video;
  
  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || '',
      query: {
        video: isVideo ? undefined : true,
      }
    }, {skipNull: true});

    router.push(url);
  }
  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-80 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400"/>
      </button>
    </ActionTooltip>
  )
}
