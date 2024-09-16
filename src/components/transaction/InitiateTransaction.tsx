import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { formattedLongString, itemVariants } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { SendIcon, XIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { IUser } from "@/types/user";
import { getBalance } from "@/lib/wallet/getBalance";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import { generateBatchTransaction } from "@/lib/wallet/generateBatchedTranasactions";
import { PublicKey, Transaction } from "@solana/web3.js";

interface IProps {
    selectedUsers: IUser[];
    handleUserSelection: (id: string) => void;
    setSelectedUsers: (user: []) => void;
}
const InitiateTransaction = ({
    selectedUsers,
    handleUserSelection,
    setSelectedUsers,
}: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [solAmount, setSolAmount] = useState<number>(0);
    const [isSending, setIsSending] = useState(false);
    const [walletSolBal, setWalletSolBal] = useState<number>(0);
    const [transactionResLists, setTransactionResLists] = useState([]);

    const {
        connected: walletConnected,
        publicKey,
        sendTransaction,
    } = useWallet();
    const { connection } = useConnection();

    const executeBatchTransaction = async (transactionList: Transaction[]) => {
        const results: string[] = [];
        for (let index = 0; index < transactionList.length; index++) {
            const transaction = transactionList[index];
            try {
                if (!publicKey)
                    throw new Error("Wallet Public Key is missing!");
                const { blockhash, lastValidBlockHeight } =
                    await connection.getLatestBlockhash();
                transaction.recentBlockhash = blockhash;
                transaction.feePayer = publicKey;

                // Send and confirm the transaction
                const signature = await sendTransaction(
                    transaction,
                    connection
                );
                console.log("Batch Transaction", { signature });
                const confirmTransc = await connection.confirmTransaction(
                    { signature, blockhash, lastValidBlockHeight },
                    "processed"
                );
                console.log({ confirmTransc });
                alert("Successful Transaction!");

                results.push(`Batch ${index + 1} confirmed: ${signature}`);
            } catch (error) {
                results.push(`Batch ${index + 1} failed: ${error}`);
                throw error;
            }
        }
        console.log("Execution Transaction : ", results);
    };

    const handleSendTransaction = async () => {
        setIsSending(true);
        console.log("Selected User", selectedUsers);

        try {
            const walletPubKey = publicKey;

            if (!walletPubKey) {
                throw new Error("Wallet is not connected.");
            }

            if (selectedUsers.length > 0 && publicKey) {
                const transactionList = generateBatchTransaction(
                    solAmount,
                    publicKey,
                    selectedUsers,
                    10
                );

                await executeBatchTransaction(transactionList);
                console.log({ transactionList });

                setIsModalOpen(false);
                setSolAmount(0);
                setSelectedUsers([]);
                setIsSending(false);
                toast.success("Transaction successful!");
                return;
            }

            throw new Error("An error occurred during the transaction!");
        } catch (error) {
            console.log({ error });
            setIsSending(false);
            setIsModalOpen(false);
            setSelectedUsers([]);
            toast.error("Transaction failed!");
        }
    };

    const calculateTotalAmount = () => {
        return Number(solAmount) * selectedUsers.length;
    };

    const isBalanceSufficient = () => {
        return calculateTotalAmount() <= walletSolBal;
    };

    const fetchSolBal = async () => {
        const walletPublicKey = publicKey;

        try {
            if (!walletPublicKey) throw new Error("No Wallet Public Key");

            const bal = await getBalance(walletPublicKey);

            console.log("Account Sol Balance:", bal);
            setWalletSolBal(Number(bal));
        } catch (error) {
            console.log("setWalletSolBal", error);
            setWalletSolBal(0);
        }
    };

    useEffect(() => {
        fetchSolBal();
    }, [walletConnected]);
    return (
        <div>
            <motion.div variants={itemVariants} className="flex justify-end">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button
                            disabled={selectedUsers.length === 0}
                            className="transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                        >
                            <SendIcon className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">
                                Initiate Transfer
                            </span>
                            <span className="sm:hidden">Transfer</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] text-slate-950 bg-slate-50">
                        <DialogHeader>
                            <DialogTitle>Confirm SOL Transfer</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="sol-amount"
                                    className="text-left"
                                >
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
                                    min="0"
                                    step="0.1"
                                />
                            </div>

                            <div className="text-sm text-gray-500">
                                Total Sending Amount :
                                <span className="font-semibold pl-3">
                                    {calculateTotalAmount()} SOL
                                </span>
                            </div>
                            <div className="text-sm text-red-500 w-full mx-auto py-0 my-0 flex items-center justify-start">
                                {!isBalanceSufficient() ? (
                                    <p>
                                        Insufficient balance. You need{" "}
                                        <span className="font-semibold">
                                            {(
                                                calculateTotalAmount() -
                                                walletSolBal
                                            ).toPrecision(5)}
                                        </span>{" "}
                                        more SOL.
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <ScrollArea className="h-[200px] rounded-md border p-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Wallet</TableHead>
                                            <TableHead>Country</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedUsers.length > 0 &&
                                            selectedUsers.map((user) => (
                                                <TableRow key={user._id}>
                                                    <TableCell>
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formattedLongString(
                                                            user.walletAddress
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.country}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleUserSelection(
                                                                    user._id
                                                                )
                                                            }
                                                        >
                                                            <XIcon className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </div>
                        <DialogFooter className="">
                            <Button
                                onClick={handleSendTransaction}
                                disabled={
                                    !isBalanceSufficient() ||
                                    selectedUsers.length === 0 ||
                                    calculateTotalAmount() <= 0 ||
                                    isSending
                                }
                                className="w-full "
                            >
                                {isSending ? (
                                    <motion.div
                                        className="flex items-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.div
                                            className="mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                        Processing Transfer...
                                    </motion.div>
                                ) : (
                                    <>
                                        <SendIcon className="mr-2 h-4 w-4" />
                                        Confirm Transfer
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </div>
    );
};

export default InitiateTransaction;
