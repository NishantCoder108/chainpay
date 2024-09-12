import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";

const Dashboard = () => {
    return (
        <div className="px-8 py-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <Button className="px-4 py-2">Send Transaction</Button>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6">
                    <h3 className="text-lg font-bold">
                        Weekly Contributed Transactions
                    </h3>
                    <p className="mt-2 text-xl">120 SOL</p>
                    <div className="flex items-center justify-between mt-4">
                        <p>20% of platform total</p>
                        <Button
                            variant="outline"
                            className="text-white border-white"
                        >
                            <Link href={"/v1/dashboard"}>Send More</Link>
                        </Button>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6">
                    <h3 className="text-lg font-bold">
                        Daily Contributed Transactions
                    </h3>
                    <p className="mt-2 text-xl">30 SOL</p>
                    <div className="flex items-center justify-between mt-4">
                        <p>5% of platform total</p>
                        <Button
                            variant="outline"
                            className="text-white border-white"
                        >
                            <Link href={"/v1/dashboard"}>Send More</Link>{" "}
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Dashboard;
