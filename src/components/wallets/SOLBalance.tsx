"use client";
import { useContext } from "react";
import { BalanceContext } from "@/contexts/BalanceContext";

export const SOLBalance = () => {
    const context = useContext(BalanceContext);
    const { walletBalance } = context;
    return (
        <div>
            <p className="font-semibold text-slate-600 text-sm flex items-center gap-1 ">
                {walletBalance.toFixed(5)}{" "}
                <span className="hidden sm:block"> SOL </span>
            </p>
        </div>
    );
};
