import { Hash } from "lucide-react";

interface ChatWelcomeProps {
    name: string;
    type: 'channel' | 'conversation';
}
export const ChatWelcome = ({name, type}: ChatWelcomeProps) => {
    return(
        <div className="space-y-2 px-4 mb-4">
            {type === 'channel' && (
                <div className="flex items-center justify-center rounded-full bg-zinc-500 dark:bg-zinc-700 h-[70px] w-[70px]">
                    <Hash className="h-13 w-13 text-emerald-100 font-mono"/>
                </div>
            )}
            <p className="text-xl md:text-3xl font-bold">
                {type === 'channel' ? 'welcome to #' : 'this is chat with '}<span className="text-emerald-500">{name}</span>
            </p>
            
        </div>
    )
}