import mongoose, { Connection } from "mongoose";

const uri: string =
    process.env.MONGO_URI || "mongodb://localhost:27017/chainpayDb";

let cachedConnection: Connection | null = null;

const connectDB = async (): Promise<Connection> => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const connection = await mongoose.connect(uri);

        console.log("MongoDB connected successfully");
        cachedConnection = connection.connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }

    return cachedConnection as Connection;
};

export default connectDB;
