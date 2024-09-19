"use client";

import { useContext, useState } from "react";
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
import { motion } from "framer-motion";
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
    CreditCard,
    ExternalLinkIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BalanceContext } from "@/contexts/BalanceContext";
import { useSession } from "next-auth/react";
import { Plan } from "@/app/v1/billing/page";
import { toast } from "sonner";
import { IBillingPlan } from "@/types/user";
import Link from "next/link";
import { formatDate } from "date-fns";
import { containerVariants, itemVariants } from "@/lib/utils";

const toPublicAddress = process.env.NEXT_PUBLIC_TO_WALLET_ADDRESS;

interface IProps {
    plans: Plan[];
    billingData: IBillingPlan;
}
export default function BillingManagement({ plans, billingData }: IProps) {
    const [selectedPlan, setSelectedPlan] = useState<Plan>({
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
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const wallet = useWallet();
    const { connection } = useConnection();
    const context = useContext(BalanceContext);
    const { updateBalance } = context;
    const { data: session } = useSession();
    const [isManagingSubs, setIsManagingSubs] = useState<boolean>(false);

    const handleSelectPlan = (plan: Plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);

        console.log("Selected Plan", plan);
    };

    const handleConfirm = async () => {
        setIsLoading(true);

        try {
            if (!wallet.publicKey) throw new Error("Public key is missing");
            if (!toPublicAddress)
                throw new Error("To Public Address is not valid.");
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey as PublicKey,
                    toPubkey: new PublicKey(toPublicAddress),
                    lamports: selectedPlan.price * LAMPORTS_PER_SOL,
                })
            );

            const { blockhash, lastValidBlockHeight } =
                await connection.getLatestBlockhash();

            transaction.recentBlockhash = blockhash;
            transaction.feePayer = wallet.publicKey;

            console.log({ transaction });
            const signature = await wallet.sendTransaction(
                transaction,
                connection
            );

            console.log({ signature });
            const confirmTrans = await connection.confirmTransaction(
                { signature, blockhash, lastValidBlockHeight },
                "processed"
            );

            console.log({ confirmTrans });

            // Saving to db
            const selectedPlanDetails = {
                userId: session?.user.userId,
                signature,
                ...selectedPlan,
            };
            const response = await fetch("/api/v1/billing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedPlanDetails),
            });

            console.log("Billing Res ", response);

            if (!response.ok) {
                throw new Error("Saving Plan details in Database failed.");
            }
            toast.success("Payment successful! Thank you for your purchase.");
            setIsManagingSubs(false);
            updateBalance();
            setIsLoading(false);
            setIsModalOpen(false);
            router.push("/v1/send-transaction");
        } catch (error) {
            console.log({ error });
            toast.error("Payment failed! Please try again or contact support.");
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    console.log("Billing Data", billingData);
    console.log("Plans Data", plans);
    console.log({ isManagingSubs });
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
        >
            {Object.keys(billingData).length !== 0 && !isManagingSubs ? (
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12 "
                >
                    (
                    <Card className={`${billingData.planDetails.color}`}>
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
                                        {billingData.planDetails.name} Plan
                                    </p>
                                    <p className="text-xl text-muted-foreground">
                                        {billingData.planDetails.price} SOL per
                                        month
                                    </p>
                                </div>
                                <CreditCard className="h-12 w-12 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Subscribed since:{" "}
                                {formatDate(
                                    billingData.planDetails.createdAt,
                                    "PPpp"
                                )}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full bg-slate-50"
                                onClick={() => setIsManagingSubs(true)}
                            >
                                Manage Subscription
                            </Button>
                        </CardFooter>
                    </Card>
                    )
                </motion.div>
            ) : (
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-8 text-center"
                >
                    <h1 className="text-4xl font-bold text-center mb-10 text-black">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl mb-4 text-black">
                        You are not currently subscribed to any plan.
                    </p>
                    <p className="text-muted-foreground">
                        Choose a plan below to get started with our services.
                    </p>
                </motion.div>
            )}

            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            >
                {(isManagingSubs || Object.keys(billingData).length === 0) &&
                    plans.map((plan) => (
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
                                        plan.name === "Gold"
                                            ? "default"
                                            : "outline"
                                    }
                                    disabled={
                                        (Object.keys(billingData).length > 0 &&
                                            billingData.planDetails.name ===
                                                plan.name) ||
                                        plan.name === "Basic"
                                    }
                                >
                                    {Object.keys(billingData).length > 0 &&
                                    billingData.planDetails.name === plan.name
                                        ? "Current Plan"
                                        : "Select Plan"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
            </motion.div>

            {Object.keys(billingData).length !== 0 && !isManagingSubs && (
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
                                            <p className="text-lg">
                                                {billingData.userDetails.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Email
                                            </p>
                                            <p className="text-lg">
                                                {billingData.userDetails.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Wallet Address
                                        </p>
                                        <p className="text-lg font-mono">
                                            {wallet.publicKey &&
                                                wallet.publicKey?.toBase58()}
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="transactions">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    Subscription Plan
                                                </TableHead>
                                                <TableHead className="">
                                                    <p> CreatedAt </p>
                                                </TableHead>
                                                <TableHead className="">
                                                    <p>Signature </p>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {billingData.userDetails.transactions.map(
                                                (tx, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-bold">
                                                            {tx.name}
                                                        </TableCell>
                                                        <TableCell className="">
                                                            {formatDate(
                                                                tx.createdAt,
                                                                "PPpp"
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="font-mono text-sm">
                                                            <Link
                                                                href={`https://explorer.solana.com/tx/${tx.signature}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                                                            >
                                                                {tx.signature.slice(
                                                                    0,
                                                                    12
                                                                )}
                                                                ...
                                                                {tx.signature.slice(
                                                                    -12
                                                                )}
                                                                <ExternalLinkIcon
                                                                    size={12}
                                                                />
                                                            </Link>
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
                <DialogContent
                    className={`sm:max-w-[425px] ${selectedPlan.color} text-black`}
                >
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
        </motion.div>
    );
}
