import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    ArrowRight,
    MessageSquareShare,
} from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">ChainPay</h3>
                        <p className="text-sm text-gray-600">
                            Revolutionizing blockchain payments for businesses
                            and individuals.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="https://twitter.com/nishanttechie"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" size="icon">
                                    <Twitter className="h-4 w-4" />
                                    <span className="sr-only">Twitter</span>
                                </Button>
                            </Link>
                            <Button variant="outline" size="icon">
                                <Facebook className="h-4 w-4" />
                                <span className="sr-only">Facebook</span>
                            </Button>
                            <Button variant="outline" size="icon">
                                <Instagram className="h-4 w-4" />
                                <span className="sr-only">Instagram</span>
                            </Button>
                            <Button variant="outline" size="icon">
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:underline">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold  mb-4">
                            Newsletter
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Stay updated with our latest news and offers.
                        </p>
                        <div className="flex space-x-2 border border-black justify-between rounded">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="max-w-[200px]"
                            />
                            <Button variant="default" className="rounded ">
                                Subscribe
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                    <p>&copy; 2024 ChainPay. All rights reserved.</p>
                    <Link href={"https://x.com/NishantTechie"}>
                        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                            <MessageSquareShare className="h-4 w-4" />
                            <span>https://x.com/NishantTechie</span>
                        </div>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
