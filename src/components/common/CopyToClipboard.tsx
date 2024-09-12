import { Copy } from "lucide-react";
import React, { useState } from "react";

interface CopyToClipboardProps {
    textToCopy: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy }) => {
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
        <div className="">
            <button
                onClick={handleCopy}
                className="copy-button relative flex items-center cursor-pointer"
            >
                {copied ? (
                    <span className="bg-slate-100 absolute rounded p-1 ">
                        Copied!
                    </span>
                ) : (
                    <span>
                        <Copy size={12} />
                    </span>
                )}
            </button>
        </div>
    );
};

export default CopyToClipboard;
