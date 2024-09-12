import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
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
import {
    UserPlusIcon,
    XIcon,
    SendIcon,
    CalendarIcon,
    SearchIcon,
    GlobeIcon,
    FilterIcon,
} from "lucide-react";
import { format } from "date-fns";
import Pagination from "../common/Pagination";
import { containerVariants, itemVariants } from "@/lib/utils";

// Mock data for users (in a real app, this would come from a database)
const initialUsers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        walletAddress: "5xjP...q1X9",
        country: "USA",
        addedAt: new Date(2023, 5, 1),
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        walletAddress: "7yK2...m3Z8",
        country: "Canada",
        addedAt: new Date(2023, 5, 15),
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        walletAddress: "9wR5...b6Y4",
        country: "UK",
        addedAt: new Date(2023, 6, 1),
    },
    {
        id: 4,
        name: "Diana Prince",
        email: "diana@example.com",
        walletAddress: "3zM8...k7L2",
        country: "Australia",
        addedAt: new Date(2023, 6, 15),
    },
    {
        id: 5,
        name: "Ethan Hunt",
        email: "ethan@example.com",
        walletAddress: "1qA9...j6P5",
        country: "Germany",
        addedAt: new Date(2023, 7, 1),
    },
];

const countries = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "India",
    "South Africa",
];
interface IUser {
    id: number;
    name: string;
    email: string;
    walletAddress: string;
    country: string;
}

export default function TransactionHistory() {
    const [users, setUsers] = useState<IUser[]>(initialUsers);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [solAmount, setSolAmount] = useState("");
    const [walletBalance, setWalletBalance] = useState(10); // Mock wallet balance
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        walletAddress: "",
        country: "",
        addedAt: new Date(),
    });
    const [isSending, setIsSending] = useState(false);
    const [filters, setFilters] = useState({
        search: "",
        country: "",
        startDate: null,
        endDate: null,
    });

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
                user.name.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower) ||
                user.walletAddress.toLowerCase().includes(searchLower);
            const matchesCountry =
                !filters.country || user.country === filters.country;
            const matchesDateRange =
                (!filters.startDate || user.addedAt >= filters.startDate) &&
                (!filters.endDate || user.addedAt <= filters.endDate);
            return matchesSearch && matchesCountry && matchesDateRange;
        });
    }, [users, filters]);

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="flex-1 min-w-[200px]">
                                <div className="relative text-sm">
                                    <SearchIcon
                                        size={13}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    />
                                    <Input
                                        placeholder="Search by Email, Wallet Address, Name, or Signature"
                                        value={filters.search}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                search: e.target.value,
                                            })
                                        }
                                        className="pl-6 w-full text-sm  "
                                    />
                                </div>
                            </div>
                            <Select
                                value={filters.country}
                                onValueChange={(value) =>
                                    setFilters({ ...filters, country: value })
                                }
                            >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="India">
                                        All Countries
                                    </SelectItem>
                                    {countries.map((country) => (
                                        <SelectItem
                                            key={country}
                                            value={country}
                                        >
                                            {country}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">
                                            {filters.startDate &&
                                            filters.endDate ? (
                                                <>
                                                    {format(
                                                        filters.startDate,
                                                        "PP"
                                                    )}{" "}
                                                    -{" "}
                                                    {format(
                                                        filters.endDate,
                                                        "PP"
                                                    )}
                                                </>
                                            ) : (
                                                <span>Date range</span>
                                            )}
                                        </span>
                                        <span className="sm:hidden">Date</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="range"
                                        selected={{
                                            from: filters.startDate,
                                            to: filters.endDate,
                                            // from: new Date(),
                                            // to: new Date(),
                                        }}
                                        onSelect={(range) =>
                                            setFilters({
                                                ...filters,
                                                startDate: range?.from || null,
                                                endDate: range?.to || null,
                                            })
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setFilters({
                                        search: "",
                                        country: "",
                                        startDate: null,
                                        endDate: null,
                                    })
                                }
                                className="w-full sm:w-auto"
                            >
                                <FilterIcon className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Clear Filters
                                </span>
                                <span className="sm:hidden">Clear</span>
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            Select
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Email
                                        </TableHead>
                                        <TableHead>Wallet Address</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Country
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <AnimatePresence>
                                        {filteredUsers.map((user) => (
                                            <motion.tr
                                                key={user.id}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                layout
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedUsers.includes(
                                                            user.id
                                                        )}
                                                        onCheckedChange={() =>
                                                            handleUserSelection(
                                                                user.id
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {user.name}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    {user.walletAddress}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {user.country}
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </motion.div>
    );
}
