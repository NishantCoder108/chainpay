import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import AddRecipient from "./AddRecipient";
import {
    containerVariants,
    formattedLongString,
    itemVariants,
} from "@/lib/utils";
import { useSession } from "next-auth/react";
import TableLoader from "../common/TableLoader";
import CopyToClipboard from "../common/CopyToClipboard";
import FilterRecipient from "./FilterRecipient";
import { IFilters, IUser } from "@/types/user";
import InitiateTransaction from "./InitiateTransaction";

export default function RecipientManagement() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const { data: session } = useSession();

    const [loadingTable, setLoadingTable] = useState(false);
    const [filters, setFilters] = useState<IFilters>({
        search: "",
        country: "",
        startDate: null,
        endDate: null,
    });

    const filteredUsers = useMemo(() => {
        return users.filter((user: IUser) => {
            const searchLower = filters.search.trim().toLowerCase();
            const matchesSearch =
                user.name.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower) ||
                user.walletAddress.toLowerCase().includes(searchLower);

            const matchesCountry =
                !filters.country || user.country === filters.country;

            const createdAtDate = new Date(user.createdAt);

            const matchesDateRange =
                (!filters.startDate ||
                    (filters.startDate instanceof Date &&
                        createdAtDate >= filters.startDate)) &&
                (!filters.endDate ||
                    (filters.endDate instanceof Date &&
                        createdAtDate <= filters.endDate));

            return matchesSearch && matchesCountry && matchesDateRange;
        });
    }, [users, filters]);

    const handleUserSelection = (userId: string) => {
        const filterUserList = filteredUsers.filter(
            (user) => user._id === userId
        );

        setSelectedUsers((prev) =>
            selectedUsers.some((usr: IUser) => usr._id === userId)
                ? prev.filter((usr: IUser) => usr._id !== userId)
                : [...prev, ...filterUserList]
        );
    };

    const fetchData = async () => {
        setLoadingTable(true);
        try {
            const res = await fetch(
                `/api/v1/addRecipient?userId=${session?.user.userId}`
            );

            if (!res.ok) {
                const contentType = res.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    const errorData = await res.json();
                    throw errorData;
                } else if (contentType && contentType.includes("text/html")) {
                    const errorHtml = await res.text();
                    console.error("Received HTML response:", errorHtml);
                    throw new Error(
                        "Something went wrong. Please try again later."
                    );
                } else {
                    throw new Error("Unknown error occurred.");
                }
            }

            const resData = await res.json();

            setUsers(resData.data);
            setLoadingTable(false);
        } catch (error) {
            console.log({ error });
            setLoadingTable(false);

            setUsers([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log({ users });
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
                        <div className="flex flex-col  sm:flex-row sm:justify-end items-end sm:items-center mb-4 space-y-4 sm:space-y-0">
                            {/* Add Recipient Page */}
                            <Dialog
                                open={isAddUserDialogOpen}
                                onOpenChange={setIsAddUserDialogOpen}
                            >
                                <AddRecipient
                                    setIsAddUserDialogOpen={
                                        setIsAddUserDialogOpen
                                    }
                                />
                            </Dialog>
                        </div>
                        {/* Filter Table Data */}
                        <FilterRecipient
                            filters={filters}
                            setFilters={setFilters}
                            users={users}
                        />

                        {/* Table Data */}
                        <div className="overflow-x-auto min-h-60">
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
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((user) => (
                                                <tr key={user._id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsers.some(
                                                                (usr: IUser) =>
                                                                    usr._id ===
                                                                    user._id
                                                            )}
                                                            onCheckedChange={() =>
                                                                handleUserSelection(
                                                                    user._id
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
                                                        <div className="flex gap-1 items-center ">
                                                            {formattedLongString(
                                                                user.walletAddress
                                                            )}{" "}
                                                            <CopyToClipboard
                                                                textToCopy={
                                                                    user.walletAddress
                                                                }
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {user.country}
                                                    </TableCell>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                {loadingTable ? (
                                                    <TableLoader />
                                                ) : (
                                                    <TableCell
                                                        colSpan={5}
                                                        className="text-center h-52 text-slate-600"
                                                    >
                                                        No Recipient Found
                                                    </TableCell>
                                                )}
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <InitiateTransaction
                selectedUsers={selectedUsers}
                handleUserSelection={handleUserSelection}
                setSelectedUsers={setSelectedUsers}
            />
        </motion.div>
    );
}
