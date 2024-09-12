import { useState, useEffect } from "react";
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
import { UserPlusIcon, XIcon, SendIcon } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/utils";

// Mock data for users
const initialUsers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        walletAddress: "5xjP...q1X9",
        country: "USA",
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        walletAddress: "7yK2...m3Z8",
        country: "Canada",
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        walletAddress: "9wR5...b6Y4",
        country: "UK",
    },
    {
        id: 4,
        name: "Diana Prince",
        email: "diana@example.com",
        walletAddress: "3zM8...k7L2",
        country: "Australia",
    },
    {
        id: 5,
        name: "Ethan Hunt",
        email: "ethan@example.com",
        walletAddress: "1qA9...j6P5",
        country: "Germany",
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
    "Other",
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
    });
    const [isSending, setIsSending] = useState(false);

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
        setUsers([...users, { id: newUserId, ...newUser }]);
        setNewUser({ name: "", email: "", walletAddress: "", country: "" });
        setIsAddUserDialogOpen(false);
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <Card className="h-[75vh]">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">
                                Recipient Selection
                            </h2>
                            <Dialog
                                open={isAddUserDialogOpen}
                                onOpenChange={setIsAddUserDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="ml-auto" size="sm">
                                        <UserPlusIcon className="mr-2 h-4 w-4" />
                                        Add Recipient
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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        Select
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Wallet Address</TableHead>
                                    <TableHead>Country</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedUsers.includes(
                                                        Number(user.id)
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleUserSelection(
                                                            user.id
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {user.walletAddress}
                                            </TableCell>
                                            <TableCell>
                                                {user.country}
                                            </TableCell>
                                        </tr>
                                    ))}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button
                            disabled={selectedUsers.length === 0}
                            className="transition-all duration-300 hover:scale-105"
                        >
                            <SendIcon className="mr-2 h-4 w-4" />
                            Initiate Transfer
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
                                                selectedUsers.includes(
                                                    Number(user.id)
                                                )
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
