import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGO_URI environment variable inside .env.local"
    );
}

interface Cached {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}
const cached = (globalThis.mongoose as Cached) || { conn: null, promise: null };
async function dbConnect(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongooseInstance) => {
                console.log("Connected to MongoDB");
                return mongooseInstance;
            })
            .catch((error) => {
                console.error("Failed to connect to MongoDB", error);
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error("Database connection error", error);
        throw error;
    }

    return cached.conn;
}

export default dbConnect;
