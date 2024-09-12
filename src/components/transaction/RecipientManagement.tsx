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

export default function RecipientManagement() {
    const [users, setUsers] = useState<IUser[]>(initialUsers);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [solAmount, setSolAmount] = useState("");
    const [walletBalance, setWalletBalance] = useState(10); // Mock wallet balance
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
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

    const handleUserSelection = (userId: number) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSendTransaction = () => {
        setIsSending(true);
        // Simulate transaction sending
        setTimeout(() => {
            console.log(
                `Sending ${solAmount} SOL to ${selectedUsers.length} users:`
            );
            selectedUsers.forEach((userId) => {
                const user = users.find((u) => u.id === userId);
                console.log(
                    `- ${user.name} (${user.walletAddress}) in ${user.country}: ${solAmount} SOL`
                );
            });
            setIsSending(false);
            setIsModalOpen(false);
            setSolAmount("");
            setSelectedUsers([]);
        }, 2000);
    };

    const calculateTotalAmount = () => {
        return parseFloat(solAmount) * selectedUsers.length;
    };

    const isBalanceSufficient = () => {
        return calculateTotalAmount() <= walletBalance;
    };

    const handleAddUser = () => {
        const newUserId = users.length + 1;
        setUsers([
            ...users,
            {
                id: newUserId,
                ...newUser,

                // addedAt: new Date()
            },
        ]);
        setNewUser({
            name: "",
            email: "",
            walletAddress: "",
            country: "",
            addedAt: new Date(),
        });
        setIsAddUserDialogOpen(false);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

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
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
                            <h2 className="text-2xl font-bold">
                                Recipient Selection
                            </h2>
                            <Dialog
                                open={isAddUserDialogOpen}
                                onOpenChange={setIsAddUserDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        className="w-full sm:w-auto"
                                        size="sm"
                                    >
                                        <UserPlusIcon className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">
                                            Add Recipient
                                        </span>
                                        <span className="sm:hidden">Add</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add New Recipient
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="name"
                                                className="text-right"
                                            >
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                value={newUser.name}
                                                onChange={(e) =>
                                                    setNewUser({
                                                        ...newUser,
                                                        name: e.target.value,
                                                    })
                                                }
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="email"
                                                className="text-right"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={newUser.email}
                                                onChange={(e) =>
                                                    setNewUser({
                                                        ...newUser,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="walletAddress"
                                                className="text-right"
                                            >
                                                Wallet Address
                                            </Label>
                                            <Input
                                                id="walletAddress"
                                                value={newUser.walletAddress}
                                                onChange={(e) =>
                                                    setNewUser({
                                                        ...newUser,
                                                        walletAddress:
                                                            e.target.value,
                                                    })
                                                }
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="country"
                                                className="text-right"
                                            >
                                                Country
                                            </Label>
                                            <Select
                                                value={newUser.country}
                                                onValueChange={(value) =>
                                                    setNewUser({
                                                        ...newUser,
                                                        country: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select a country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countries.map(
                                                        (country) => (
                                                            <SelectItem
                                                                key={country}
                                                                value={country}
                                                            >
                                                                {country}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleAddUser}>
                                            Add Recipient
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* ksdjf------ */}

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="flex-1 min-w-[200px]">
                                <div className="relative">
                                    <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Search..."
                                        value={filters.search}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                search: e.target.value,
                                            })
                                        }
                                        className="pl-8 w-full"
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

                        {/* dfldkfdf----- */}
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
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Confirm SOL Transfer</DialogTitle>
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
                                    value={solAmount}
                                    onChange={(e) =>
                                        setSolAmount(e.target.value)
                                    }
                                    className="col-span-3"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                />
                            </div>
                            <div className="text-sm text-gray-500">
                                Total Amount:{" "}
                                {calculateTotalAmount().toFixed(2)} SOL
                            </div>
                            {!isBalanceSufficient() && (
                                <div className="text-sm text-red-500">
                                    Insufficient balance. You need{" "}
                                    {(
                                        calculateTotalAmount() - walletBalance
                                    ).toFixed(2)}{" "}
                                    more SOL.
                                </div>
                            )}
                            <ScrollArea className="h-[200px] rounded-md border p-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>
                                                Wallet Address
                                            </TableHead>
                                            <TableHead>Country</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users
                                            .filter((user) =>
                                                selectedUsers.includes(user.id)
                                            )
                                            .map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.walletAddress}
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
                                                                    user.id
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
                        <DialogFooter>
                            <Button
                                onClick={handleSendTransaction}
                                disabled={
                                    !isBalanceSufficient() ||
                                    selectedUsers.length === 0 ||
                                    solAmount === "" ||
                                    isSending
                                }
                                className="w-full"
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
        </motion.div>
    );
}
