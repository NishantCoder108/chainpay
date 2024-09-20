import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "@/components/common/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

const robotoRegular = localFont({
    src: "./fonts/Roboto-Regular.ttf",
});

export const metadata: Metadata = {
    title: "ChainPay | Simplified Bulk Transactions",
    description:
        "Send multiple Solana transactions with just a single click. ChainPay is the easiest way to manage and process bulk payments securely and efficiently.",
    keywords:
        "ChainPay, Solana, Blockchain, Bulk Transactions, Crypto Payments, Secure Payments, Web3 Payments",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    themeColor: "#000000",
    applicationName: "ChainPay",
    robots: "index, follow",
    openGraph: {
        title: "ChainPay | Simplified Bulk Transactions",
        description:
            "Send multiple Solana transactions with a single click. Efficiently manage and process secure payments on the blockchain.",
        url: "https://chainpay.nishantcoder.com",
        siteName: "ChainPay",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "ChainPay - Bulk Transactions Simplified",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@NishantTechie",
        title: "ChainPay | Simplified Bulk Transactions",
        description:
            "Send multiple Solana transactions with a single click on ChainPay. Efficient, secure, and easy.",
        images: ["/images/twitter-image.jpg"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
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
                    <Toaster className="z-50" />
                </body>
            </html>
        </SessionWrapper>
    );
}
