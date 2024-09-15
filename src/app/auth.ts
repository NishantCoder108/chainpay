import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import User from "@/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn(params) {
            console.log({ params });
            if (!params.user.email) {
                return false;
            }
            try {
                const { email, name } = params.user;
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                    return true;
                }

                const newUser = new User({
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
            const dbUser = await User.findOne({ email: session.user.email });
            console.log({ dbUser });
            if (!dbUser) {
                return session;
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    id: dbUser._id,
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
