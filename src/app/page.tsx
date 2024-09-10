"use client";
import TransactionDashboard from "./transactions/page";

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
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

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
                    <TransactionDashboard />
                </div>
            </WalletProvider>
        </ConnectionProvider>
    );
}
