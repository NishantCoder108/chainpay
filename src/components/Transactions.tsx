"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    WalletIcon,
    SearchIcon,
    SendIcon,
    CheckCircleIcon,
    XCircleIcon,
    AlertCircleIcon,
} from "lucide-react";

type User = {
    id: number;
    name: string;
    walletAddress: string;
    email: string;
    country: string;
};
// Mock data for demonstration
const users = [
    {
        id: 1,
        name: "Alice",
        walletAddress: "5xjP...q1X9",
        email: "alice@example.com",
        country: "USA",
    },
    {
        id: 2,
        name: "Bob",
        walletAddress: "7yK2...m3Z8",
        email: "bob@example.com",
        country: "Canada",
    },
    {
        id: 3,
        name: "Charlie",
        walletAddress: "9wR5...b6Y4",
        email: "charlie@example.com",
        country: "UK",
    },
];

const transactions = [
    {
        id: 1,
        recipient: "Alice",
        amount: 1.5,
        status: "success",
        signature: "tx123...abc",
    },
    {
        id: 2,
        recipient: "Bob",
        amount: 2.0,
        status: "pending",
        signature: "tx456...def",
    },
    {
        id: 3,
        recipient: "Charlie",
        amount: 1.0,
        status: "failed",
        signature: "tx789...ghi",
    },
];

export default function TrasactionDashboard() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [solAmount, setSolAmount] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [usersList, setUsersList] = useState(users);

    const filteredUsers = users.filter(
        (user) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleWalletConnection = () => {
        setIsWalletConnected(!isWalletConnected);
    };

    const handleUserSelection = (userId: number) => {
        const filterUserList = usersList.filter(
            (user) => user.id === userId
        ) as [];
        setSelectedUsers((prev) =>
            selectedUsers.some((usr: User) => usr.id === userId)
                ? prev.filter((usr: User) => usr.id !== userId)
                : [...prev, ...filterUserList]
        );
    };

    console.log({ selectedUsers });
    const handleSendTransaction = () => {
        console.log(
            `Sending ${solAmount} SOL to ${selectedUsers.length} users`
        );
        setIsModalOpen(false);
        setSolAmount("");
        setSelectedUsers([]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        SOL Admin Dashboard
                    </h1>
                    <Button
                        onClick={handleWalletConnection}
                        variant={isWalletConnected ? "outline" : "default"}
                    >
                        <WalletIcon className="mr-2 h-4 w-4" />
                        {isWalletConnected
                            ? "Disconnect Wallet"
                            : "Connect Wallet"}
                    </Button>
                </header>

                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">
                            User List
                        </h2>
                        <div className="flex items-center">
                            <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <Input
                                placeholder="Search by email, country, or wallet"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    Select
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Wallet Address</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Country</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-black">
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.some(
                                                (usr: User) =>
                                                    usr.id === user.id
                                            )}
                                            onChange={() =>
                                                handleUserSelection(user.id)
                                            }
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.walletAddress}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.country}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-4 flex justify-end">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            disabled={
                                selectedUsers.length === 0 || !isWalletConnected
                            }
                        >
                            <SendIcon className="mr-2 h-4 w-4" />
                            Send SOL to Selected Users
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Transaction History
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Recipient</TableHead>
                                <TableHead>Amount (SOL)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Signature</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>{tx.recipient}</TableCell>
                                    <TableCell>{tx.amount}</TableCell>
                                    <TableCell>
                                        {tx.status === "success" && (
                                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                        )}
                                        {tx.status === "pending" && (
                                            <AlertCircleIcon className="h-5 w-5 text-yellow-500" />
                                        )}
                                        {tx.status === "failed" && (
                                            <XCircleIcon className="h-5 w-5 text-red-500" />
                                        )}
                                        <span className="ml-2 capitalize">
                                            {tx.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{tx.signature}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send SOL to Selected Users</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sol-amount" className="text-right">
                                SOL Amount
                            </Label>
                            <Input
                                id="sol-amount"
                                value={solAmount}
                                onChange={(e) => setSolAmount(e.target.value)}
                                className="col-span-3"
                                type="number"
                                min="0"
                                step="0.1"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSendTransaction}>
                            Send Transaction
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
