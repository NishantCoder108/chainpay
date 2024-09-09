"use client";

import { useEffect, useState } from "react";
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
import { Dialog } from "@/components/ui/dialog";
import {
    WalletIcon,
    SearchIcon,
    SendIcon,
    CheckCircleIcon,
    XCircleIcon,
    AlertCircleIcon,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLBalance } from "./wallets/SOLBalance";
import SendTransaction from "./wallets/SendTransaction";
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
        walletAddress: "4xLjCB5GgT6FhyshwG3ARFYMPk2oH2aMP2eDEqUhEhqx",
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
    const wallet = useWallet();
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [usersList, setUsersList] = useState(users);

    const filteredUsers = users.filter(
        (user) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log({ wallet });

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

    useEffect(() => {
        setIsWalletConnected(wallet.connected);
    }, [wallet.connected]);
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        SOL Admin Dashboard
                    </h1>
                    <div className="flex items-center text-black">
                        <WalletIcon className="mr-2 h-4 w-4" />
                        {/* {isWalletConnected ? "Disconnect " : "Connect "} */}

                        <SOLBalance />
                    </div>
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
                <SendTransaction selectedUsers={selectedUsers} />
            </Dialog>
        </div>
    );
}
