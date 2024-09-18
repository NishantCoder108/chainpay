"use client";
import ChainpayDashboard from "@/components/ChainpayDashboard";
import { IUserDashboardDetails } from "@/types/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [data, setData] = useState<IUserDashboardDetails>(
        {} as IUserDashboardDetails
    );
    const [dataError, setDataError] = useState("");
    const { data: session } = useSession();
    const fetchData = async () => {
        try {
            const res = await fetch(
                `/api/v1/dashboard?userId=${session?.user.userId}`
            );

            if (!res.ok) throw new Error("Failed to fetch data.");
            const result = await res.json();
            setData(result.data);
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

    return <ChainpayDashboard dataError={dataError} dashboardDetails={data} />;
};

export default Dashboard;
