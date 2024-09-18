"use client";

import { useState, useEffect, useMemo } from "react";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
    SearchIcon,
    FilterIcon,
    ExternalLinkIcon,
    ArrowRightIcon,
} from "lucide-react";
import { format, formatDate } from "date-fns";
import { containerVariants, formattedLongString } from "@/lib/utils";
import Link from "next/link";
import CopyToClipboard from "../common/CopyToClipboard";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import TableLoader from "../common/TableLoader";
import { IFilters, IUserTransaction } from "@/types/user";
import FilterRecipient from "../transaction/FilterRecipient";
import FilterTransactions from "./FilterTransactions";

interface IProps {
    transactions: IUserTransaction[];
    isLoading: boolean;
}
export default function TransactionHistory({
    transactions,
    isLoading,
}: IProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState<IFilters>({
        search: "",
        startDate: null,
        endDate: null,
    });

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction: IUserTransaction) => {
            const searchLower = filters.search.trim().toLowerCase();

            const matchesSearch =
                transaction.name.some((nameItem) =>
                    nameItem.trim().toLowerCase().includes(searchLower)
                ) ||
                transaction.email.some((emailItem) =>
                    emailItem.trim().toLowerCase().includes(searchLower)
                ) ||
                transaction.walletAddress.some((walletItem) =>
                    walletItem.trim().toLowerCase().includes(searchLower)
                ) ||
                transaction.signature
                    .trim()
                    .toLowerCase()
                    .includes(searchLower);

            const createdAtDate = new Date(transaction.createdAt);

            const matchesDateRange =
                (!filters.startDate ||
                    (filters.startDate instanceof Date &&
                        createdAtDate >= filters.startDate)) &&
                (!filters.endDate ||
                    (filters.endDate instanceof Date &&
                        createdAtDate <= filters.endDate));

            return matchesSearch && matchesDateRange;
        });
    }, [transactions, filters]);

    return (
        <motion.div
            className="space-y-4 text-black"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div>
                        <FilterTransactions
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </div>
                    <div className="mt-4">
                        <Table className="">
                            <ScrollArea className="min-h-96">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>S.No</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead className="">
                                            Wallet Address
                                        </TableHead>
                                        <TableHead className="flex items-center text-nowrap ">
                                            <span>Amount (SOL)</span>
                                        </TableHead>
                                        <TableHead>CreatedAt</TableHead>
                                        <TableHead>Signature</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredTransactions.length > 0 ? (
                                        filteredTransactions.map((tx, i) => (
                                            <TableRow key={tx._id}>
                                                <TableCell>{i + 1} </TableCell>
                                                <TableCell className="font-medium ">
                                                    {tx.name.map((nameItem) => (
                                                        <Badge
                                                            variant={
                                                                "secondary"
                                                            }
                                                            key={nameItem}
                                                        >
                                                            {nameItem}
                                                        </Badge>
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    {tx.email.map(
                                                        (emailItem) => (
                                                            <Badge
                                                                variant={
                                                                    "secondary"
                                                                }
                                                                key={emailItem}
                                                            >
                                                                {emailItem}
                                                            </Badge>
                                                        )
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center    justify-start">
                                                        {tx.walletAddress.map(
                                                            (addressItem) => (
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
                                            {isLoading ? (
                                                <TableLoader />
                                            ) : (
                                                <TableCell
                                                    colSpan={7}
                                                    className="text-center h-56 items-center text-slate-600"
                                                >
                                                    No Transactions Found
                                                </TableCell>
                                            )}
                                        </tr>
                                    )}
                                </TableBody>
                            </ScrollArea>
                        </Table>

                        <div className="flex items-center justify-between pt-6">
                            <div className="text-sm text-gray-500">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="space-x-2 flex items-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeftIcon className="h-4 w-4" />
                                    Previous
                                </Button>
                                <Button
                                    variant={
                                        currentPage !== totalPages
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
