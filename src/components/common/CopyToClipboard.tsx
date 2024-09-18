import { Check, Copy } from "lucide-react";
import React, { useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface CopyToClipboardProps {
    textToCopy: string;
    size?: number;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
    textToCopy,
    size = 9,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={handleCopy}
                        className="copy-button  flex items-center  cursor-pointer"
                    >
                        {copied ? (
                            <p className=" ">
                                <Check size={size} />
                            </p>
                        ) : (
                            <p>
                                <Copy size={size} />
                            </p>
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        {copied ? (
                            <span className="bg-slate-100   ">Copied!</span>
                        ) : (
                            <span>Copy</span>
                        )}
                    </p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
};

export default CopyToClipboard;
