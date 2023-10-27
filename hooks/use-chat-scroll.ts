import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMoreMessages: boolean;
    loadMoreMessages: () => void;
    cnt : number;
};

export const useChatScroll = ({
    chatRef,
    bottomRef,
    shouldLoadMoreMessages,
    loadMoreMessages,
    cnt,
}: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);
    useEffect(() => {
        const topDiv = chatRef?.current;
        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;
            if (scrollTop === 0 && shouldLoadMoreMessages) {loadMoreMessages();}
        };
        topDiv?.addEventListener("scroll", handleScroll);

        return () => {topDiv?.removeEventListener("scroll", handleScroll);}
    }, [shouldLoadMoreMessages, loadMoreMessages, chatRef]);

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef.current;
        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }
            if (!topDiv) {
                return false;
            }

            const distFromBottom = topDiv.scrollHeight - topDiv.clientHeight - topDiv.scrollTop;
            return distFromBottom <= 100;
        };
    if (shouldAutoScroll()) {setTimeout(() => {bottomRef.current?.scrollIntoView({behavior: "smooth"});}, 100)}
    }, [bottomRef, hasInitialized, cnt, chatRef]);
}
