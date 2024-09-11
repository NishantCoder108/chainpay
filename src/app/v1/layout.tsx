import AppLayout from "@/components/Layout";
import React from "react";

const Homepage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <AppLayout>{children}</AppLayout>
        </div>
    );
};

export default Homepage;
