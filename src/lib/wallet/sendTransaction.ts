import {
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";

export function generateTransactions(
    batchSize: number,
    dropList: {
        walletAddress: string;
        numLamports: number;
    }[],
    fromWallet: PublicKey
): Transaction[] {
    const result: Transaction[] = [];
    const txInstructions: TransactionInstruction[] = dropList.map((drop) => {
        return SystemProgram.transfer({
            fromPubkey: fromWallet,
            toPubkey: new PublicKey(drop.walletAddress),
            lamports: drop.numLamports,
        });
    });
    const numTransactions = Math.ceil(txInstructions.length / batchSize);
    for (let i = 0; i < numTransactions; i++) {
        const bulkTransaction = new Transaction();
        const lowerIndex = i * batchSize;
        const upperIndex = (i + 1) * batchSize;
        for (let j = lowerIndex; j < upperIndex; j++) {
            if (txInstructions[j]) bulkTransaction.add(txInstructions[j]);
        }
        result.push(bulkTransaction);
    }
    return result;
}

export async function executeTransactions(
    solanaConnection: Connection,
    transactionList: Transaction[],
    payer: Keypair
): Promise<PromiseSettledResult<string>[]> {
    let result: PromiseSettledResult<string>[] = [];
    const staggeredTransactions: Promise<string>[] = transactionList.map(
        (transaction, i, allTx) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(
                        `Requesting Transaction ${i + 1}/${allTx.length}`
                    );
                    solanaConnection
                        .getLatestBlockhash()
                        .then(
                            (recentHash) =>
                                (transaction.recentBlockhash =
                                    recentHash.blockhash)
                        )
                        .then(() =>
                            sendAndConfirmTransaction(
                                solanaConnection,
                                transaction,
                                [payer]
                            )
                        )
                        .then(resolve);
                }, i * 1000);
            });
        }
    );
    result = await Promise.allSettled(staggeredTransactions);
    return result;
}

// (async () => {
//     console.log(
//         `Initiating SOL drop from ${FROM_KEY_PAIR.publicKey.toString()}`
//     );
//     const transactionList = generateTransactions(
//         NUM_DROPS_PER_TX,
//         dropList,
//         FROM_KEY_PAIR.publicKey
//     );
//     const txResults = await executeTransactions(
//         SOLANA_CONNECTION,
//         transactionList,
//         FROM_KEY_PAIR
//     );
//     console.log(await txResults);
// })();
