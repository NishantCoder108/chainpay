import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Wallet address copied!");
};
