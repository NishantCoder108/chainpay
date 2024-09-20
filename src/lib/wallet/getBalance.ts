import { Connection, PublicKey } from "@solana/web3.js";

// const endpoint = process.env.NEXT_PUBLIC_RPC_URL as string;

export async function getBalance(
    publicKey: PublicKey,
    rpcURL: string | undefined
) {
    try {
        const connection = new Connection(rpcURL || "");

        const balanceLamports = await connection.getBalance(
            publicKey,
            "confirmed"
        );

        // Convert Lamports to SOL (1 SOL = 1 billion Lamports)
        const balanceSOL = balanceLamports / 1e9;

        return balanceSOL;
    } catch (error) {
        console.error("Error fetching balance:", error);

        return 0;
    }
}
