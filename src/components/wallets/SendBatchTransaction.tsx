import React, { useCallback, useState } from "react";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User } from "@/types/user";

type BatchTransactionProps = {
    dropList: User[];
    batchSize?: number; // Optional, default is 10
};

const SendBatchTransaction: React.FC<BatchTransactionProps> = ({
    dropList,
    batchSize = 10,
}) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactionResults, setTransactionResults] = useState<string[]>([]);

    // Generate a batch of transactions, each containing up to batchSize instructions
    const generateBatchedTransactions = useCallback(
        (fromWallet: PublicKey) => {
            const transactions: Transaction[] = [];
            for (let i = 0; i < dropList.length; i += batchSize) {
                const transaction = new Transaction();
                dropList.slice(i, i + batchSize).forEach((drop) => {
                    if (!drop.walletAddress) return;
                    const instruction = SystemProgram.transfer({
                        fromPubkey: fromWallet,
                        toPubkey: new PublicKey(drop.walletAddress),
                        lamports: 0.01 * LAMPORTS_PER_SOL,
                    });
                    transaction.add(instruction);
                });
                transactions.push(transaction);
            }
            return transactions;
        },
        [dropList, batchSize]
    );

    // Execute a batch of transactions with single approval per batch
    const executeBatchedTransactions = useCallback(
        async (transactionList: Transaction[]): Promise<void> => {
            if (!publicKey) return;
            setIsProcessing(true);

            const results: string[] = [];
            for (let index = 0; index < transactionList.length; index++) {
                const transaction = transactionList[index];
                try {
                    const { blockhash, lastValidBlockHeight } =
                        await connection.getLatestBlockhash();
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = publicKey;

                    // Send and confirm the transaction
                    const signature = await sendTransaction(
                        transaction,
                        connection
                    );
                    console.log({ signature });
                    const confTransc = await connection.confirmTransaction(
                        { signature, blockhash, lastValidBlockHeight },
                        "processed"
                    );
                    console.log({ confTransc });
                    alert("Successful Transaction!");
                    const statusSign = await connection.getSignatureStatuses([
                        signature,
                    ]);
                    console.log({ statusSign });
                    results.push(`Batch ${index + 1} confirmed: ${signature}`);
                } catch (error) {
                    results.push(`Batch ${index + 1} failed: ${error}`);
                }
            }

            setTransactionResults(results);
            setIsProcessing(false);
        },
        [connection, publicKey, sendTransaction]
    );

    // Handle the batch transaction submission
    const handleBatchTransaction = async () => {
        if (!publicKey) {
            alert("Please connect your wallet.");
            return;
        }

        if (dropList.length > 0) {
            const transactionList = generateBatchedTransactions(publicKey);
            await executeBatchedTransactions(transactionList);
        }

        console.log("Handle Batch Transaction");
    };

    return (
        <div>
            <div>
                <div>
                    <DialogContent className="bg-white text-black">
                        <DialogHeader>
                            <DialogTitle className=" ">
                                Send SOL to Selected Users
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="sol-amount"
                                    className="text-right"
                                >
                                    SOL Amount
                                </Label>
                                <Input
                                    id="sol-amount"
                                    value={0.01}
                                    // onChange={(e) =>
                                    //     setSolAmount(Number(e.target.value))
                                    // }
                                    className="col-span-3"
                                    type="number"
                                    min={0}
                                    step={0.1}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={handleBatchTransaction}
                            >
                                Send Transaction
                            </Button>
                        </DialogFooter>

                        {/* <button onClick={handleBatchTransaction} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Send Batch Transactions"}
            </button> */}
                        {transactionResults.length > 0 && (
                            <div>
                                <h3>Transaction Results:</h3>
                                <ul>
                                    {transactionResults.map((result, index) => (
                                        <li key={index}>{result}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </DialogContent>
                </div>
            </div>
        </div>
    );
};

export default SendBatchTransaction;
