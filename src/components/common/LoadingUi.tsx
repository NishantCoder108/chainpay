"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    return 100;
                }
                const newProgress = oldProgress + 10;
                return Math.min(newProgress, 100);
            });
        }, 200);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <svg className="animate-spin" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="white"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="white"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                    Loading your experience
                </h2>
                <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-gray-500 mt-4 font-mono">
                    {progress}% Complete
                </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 via-gray-500 to-white" />
        </div>
    );
}
