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

export const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            staggerChildren: 0.1,
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};
