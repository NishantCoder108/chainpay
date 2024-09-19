import { ITransaction, Transactions } from "@/models/transaction";
import { AdminUser } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        console.log({ reqData });
        const {
            userId,
            signature,
            amount,
            walletAddress,
            email,
            name,
            country,
        } = reqData;

        const transactionData = {
            name,
            email,
            walletAddress,
            country,
            amount,
            signature,
        } as ITransaction;

        const adminUser = await AdminUser.findById({ _id: userId });
        console.log({ adminUser });

        const newTransaction = await Transactions.create(transactionData);
        adminUser.transactions.push(newTransaction._id);

        await adminUser.save();

        return NextResponse.json(
            {
                message: `Transaction has been sent successfully`,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log({ error });

        const message = (error as Error).message;

        return NextResponse.json(
            {
                message: message,
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get("userId");
        if (!userId) {
            throw new Error("User Id is not found");
        }

        const adminUser = await AdminUser.findById({ _id: userId })
            .populate("plan")
            .populate("transactions")
            .exec();

        console.log("Get Admin User :", adminUser);
        if (!adminUser) {
            throw new Error(`AdminUser not found`);
        }

        return NextResponse.json(
            {
                data: adminUser.transactions,
                plan: adminUser.plan,
            },
            { status: 200 }
        );
    } catch (error) {
        const err = (error as Error).message;
        console.log({ error });
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
