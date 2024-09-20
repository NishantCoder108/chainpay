import { AdminUser } from "@/models/user";
import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        user: {
            userId: string;
        } & DefaultSession["user"];
    }
}
const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID ?? "errorId",
            clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "secret",
        }),
    ],
    secret: process.env.SESSION_SECRET ?? "secret",

    callbacks: {
        async signIn(params) {
            console.log({ params });
            if (!params.user.email) {
                return false;
            }
            try {
                const { email, name } = params.user;
                const existingUser = await AdminUser.findOne({ email });

                if (existingUser) {
                    return true;
                }

                const newUser = new AdminUser({
                    name,
                    email,
                    provider: "Google",
                    admin: true,
                });

                await newUser.save();
                return true;
            } catch (error) {
                console.log("Login Error:", error);

                return false;
            }
        },

        async session({ session }) {
            const dbUser = await AdminUser.findOne({
                email: session.user.email,
            });
            console.log({ dbUser });
            if (!dbUser) {
                return session;
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    userId: dbUser._id,
                },
            };
        },

        async redirect({ url, baseUrl }) {
            console.log({ url });
            console.log({ baseUrl });
            const redirectedUrl = baseUrl + "/v1/dashboard";
            return redirectedUrl;
        },
    },
});

export { handler as GET, handler as POST };
