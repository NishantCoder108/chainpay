import { AdminUser } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get("userId");

        if (!userId) throw new Error("User Id is not found");

        const adminUser = await AdminUser.findById({ _id: userId })
            .populate({
                path: "transactions",

                options: {
                    sort: {
                        createdAt: -1,
                    },

                    limit: 10,
                },
            })
            .exec();

        console.log("GET Admin User:", adminUser);

        if (!adminUser) throw new Error("AdminUser not found");

        const data = {
            totalUsers: adminUser.recipients.length,
            totalTransactions: adminUser.transactions.length,
            incrementByWeek: "+20.1% from last week",
            incrementByMonth: "+20.1% from last month",
            latestTransactions: adminUser.transactions,
        };

        return NextResponse.json(
            {
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        const err = (error as Error).message;
        console.log({ error });

        return NextResponse.json({ error: err }, { status: 500 });
    }
}
