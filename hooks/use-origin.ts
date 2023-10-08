import { useEffect, useState } from "react";

/**
 * Returns the origin of the current window location.
 * @returns {string} The origin URL of the current window location.
 */
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const origin = typeof window !== "undefined"  && window.location.origin ? window.location.origin : "";

    if (!mounted) {
        return null;
    }
    return origin;
}