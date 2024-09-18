"use client";
import TransactionHistory from "@/components/paymentHistory/TransactionHistory";
import { IUserTransaction } from "@/types/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PaymentHistory = () => {
    const [transactionData, setTransactionData] = useState<IUserTransaction[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);

    const { data: session } = useSession();
    const fetchTransactionData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `/api/v1/transaction?userId=${session?.user.userId}`
            );

            if (!res.ok) throw new Error("Failed to fetch transaction data.");

            const result = await res.json();
            setTransactionData(result.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Fetch Transaction Error :", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactionData();
    }, []);

    console.log({ transactionData });
    return (
        <div>
            <TransactionHistory
                transactions={transactionData}
                isLoading={isLoading}
            />
        </div>
    );
};

export default PaymentHistory;
