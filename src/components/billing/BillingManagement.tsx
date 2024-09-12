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
    Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Plan = {
    name: string;
    price: number;
    transactions: number;
    description: string;
    features: string[];
    color: string;
};

const plans: Plan[] = [
    {
        name: "Basic",
        price: 0,
        transactions: 3,
        description: "For individuals and small teams",
        features: [
            "Up to 3 bulk transactions",
            "Basic analytics",
            "Email support",
        ],
        color: "bg-gray-100",
    },
    {
        name: "Silver",
        price: 5,
        transactions: 5,
        description: "For growing businesses",
        features: [
            "Up to 5 bulk transactions",
            "Advanced analytics",
            "Priority email support",
        ],
        color: "bg-gray-200",
    },
    {
        name: "Gold",
        price: 10,
        transactions: 10,
        description: "For medium-sized enterprises",
        features: [
            "Up to 10 bulk transactions",
            "Premium analytics",
            "24/7 phone support",
        ],
        color: "bg-yellow-100",
    },
    {
        name: "Platinum",
        price: 50,
        transactions: 20,
        description: "For large corporations",
        features: [
            "Up to 20 bulk transactions",
            "Custom analytics",
            "Dedicated account manager",
        ],
        color: "bg-blue-100",
    },
];

// Mock user data - set to null for non-subscribed user
const user = null;
// Uncomment below for subscribed user
// const user = {
//   name: "John Doe",
//   email: "john.doe@example.com",
//   walletAddress: "7X3csFvLWbmLhRkuib9bFjDCtYTKD6TGcfepd8NJ8JYx",
//   currentPlan: plans[1], // Silver plan
//   subscriptionDate: new Date("2023-05-01"),
//   transactions: [
//     { date: "2023-05-15", signature: "5KtPn3MZCrTKBVHbNPx3RexB9QzFtgbpTLqgJTbVrbwZBFzZ7jMHKnhqLNFGZGa6qegDrpiKfJmwEjV7CHsvSGEW" },
//     { date: "2023-05-20", signature: "2vkPzBdX9Z1XGJ5Q5JZFvYcjf8JnY7z6qX1KZ7QHzBXZBvYcjf8JnY7z6qX1KZ7QHzBXZ" },
//   ],
//   usedTransactions: 3
// }

export default function BillingManagement() {
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
        router.push("/v1/send-transaction");
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-10 text-black">
                Choose Your Plan
            </h1>

            {user ? (
                <div className="mb-12">
                    <Card>
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
                </div>
            ) : (
                <div className="mb-8 text-center">
                    <p className="text-xl mb-4 text-black">
                        You are not currently subscribed to any plan.
                    </p>
                    <p className="text-muted-foreground">
                        Choose a plan below to get started with our services.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative overflow-hidden ${plan.color}`}
                    >
                        {plan.name === "Gold" && (
                            <Badge className="absolute top-2 right-2 bg-yellow-500">
                                Popular
                            </Badge>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                {plan.name}
                            </CardTitle>
                            <CardDescription>
                                {plan.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold mb-4">
                                {plan.price} SOL
                                <span className="text-base font-normal">
                                    /month
                                </span>
                            </p>
                            <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className={
                                    plan.name === "Gold"
                                        ? "w-full"
                                        : "w-full bg-slate-100"
                                }
                                onClick={() => handleSelectPlan(plan)}
                                variant={
                                    plan.name === "Gold" ? "default" : "outline"
                                }
                            >
                                {user && user.currentPlan.name === plan.name
                                    ? "Current Plan"
                                    : "Select Plan"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {user && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Billing Details
                        </CardTitle>
                        <CardDescription>
                            Your account and transaction information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="account">
                                    Account Info
                                </TabsTrigger>
                                <TabsTrigger value="transactions">
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
                                            <p className="text-lg">
                                                {user.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Email
                                            </p>
                                            <p className="text-lg">
                                                {user.email}
                                            </p>
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
                                            {user.transactions.map(
                                                (tx, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {tx.date}
                                                        </TableCell>
                                                        <TableCell className="font-mono text-sm">
                                                            {tx.signature.slice(
                                                                0,
                                                                8
                                                            )}
                                                            ...
                                                            {tx.signature.slice(
                                                                -8
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Plan Selection</DialogTitle>
                        <DialogDescription>
                            You are about to subscribe to the following plan:
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
                            {selectedPlan?.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                                    {feature}
                                </li>
                            ))}
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
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing
                                </>
                            ) : (
                                "Confirm Subscription"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
