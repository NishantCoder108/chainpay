import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            enum: ["Basic", "Silver", "Gold", "Platinum"],
        },
        price: {
            type: Number,
            required: true,
        },
        transactions: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        features: {
            type: [String],
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        signature: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

export { Plan };
