import { Connection, PublicKey } from "@solana/web3.js";

let cachedWallet: PublicKey | null = null;
let cachedBal: number | null = null;

const endpoint = process.env.NEXT_PUBLIC_RPC_URL as string;

export async function getBalance(publicKey: PublicKey) {
    try {
        if (publicKey === cachedWallet && cachedBal !== null) {
            return cachedBal;
        }
        const connection = new Connection(endpoint);

        // const publicKey = new PublicKey(walletAddress);

        const balanceLamports = await connection.getBalance(publicKey);

        // Convert Lamports to SOL (1 SOL = 1 billion Lamports)
        const balanceSOL = balanceLamports / 1e9;

        cachedWallet = publicKey;
        cachedBal = balanceSOL;

        return balanceSOL;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}
