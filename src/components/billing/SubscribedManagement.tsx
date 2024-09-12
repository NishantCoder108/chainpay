"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CheckCircle2,
    Loader2,
    ArrowRight,
    CreditCard,
    BarChart,
    Zap,
} from "lucide-react";
import { Progress } from "../ui/progress";
// import { Progress } from "@/components/ui/progress";

type Plan = {
    name: string;
    price: number;
    transactions: number;
    description: string;
};

const plans: Plan[] = [
    {
        name: "Basic",
        price: 0,
        transactions: 3,
        description: "For individuals and small teams",
    },
    {
        name: "Premium",
        price: 5,
        transactions: 5,
        description: "For growing businesses",
    },
    {
        name: "Gold",
        price: 10,
        transactions: 10,
        description: "For medium-sized enterprises",
    },
    {
        name: "Platinum",
        price: 50,
        transactions: 20,
        description: "For large corporations",
    },
];

// Mock user data
const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    walletAddress: "7X3csFvLWbmLhRkuib9bFjDCtYTKD6TGcfepd8NJ8JYx",
    currentPlan: plans[1], // Premium plan
    subscriptionDate: new Date("2023-05-01"),
    transactions: [
        {
            date: "2023-05-15",
            signature:
                "5KtPn3MZCrTKBVHbNPx3RexB9QzFtgbpTLqgJTbVrbwZBFzZ7jMHKnhqLNFGZGa6qegDrpiKfJmwEjV7CHsvSGEW",
        },
        {
            date: "2023-05-20",
            signature:
                "2vkPzBdX9Z1XGJ5Q5JZFvYcjf8JnY7z6qX1KZ7QHzBXZBvYcjf8JnY7z6qX1KZ7QHzBXZ",
        },
    ],
    usedTransactions: 3,
};

export default function SubscribedManagement() {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSelectPlan = (plan: Plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
        setIsModalOpen(false);
        router.push("/send-transaction");
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {/* <h1 className="text-4xl font-bold text-center mb-10 text-black">
                Subscription Management
            </h1> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Current Subscription */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Your Current Subscription
                        </CardTitle>
                        <CardDescription>
                            Manage your active plan
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-bold">
                                    {user.currentPlan.name} Plan
                                </p>
                                <p className="text-xl text-muted-foreground">
                                    {user.currentPlan.price} SOL per month
                                </p>
                            </div>
                            <CreditCard className="h-12 w-12 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Bulk Transactions</span>
                                <span className="font-semibold">
                                    {user.usedTransactions} /{" "}
                                    {user.currentPlan.transactions}
                                </span>
                            </div>
                            <Progress
                                value={
                                    (user.usedTransactions /
                                        user.currentPlan.transactions) *
                                    100
                                }
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Subscribed since:{" "}
                            {user.subscriptionDate.toLocaleDateString()}
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            Manage Subscription
                        </Button>
                    </CardFooter>
                </Card>

                {/* Upgrade Options */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Upgrade Your Plan
                        </CardTitle>
                        <CardDescription>
                            Explore enhanced features and capabilities
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {plans
                                .slice(plans.indexOf(user.currentPlan) + 1)
                                .map((plan) => (
                                    <div
                                        key={plan.name}
                                        className="flex justify-between items-center p-4 bg-secondary rounded-lg"
                                    >
                                        <div>
                                            <p className="font-semibold text-lg">
                                                {plan.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {plan.price} SOL/month
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() =>
                                                handleSelectPlan(plan)
                                            }
                                        >
                                            Upgrade{" "}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Billing Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Billing Details</CardTitle>
                    <CardDescription>
                        Your account and transaction information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger
                                value="account"
                                className="data-[state=active]:bg-white data-[state=active]:text-black"
                            >
                                Account Info
                            </TabsTrigger>
                            <TabsTrigger
                                value="transactions"
                                className="data-[state=active]:bg-white data-[state=active]:text-black"
                            >
                                Transactions
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <div className="space-y-4 mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Name
                                        </p>
                                        <p className="text-lg">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Email
                                        </p>
                                        <p className="text-lg">{user.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Wallet Address
                                    </p>
                                    <p className="text-lg font-mono">
                                        {user.walletAddress}
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="transactions">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Signature</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {user.transactions.map((tx, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{tx.date}</TableCell>
                                                <TableCell className="font-mono text-sm">
                                                    {tx.signature.slice(0, 8)}
                                                    ...{tx.signature.slice(-8)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Plan Upgrade</DialogTitle>
                        <DialogDescription>
                            You are about to upgrade to the following plan:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <h3 className="text-lg font-semibold">
                            {selectedPlan?.name} Plan
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {selectedPlan?.price} SOL per month
                        </p>
                        <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                                <BarChart className="h-5 w-5 mr-2 text-primary" />
                                Up to {selectedPlan?.transactions} bulk
                                transactions
                            </li>
                            <li className="flex items-center">
                                <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                                Enhanced analytics and reporting
                            </li>
                            <li className="flex items-center">
                                <Zap className="h-5 w-5 mr-2 text-primary" />
                                Priority customer support
                            </li>
                        </ul>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing */}
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
                                </>
                            ) : (
                                "Confirm Upgrade"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
