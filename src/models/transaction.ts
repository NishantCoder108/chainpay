import mongoose from "mongoose";

export interface ITransaction extends Document {
    signature: string;
    amount: number;
    walletAddress: string[];
    email: string[];
    name: string[];
    country: string[];
    createdAt?: Date;
}

const TransactionSchema = new mongoose.Schema(
    {
        walletAddress: {
            type: [String],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        signature: {
            type: String,
            required: true,
        },
        email: {
            type: [String],
            required: true,
        },
        name: {
            type: [String],
            required: true,
        },
        country: {
            type: [String],
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Transactions =
    mongoose.models.Transactions ||
    mongoose.model("Transactions", TransactionSchema);

export { Transactions };
