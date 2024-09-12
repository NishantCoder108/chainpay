import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    UsersIcon,
    ArrowRightIcon,
    SendIcon,
    ExternalLinkIcon,
    Copy,
} from "lucide-react";
import CopyToClipboard from "./common/CopyToClipboard";
import { formattedLongString } from "@/lib/utils";

const recentTransactions = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        walletAddress: "JC2CLARmXhNWPkKr1tsfwiJngMj3z4biqj4M5AnH56p3",
        amount: 1.5,
        signature: "tx123...abc",
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        walletAddress: "7yK2...m3Z8",
        amount: 2.0,
        signature: "tx456...def",
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        walletAddress: "9wR5...b6Y4",
        amount: 1.0,
        signature: "tx789...ghi",
    },
    {
        id: 4,
        name: "Diana Prince",
        email: "diana@example.com",
        walletAddress: "3zM8...k7L2",
        amount: 3.5,
        signature: "tx012...jkl",
    },
];

export default function ChainpayDashboard() {
    const [totalTransactions, setTotalTransactions] = useState(1234);
    const [totalUsers, setTotalUsers] = useState(567);

    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Transactions
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {totalTransactions.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {totalUsers.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +180 new users this week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Quick Action
                        </CardTitle>
                        <SendIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Link href={"/v1/send-transaction"}>
                            <Button className="w-full mt-2 " size="lg">
                                Send Bulk Transactions
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <h3 className="text-lg font-medium">Recent Transactions</h3>
                    <div className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Wallet Address</TableHead>
                                    <TableHead>Amount (SOL)</TableHead>
                                    <TableHead>Signature</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTransactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell className="font-medium ">
                                            {tx.name}
                                        </TableCell>
                                        <TableCell>{tx.email}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2   justify-start">
                                                {formattedLongString(
                                                    tx.walletAddress
                                                )}
                                                <CopyToClipboard
                                                    textToCopy={
                                                        tx.walletAddress
                                                    }
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>{tx.amount}</TableCell>
                                        <TableCell>
                                            <Link
                                                href={`https://explorer.solana.com/tx/${tx.signature}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                                            >
                                                {formattedLongString(
                                                    tx.signature
                                                )}
                                                <ExternalLinkIcon size={12} />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Link href="/v1/transaction-history">
                            <Button
                                variant="outline"
                                className="flex items-center"
                            >
                                Show More
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
