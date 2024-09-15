import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Send, Shield, Zap } from "lucide-react";
import { handleSignIn } from "@/app/actions/dashboardAction";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Bulk Transactions Reimagined
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                        Send multiple transactions to different wallet addresses
                        with just one click.
                    </p>
                    <Button
                        onClick={() => handleSignIn()}
                        size="lg"
                        className="bg-white text-black hover:bg-gray-200"
                    >
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Why Choose Our Platform?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-white">
                            <CardHeader>
                                <Zap className="h-10 w-10 text-black mb-4" />
                                <CardTitle>Lightning Fast</CardTitle>
                                <CardDescription>
                                    Process hundreds of transactions in seconds
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="bg-white">
                            <CardHeader>
                                <Shield className="h-10 w-10 text-black mb-4" />
                                <CardTitle>Secure & Reliable</CardTitle>
                                <CardDescription>
                                    Bank-grade encryption for all your
                                    transactions
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="bg-white">
                            <CardHeader>
                                <Send className="h-10 w-10 text-black mb-4" />
                                <CardTitle>Easy to Use</CardTitle>
                                <CardDescription>
                                    Intuitive interface for seamless bulk
                                    sending
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        See Our Platform in Action
                    </h2>
                    <div className="aspect-w-16 aspect-auto max-w-4xl mx-auto">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/68IcEa2BRC8"
                            title="Product Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: 1,
                                title: "Add Addresses",
                                description:
                                    "Add your list of wallet addresses",
                            },
                            {
                                step: 2,
                                title: "Set Amount",
                                description:
                                    "Specify the amount for each transaction",
                            },
                            {
                                step: 3,
                                title: "Send",
                                description:
                                    "Click once to send all transactions",
                            },
                        ].map((item) => (
                            <Card key={item.step} className="bg-gray-50">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                                        {item.step}
                                    </div>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Streamline Your Transactions?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of users who are saving time and reducing
                        errors with our bulk transaction platform.
                    </p>
                    <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gray-200"
                    >
                        Start Your Free Trial{" "}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 ChainPay. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
