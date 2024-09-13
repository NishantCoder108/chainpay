import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "@/components/common/SessionProvider";

const robotoRegular = localFont({
    src: "./fonts/Roboto-Regular.ttf",
});

export const metadata: Metadata = {
    title: "ChainPay",
    description: "Send Multiple Transaction with Single Click.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionWrapper>
            <html lang="en">
                <body className={`${robotoRegular.className} antialiased`}>
                    {children}
                </body>
            </html>
        </SessionWrapper>
    );
}
