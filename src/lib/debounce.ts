import { useEffect, useRef } from "react";

/**
 * Debounce function: Executes the callback after a delay.
 */
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): T & { cancel: () => void } {
    let timeout: NodeJS.Timeout;

    const debounced = (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };

    debounced.cancel = () => clearTimeout(timeout);

    return debounced as T & { cancel: () => void };
}

/**
 * Hook to create a debounced callback function.
 */
export const useDebouncedCallback = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
    const debouncedRef = useRef<T & { cancel: () => void }>();

    useEffect(() => {
        const debouncedFn = debounce(callback, delay);
        debouncedRef.current = debouncedFn;

        return () => {
            debouncedRef.current?.cancel();
        };
    }, [callback, delay]);

    const executeDebounced = (...args: Parameters<T>) => {
        debouncedRef.current?.(...args);
    };

    // Add cancel method to the returned function
    executeDebounced.cancel = () => {
        debouncedRef.current?.cancel();
    };

    return executeDebounced;
};
