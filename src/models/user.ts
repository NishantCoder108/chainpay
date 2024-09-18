import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Transactions } from "./transaction";
import { Plan } from "./billing";

const RecipientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        walletAddress: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Recipient =
    mongoose.models.Recipient || mongoose.model("Recipient", RecipientSchema);

const AdminUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            requred: true,
            unique: true,
        },
        provider: {
            type: String,
            required: true,
            enum: ["Google", "ByAdding"],
        },
        country: { type: String, default: null },
        admin: {
            type: Boolean,
            default: false,
        },

        recipients: [
            {
                type: Schema.Types.ObjectId,
                ref: Recipient,
            },
        ],
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: Transactions,
            },
        ],
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Plan,
            default: null,
        },
        billing: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: Plan,
            },
        ],
        walletAddress: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const AdminUser =
    mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

export { Recipient, AdminUser };
