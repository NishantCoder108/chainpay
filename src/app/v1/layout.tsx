"use client";
import AppLayout from "@/components/Layout";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import LoadingScreen from "@/components/common/LoadingUi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BalanceProvider } from "@/contexts/BalanceContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NetworkProvider, useNetwork } from "@/contexts/NetworkContext";

const Homepage = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { solanaUrl } = useNetwork();

    // const endpoint = process.env.NEXT_PUBLIC_RPC_URL as string;
    console.log({ session });
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <LoadingScreen />;
    }

    if (!session) {
        router.push("/");
        return null;
    } else {
        if (process.env.NODE_ENV === "production") {
            console.log = () => {};
            console.warn = () => {};
            console.error = () => {};
        }
        return (
            <NetworkProvider>
                <ConnectionProvider endpoint={solanaUrl as string}>
                    <WalletProvider wallets={[]} autoConnect>
                        <BalanceProvider>
                            <TooltipProvider>
                                <AppLayout>{children}</AppLayout>
                            </TooltipProvider>
                        </BalanceProvider>{" "}
                    </WalletProvider>
                </ConnectionProvider>
            </NetworkProvider>
        );
    }
};

export default Homepage;
