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
    ChevronRightIcon,
} from "lucide-react";
import CopyToClipboard from "./common/CopyToClipboard";
import { containerVariants, formattedLongString } from "@/lib/utils";
import { IUserDashboardDetails } from "@/types/user";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
import TableLoader from "./common/TableLoader";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

interface IProps {
    dataError: string;
    dashboardDetails: IUserDashboardDetails;
}

export default function ChainpayDashboard({
    dashboardDetails,
    dataError,
}: IProps) {
    const {
        incrementByMonth,
        incrementByWeek,
        latestTransactions,
        totalTransactions,
        totalUsers,
    } = dashboardDetails;

    console.log({ dataError });
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
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
                            {totalTransactions || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {!incrementByMonth ? (
                                <Skeleton className="h-5 w-full my-2 rounded-md" />
                            ) : (
                                incrementByMonth
                            )}{" "}
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
                            {totalUsers || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {!incrementByWeek ? (
                                <Skeleton className="h-5 w-full my-2 rounded-md" />
                            ) : (
                                incrementByWeek
                            )}
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

            <motion.div
                className="space-y-4 text-black"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <h3 className="text-lg font-medium">
                            Recent Transactions
                        </h3>
                        <div className="mt-4">
                            <Table>
                                <ScrollArea className="h-[54vh]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>S.No</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead className="">
                                                Wallet Address
                                            </TableHead>
                                            <TableHead className=" flex text-nowrap items-center">
                                                Amount (SOL)
                                            </TableHead>
                                            <TableHead>CreatedAt</TableHead>
                                            <TableHead>Signature</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {!latestTransactions ? (
                                            <TableLoader />
                                        ) : latestTransactions.length > 0 ? (
                                            latestTransactions.map((tx, i) => (
                                                <TableRow key={tx._id}>
                                                    <TableCell>
                                                        {i + 1}{" "}
                                                    </TableCell>
                                                    <TableCell className="font-medium ">
                                                        {tx.name.map(
                                                            (nameItem) => (
                                                                <Badge
                                                                    variant={
                                                                        "secondary"
                                                                    }
                                                                    key={
                                                                        nameItem
                                                                    }
                                                                >
                                                                    {nameItem}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {tx.email.map(
                                                            (emailItem) => (
                                                                <Badge
                                                                    variant={
                                                                        "secondary"
                                                                    }
                                                                    key={
                                                                        emailItem
                                                                    }
                                                                >
                                                                    {emailItem}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center    justify-start">
                                                            {tx.walletAddress.map(
                                                                (
                                                                    addressItem
                                                                ) => (
                                                                    <Badge
                                                                        variant={
                                                                            "secondary"
                                                                        }
                                                                        key={
                                                                            addressItem
                                                                        }
                                                                    >
                                                                        <div className="flex gap-1 items-center justify-center relative">
                                                                            {formattedLongString(
                                                                                addressItem
                                                                            )}
                                                                            <CopyToClipboard
                                                                                textToCopy={
                                                                                    addressItem
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </Badge>
                                                                )
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="">
                                                        {tx.amount}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatDate(
                                                            tx.createdAt,
                                                            "PPpp"
                                                        )}
                                                    </TableCell>
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
                                                            <ExternalLinkIcon
                                                                size={12}
                                                            />
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <tr>
                                                <TableCell
                                                    colSpan={7}
                                                    className="text-center h-56 items-center text-slate-600"
                                                >
                                                    No Transactions Found
                                                </TableCell>
                                            </tr>
                                        )}
                                    </TableBody>
                                </ScrollArea>
                            </Table>

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
            </motion.div>
        </motion.div>
    );
}
