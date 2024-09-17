"use client";
import TransactionHistory from "@/components/paymentHistory/TransactionHistory";
import { ITransaction } from "@/models/transaction";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PaymentHistory = () => {
    const [transactionData, setTransactionData] = useState<ITransaction[]>([]);
    const { data: session } = useSession();
    const fetchTransactionData = async () => {
        try {
            const res = await fetch(
                `/api/v1/transaction?userId=${session?.user.userId}`
            );

            if (!res.ok) throw new Error("Failed to fetch transaction data.");

            const result = await res.json();
            setTransactionData(result);
        } catch (error) {
            console.error("Fetch Transaction Error :", error);
        }
    };

    useEffect(() => {
        fetchTransactionData();
    }, []);

    console.log({ transactionData });
    return (
        <div>
            <TransactionHistory />
        </div>
    );
};

export default PaymentHistory;
