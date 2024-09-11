"use client";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    WalletDisconnectButton,
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
    const endpoint = process.env.NEXT_PUBLIC_RPC_URL as string;
    console.log({ endpoint });

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <div className="flex items-center justify-between">
                        <WalletMultiButton />

                        <WalletDisconnectButton />
                    </div>
                </WalletModalProvider>

                <div>
                    <TooltipProvider>
                        <Dashboard />
                    </TooltipProvider>
                </div>
            </WalletProvider>
        </ConnectionProvider>
    );
}
