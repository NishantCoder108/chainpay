"use client";
import RecipientManagement from "@/components/transaction/RecipientManagement";
import TrasactionDashboard from "@/components/Transactions";
import React from "react";

const SendTransactionDashboard = () => {
    return (
        <div>
            {/* <TrasactionDashboard /> */}
            <RecipientManagement />
        </div>
    );
};

export default SendTransactionDashboard;
