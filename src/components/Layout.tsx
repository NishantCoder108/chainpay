"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    LayoutDashboardIcon,
    SendIcon,
    HistoryIcon,
    LogOutIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    Link as Chain,
    ScrollText,
} from "lucide-react";
import ConnectWallet from "./wallets/ConnectWallet";
import { signOut } from "next-auth/react";
import { useNetwork } from "@/contexts/NetworkContext";

const navItems = [
    { icon: LayoutDashboardIcon, label: "Dashboard", path: "/v1/dashboard" },
    { icon: SendIcon, label: "Send Transaction", path: "/v1/send-transaction" },
    {
        icon: HistoryIcon,
        label: "Payment History",
        path: "/v1/transaction-history",
    },
    {
        icon: ScrollText,
        label: "Billing",
        path: "/v1/billing",
        subPaths: [
            {
                path: "/v1/billing/subscribed",
                label: "Subscription Management",
            },
            { path: "/v1/billing/upgrade", label: "Upgrade Plan" },
        ],
    },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { network, setNetwork } = useNetwork();

    // const [network, setNetwork] = useState("devnet");

    const pathname = usePathname();

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const getNavLabel = (pathname: string) => {
        const mainItem = navItems.find((item) => item.path === pathname);

        if (mainItem) {
            return mainItem.label;
        }

        for (const item of navItems) {
            if (item.subPaths) {
                const subItem = item.subPaths.find((subPath) =>
                    pathname.startsWith(subPath.path)
                );
                if (subItem) {
                    return subItem.label;
                }
            }
        }

        return "Dashboard";
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarCollapsed(window.innerWidth <= 900);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (process.env.NODE_ENV === "production") {
        console.log = () => {};
        console.warn = () => {};
        console.error = () => {};
    }
    return (
        <div className="flex h-screen bg-gray-100  dark:bg-gray-900">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarCollapsed ? 60 : 190 }}
                className="bg-white dark:bg-gray-800 shadow-lg  z-20 flex flex-col "
            >
                <div className="flex items-center justify-between pl-4 py-4">
                    <AnimatePresence>
                        {!isSidebarCollapsed ? (
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-2xl  sm:block font-bold text-gray-800 dark:text-white"
                            >
                                <div className="flex items-center gap-2 ">
                                    <Chain className="text-base md:text-xl font-bold animate-text-fade " />

                                    <span className=" font-bold  hidden sm:block bg-gradient-to-r from-slate-400 via-slate-800 to-slate-100 bg-clip-text text-transparent animate-pulse">
                                        ChainPay
                                    </span>
                                </div>
                            </motion.h1>
                        ) : (
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-2xl  font-bold text-gray-800 dark:text-white"
                            >
                                <div className="flex items-center gap-2 ">
                                    <Chain className="text-2xl font-bold animate-text-fade" />
                                </div>
                            </motion.h1>
                        )}
                    </AnimatePresence>
                    <Button
                        className="text-black hover:bg-transparent"
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                    >
                        {isSidebarCollapsed ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </Button>
                </div>
                <nav className="flex-grow pt-6">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.path}
                            icon={<item.icon />}
                            label={item.label}
                            path={item.path}
                            isActive={pathname === item.path}
                            isCollapsed={isSidebarCollapsed}
                        />
                    ))}
                </nav>
                <div className="py-4 space-y-4 text-black md:text-base text-sm">
                    <Select value={network} onValueChange={setNetwork}>
                        <SelectTrigger
                            className={
                                isSidebarCollapsed
                                    ? "w-full"
                                    : "w-full text-sm  md:text-base"
                            }
                        >
                            <SelectValue
                                placeholder="Network"
                                className="text-sm  md:text-base"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="devnet">Devnet</SelectItem>
                            <SelectItem value="mainnet">Mainnet</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm  md:text-base"
                        onClick={() => signOut()}
                    >
                        <LogOutIcon className="sm:mr-2 h-4 w-4" />
                        {!isSidebarCollapsed && "Logout"}
                    </Button>
                </div>
            </motion.aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="bg-white  shadow-md">
                    <div className="flex justify-between  items-center p-4">
                        <h2 className="text-lg font-bold text-gray-800 ">
                            {getNavLabel(pathname)}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <ConnectWallet />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}

function NavItem({
    icon,
    label,
    path,
    isActive,
    isCollapsed,
}: {
    icon: JSX.Element;
    label: string;
    path: string;
    isActive: boolean;
    isCollapsed: boolean;
}) {
    return (
        <motion.span
            className={` text-gray-700      transition-colors duration-300 
            }`}
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
        >
            <Link href={path}>
                <div
                    className={`flex justify-start h-fit  items-center px-4 py-3 text-sm  md:text-base  ${
                        isActive ? "bg-gray-100 " : ""
                    }`}
                >
                    <span className="  w-3 md:w-4 flex">{icon}</span>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`ml-1 text-nowrap text-ellipsis `}
                                transition={{
                                    ease: "easeOut",
                                    duration: 0.1,
                                }}
                            >
                                {label}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </Link>
        </motion.span>
    );
}
