import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";

export const generateBatchTransaction = (
    solAmount: number,
    walletPubKey: PublicKey,
    dropList: {
        walletAddress: string;
    }[],
    batchSize = 10
) => {
    const transactions: Transaction[] = [];
    for (let i = 0; i < dropList.length; i += batchSize) {
        const transaction = new Transaction();
        dropList.slice(i, i + batchSize).forEach((drop) => {
            if (!drop.walletAddress) return;
            const instruction = SystemProgram.transfer({
                fromPubkey: walletPubKey,
                toPubkey: new PublicKey(drop.walletAddress),
                lamports: solAmount * LAMPORTS_PER_SOL,
            });
            transaction.add(instruction);
        });
        transactions.push(transaction);
    }
    return transactions;
};
