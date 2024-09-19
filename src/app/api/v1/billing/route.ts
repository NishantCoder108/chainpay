import { Plan } from "@/models/billing";
import { AdminUser } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

type Plan = {
    name: string;
    price: number;
    transactions: number;
    description: string;
    features: string[];
    color: string;
    userId: string;
    signature: string;
};

export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        console.log({ reqData });

        const {
            name,
            price,
            transactions,
            description,
            features,
            color,
            userId,
            signature,
        } = reqData as Plan;

        if (
            !name ||
            !userId ||
            !price ||
            !transactions ||
            !description ||
            !features ||
            !color ||
            !signature
        )
            throw new Error("All fields required.");

        const billingDetails = {
            name,
            price,
            transactions,
            description,
            features,
            color,
            signature,
        };

        const adminUser = await AdminUser.findById({ _id: userId });

        console.log({ adminUser });

        if (!adminUser) throw new Error("No user found");

        const newBilling = await Plan.create(billingDetails);

        console.log({ newBilling });
        adminUser.plan = newBilling._id;
        adminUser.billing.push(newBilling._id);

        await adminUser.save();

        return NextResponse.json(
            {
                message: "Billing details added successfully",
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

        if (!userId) throw new Error("User id is not found");

        const userWithPlan = await AdminUser.findById({ _id: userId })
            .populate("billing")
            .populate("plan")
            .exec();

        if (!userWithPlan) throw new Error("User not found");

        return NextResponse.json(
            {
                planDetails: userWithPlan.plan,
                userDetails: {
                    name: userWithPlan.name,
                    email: userWithPlan.email,
                    walletAddress: userWithPlan.walletAddress,
                    transactions: userWithPlan.billing,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.log({ error });

        return NextResponse.json({ error }, { status: 500 });
    }
}
