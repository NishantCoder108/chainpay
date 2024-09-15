import React, { useState } from "react";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UserPlusIcon } from "lucide-react";
import { countries } from "@/lib/countryList";
import { IRecipient } from "@/types/user";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface IProps {
    setIsAddUserDialogOpen: (res: boolean) => void;
}
const AddRecipient = ({ setIsAddUserDialogOpen }: IProps) => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        walletAddress: "",
        country: "",
    });

    const { data: session } = useSession();
    const handleAddUser = async () => {
        try {
            const recipient = {
                name: newUser.name,
                email: newUser.email,
                walletAddress: newUser.walletAddress,
                country: newUser.country,
                userId: session?.user.userId,
            };
            console.log({ newUser });

            const response = await fetch("/api/v1/addRecipient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipient),
            });

            console.log({ response });
            if (!response.ok && response.status === 201) {
                const resError = await response.json();
                throw resError;
            }

            const data = await response.json();
            console.log("Recipient saved successfully:", data);

            setNewUser({
                name: "",
                email: "",
                walletAddress: "",
                country: "",
            });
            setIsAddUserDialogOpen(false);

            toast.success(data.message || "Recipient saved successfully");
        } catch (error) {
            const errMessage = (error as Error).message;
            console.error("Error saving recipient data:", error);

            toast.error(
                errMessage || "Error saving recipient data. Please try again"
            );
        }
    };

    return (
        <div>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto" size="sm">
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Recipient</span>
                    <span className="sm:hidden">Add</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Add New Recipient</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
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
                        <Label htmlFor="email" className="text-right">
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
                        <Label htmlFor="walletAddress" className="text-right">
                            Wallet Address
                        </Label>
                        <Input
                            id="walletAddress"
                            type="text"
                            value={newUser.walletAddress}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    walletAddress: e.target.value,
                                })
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="country" className="text-right">
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
                                {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                        {country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddUser}>Add Recipient</Button>
                </DialogFooter>
            </DialogContent>
        </div>
    );
};

export default AddRecipient;
