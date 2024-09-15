"use client";
import ChainpayDashboard from "@/components/ChainpayDashboard";
import { IUserDashboardDetails } from "@/types/user";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [data, setData] = useState<IUserDashboardDetails>(
        {} as IUserDashboardDetails
    );
    const [dataError, setDataError] = useState("");

    const fetchData = async () => {
        try {
            const res = await fetch("/api/v1/dashboard");

            if (!res.ok) throw new Error("Failed to fetch data.");
            const result = await res.json();
            setData(result);
        } catch (error) {
            console.log({ error });
            setDataError((error as Error).message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log({ data });
    console.log({ dataError });
    return (
        <div>
            <ChainpayDashboard dataError={dataError} dashboardDetails={data} />
        </div>
    );
};

export default Dashboard;
