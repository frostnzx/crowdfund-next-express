import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">GoFundMePlease</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/" className="hover:text-gray-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/auth/signin"
                                    className="hover:text-gray-400"
                                >
                                    Sign-in
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/auth/profile"
                                    className="hover:text-gray-400"
                                >
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
