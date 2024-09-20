import { isValidSolanaAddress } from "@/lib/wallet/verifyWalletAddress";
import { AdminUser, Recipient } from "@/models/user";
import { IRecipient } from "@/types/user";
import { isObjectIdOrHexString, Mongoose } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        console.log({ reqData });
        const { name, email, walletAddress, country, userId } = reqData;

        const isValidAddress = isValidSolanaAddress(walletAddress);
        if (!isValidAddress) {
            throw new Error("Wallet Address is not valid");
        }

        const recipientData = {
            name,
            email,
            walletAddress,
            country,
        };

        const adminUser = await AdminUser.findById({ _id: userId });
        console.log({ adminUser });

        const newRecipient = await Recipient.create(recipientData);
        adminUser.recipients.push(newRecipient._id);

        await adminUser.save();

        return NextResponse.json(
            {
                message: `Recipient ${name} added successfully`,
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

        const allUsers = await AdminUser.findById({ _id: userId })
            .populate("plan")
            .populate("recipients")
            .exec();

        if (!allUsers) {
            throw new Error(`User not found by ${userId}`);
        }

        return NextResponse.json(
            {
                data: allUsers.recipients,
                plan: allUsers.plan,
            },
            { status: 200 }
        );
    } catch (error) {
        const err = (error as Error).message;
        console.log({ error });
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
// return new Response("Something Success Testing", {
//     status: 200,

//   })

// return NextResponse.json(
//     { error: "Internal Server Error" },
//     { status: 500 }

// );
