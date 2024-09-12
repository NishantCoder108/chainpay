"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const SOLBalance = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [solBal, setSolBal] = useState(0);

    console.log("Public Key TOBYTES", wallet.publicKey?.toBytes());
    const getBalance = async () => {
        if (wallet.publicKey) {
            try {
                const balance = await connection.getBalance(
                    wallet.publicKey,
                    "confirmed"
                );
                console.log({ balance });
                const convertToSol = balance / LAMPORTS_PER_SOL;

                setSolBal(convertToSol);
            } catch (error) {
                console.log("Sol Balance Err: ", error);
                setSolBal(0.0);
            }
        }
    };

    useEffect(() => {
        if (wallet.connected) {
            getBalance();
        } else {
            setSolBal(0.0);
        }
    }, [wallet.connected]);

    return (
        <div>
            <p className="font-semibold text-slate-600 text-sm flex items-center gap-1 ">
                {solBal.toFixed(5)}{" "}
                <span className="hidden sm:block"> SOL </span>
            </p>
        </div>
    );
};
