"use client";

import "@solana/wallet-adapter-react-ui/styles.css";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import Dashboard from "@/components/dashboard/Dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { data: session } = useSession();

    if (!session) {
        return <Dashboard />;
    } else {
        return router.push("/v1/dashboard");
    }
}
