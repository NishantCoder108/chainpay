import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formattedLongString = (txt: string): string => {
    const startPart = txt.slice(0, 4);
    const endPart = txt.slice(-4);

    const addPart = `${startPart}..${endPart}`;

    return addPart;
};
