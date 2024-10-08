"use client";
import { getBalance } from "@/lib/wallet/getBalance";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { createContext, useEffect, useState } from "react";
import { useNetwork } from "./NetworkContext";

interface BalanceContextType {
    walletBalance: number;
    updateBalance: () => void;
}
export const BalanceContext = createContext<BalanceContextType>({
    walletBalance: 0,
    updateBalance: () => {},
});

export const BalanceProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [walletBalance, setWalletBalance] = useState(0);
    const wallet = useWallet();
    const { solanaUrl, network } = useNetwork();
    const updateBalance = async () => {
        try {
            if (!wallet.publicKey) {
                setWalletBalance(0);
                return;
            }
            const newBalance = await getBalance(wallet.publicKey, solanaUrl);
            console.log({ newBalance });
            setWalletBalance(newBalance);
        } catch (error) {
            console.error("Fetching Wallet Bal Error:", error);
            setWalletBalance(0);
        }
    };

    useEffect(() => {
        updateBalance();
    }, [wallet.connected, network]);

    console.log({ network });
    console.log({ solanaUrl });
    return (
        <BalanceContext.Provider value={{ walletBalance, updateBalance }}>
            {children}
        </BalanceContext.Provider>
    );
};

// const getTestBalance = (): Promise<number> => {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res(Math.random() * 3);
//         }, 1000);
//     });
// };
