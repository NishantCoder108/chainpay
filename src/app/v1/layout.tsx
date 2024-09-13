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

const Homepage = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const endpoint = process.env.NEXT_PUBLIC_RPC_URL as string;
    console.log({ endpoint });
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
        return (
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={[]} autoConnect>
                    <AppLayout>{children}</AppLayout>
                </WalletProvider>
            </ConnectionProvider>
        );
    }
};

export default Homepage;
