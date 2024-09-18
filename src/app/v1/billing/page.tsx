"use client";
import BillingManagement from "@/components/billing/BillingManagement";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export type Plan = {
    name: string;
    price: number;
    transactions: number;
    description: string;
    features: string[];
    color: string;
    createdAt?: string;
};
const BillingDashboard = () => {
    const [billingData, setBillingData] = useState<Plan>({} as Plan);
    const { data: session } = useSession();

    const fetchData = async () => {
        try {
            const res = await fetch(
                `/api/v1/billing?userId${session?.user.userId}`
            );

            if (!res.ok) throw new Error("Failed to fetch data.");
            const resData = await res.json();
            setBillingData(resData.data);
        } catch (error) {
            console.log({ error });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <BillingManagement plans={plans} billingData={billingData} />
        </div>
    );
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

export default BillingDashboard;
