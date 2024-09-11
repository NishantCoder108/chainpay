import { useState } from "react";
import { motion } from "framer-motion";
import { HistoryIcon, HomeIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Toggle } from "./ui/toggle";
// import {
//     HomeIcon,
//     UserIcon,
//     HistoryIcon,
//     LogoutIcon,
//     SwitchHorizontalIcon,
// } from "@heroicons/react/solid";
// import { Button, Toggle } from "@/components/ui"; // Assuming you have these components

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [network, setNetwork] = useState("devnet");

    return (
        <motion.div
            className={`h-screen bg-gray-900 text-white flex flex-col ${
                isExpanded ? "w-64" : "w-20"
            } transition-all duration-300`}
            initial={{ width: 0 }}
            animate={{ width: isExpanded ? 256 : 80 }}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4">
                <h2
                    className={`${isExpanded ? "text-lg font-bold" : "hidden"}`}
                >
                    My Platform
                </h2>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-400"
                >
                    {/* <SwitchHorizontalIcon className="w-6 h-6" /> */}Icon
                </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex flex-col mt-4 space-y-2">
                <SidebarItem
                    icon={<HomeIcon className="w-6 h-6" />}
                    label="Dashboard"
                    isExpanded={isExpanded}
                />
                <SidebarItem
                    icon={<HistoryIcon className="w-6 h-6" />}
                    label="Transaction History"
                    isExpanded={isExpanded}
                />
                <SidebarItem
                    icon={<UserIcon className="w-6 h-6" />}
                    label="User Management"
                    isExpanded={isExpanded}
                />
                <SidebarItem
                    icon={<LogOutIcon className="w-6 h-6" />}
                    label="Logout"
                    isExpanded={isExpanded}
                />
            </nav>

            {/* Network Switch */}
            <div className="mt-auto mb-4 p-4">
                {isExpanded && <p className="mb-2">Network</p>}
                <Toggle
                    defaultChecked={network === "mainnet"}
                    onChange={() =>
                        setNetwork(network === "devnet" ? "mainnet" : "devnet")
                    }
                >
                    {network === "devnet" ? "Devnet" : "Mainnet"}
                </Toggle>
            </div>
        </motion.div>
    );
};

const SidebarItem = ({
    icon,
    label,
    isExpanded,
}: {
    icon: React.ReactNode;
    label: string;
    isExpanded: boolean;
}) => {
    return (
        <motion.div
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-800 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {icon}
            <span className={`ml-4 ${isExpanded ? "block" : "hidden"}`}>
                {label}
            </span>
        </motion.div>
    );
};

export default Sidebar;
