import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// This function merges classnames from clsx and tailwind-merge
// @param inputs - classnames to merge
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}