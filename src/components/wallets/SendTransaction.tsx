import React, { useState } from "react";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User } from "@/types/user";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

interface IProps {
    selectedUsers: User[];
}
const SendTransaction = ({ selectedUsers }: IProps) => {
    const wallet = useWallet();
    // const { connection } = useConnection();
    // console.log(connection.rpcEndpoint);
    const [solAmount, setSolAmount] = useState<number>(0);

    // const solanaConn = new Connection(connection.rpcEndpoint);

    // console.log({ solanaConn });

    // const connection = new Connection("https://api.devnet.solana.com");
    const connection = new Connection("https://api.devnet.solana.com");

    const handleSendTransaction = async () => {
        if (!wallet.connected) {
            alert("Please connect your wallet to send a message.");
            return;
        }

        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey as PublicKey,
                    toPubkey: new PublicKey(selectedUsers[0].walletAddress),
                    lamports: 0.01 * LAMPORTS_PER_SOL,
                })
            );

            console.log({ transaction });
            const signature = await wallet.sendTransaction(
                transaction,
                connection
            );

            console.log({ signature });
            const confSign = await connection.confirmTransaction(
                signature,
                "processed"
            );

            console.log({ confSign });

            alert("Message sent successfully and transaction completed!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        }
    };
    // const handleSendTransaction = async () => {
    //     console.log("Send Transaction", selectedUsers, "and", solAmount);

    //     // try {
    //     //     if (wallet.publicKey) {
    //     //         const transaction = new Transaction().add(
    //     //             SystemProgram.transfer({
    //     //                 fromPubkey: wallet.publicKey as PublicKey,
    //     //                 toPubkey: new PublicKey(selectedUsers[0].walletAddress),
    //     //                 lamports: solAmount * LAMPORTS_PER_SOL,
    //     //             })
    //     //         );
    //     //         // const { blockhash, lastValidBlockHeight } =
    //     //         //     await connection.getLatestBlockhash();

    //     //         // transaction.recentBlockhash = blockhash;
    //     //         // transaction.feePayer = wallet.publicKey;
    //     //         console.log("Transaction Sol :", transaction);

    //     //         const signature = await wallet.sendTransaction(
    //     //             transaction,
    //     //             connection
    //     //         );
    //     //         console.log({ signature });

    //     //         // const valideBlockHeight = lastValidBlockHeight + 150;
    //     //         // console.log({ valideBlockHeight });
    //     //         // const sentTransact = await connection.confirmTransaction(
    //     //         //     {
    //     //         //         signature,
    //     //         //         blockhash,
    //     //         //         lastValidBlockHeight: valideBlockHeight,
    //     //         //     },
    //     //         //     "finalized"
    //     //         // );
    //     //         const transactSol = await solanaConn.confirmTransaction(
    //     //             signature,
    //     //             "processed"
    //     //         );

    //     //         console.log("Sent Transact :", transactSol);
    //     //     }
    //     // } catch (error) {
    //     //     console.log("Send Transaction Error :", error);
    //     // }

    //     // console.log(
    //     //     `Sending ${solAmount} SOL to ${selectedUsers.length} users`
    //     // );
    //     // setIsModalOpen(false);
    //     // setSelectedUsers([]);

    //     try {
    //         const transaction = new Transaction().add(
    //             SystemProgram.transfer({
    //                 fromPubkey: wallet.publicKey as PublicKey,
    //                 toPubkey: new PublicKey(selectedUsers[0].walletAddress),
    //                 lamports: 0.01 * LAMPORTS_PER_SOL,
    //             })
    //         );

    //         console.log({ transaction });
    //         const signature = await wallet.sendTransaction(
    //             transaction,
    //             connection
    //         );

    //         console.log({ signature });
    //         const confSign = await connection.confirmTransaction(
    //             signature,
    //             "processed"
    //         );

    //         console.log({ confSign });
    //     } catch (error) {
    //         console.log("Transaction Error:", error);
    //     }
    //     // setSolAmount(0);
    // };
    return (
        <div>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle className=" ">
                        Send SOL to Selected Users
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sol-amount" className="text-right">
                            SOL Amount
                        </Label>
                        <Input
                            id="sol-amount"
                            value={solAmount}
                            onChange={(e) =>
                                setSolAmount(Number(e.target.value))
                            }
                            className="col-span-3"
                            type="number"
                            min={0}
                            step={0.1}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSendTransaction}>
                        Send Transaction
                    </Button>
                </DialogFooter>
            </DialogContent>
        </div>
    );
};

export default SendTransaction;
