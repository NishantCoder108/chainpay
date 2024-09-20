// global.d.ts
import mongoose from "mongoose";

interface Cached {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

declare global {
    var mongoose: Cached;
}

// To prevent issues with hot module reloading (if using Next.js or similar)
export {};
