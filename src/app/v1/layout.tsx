"use client";
import AppLayout from "@/components/Layout";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import React from "react";
import "@solana/wallet-adapter-react-ui/styles.css";

const Homepage = ({ children }: { children: React.ReactNode }) => {
    const endpoint = process.env.NEXT_PUBLIC_RPC_URL as string;

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <AppLayout>{children}</AppLayout>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default Homepage;
