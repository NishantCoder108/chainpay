import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn(params) {
            console.log({ params });
            if (params.user.email) {
                return true;
            }

            return false;
        },
        async redirect({ url, baseUrl }) {
            console.log({ url });
            console.log({ baseUrl });
            const redirectedUrl = baseUrl + "/v1/dashboard";
            return redirectedUrl;
        },
    },
});
