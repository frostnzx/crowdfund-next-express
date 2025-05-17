"use client";
import { useEffect } from "react";
import Link from "next/link";
import axios from "@/config/axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

export default function Header() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
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
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link
                                        href="/auth/profile"
                                        className="hover:text-gray-400"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/auth/signout"
                                        className="hover:text-gray-400"
                                    >
                                        Sign-out
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    href="/auth/signin"
                                    className="hover:text-gray-400"
                                >
                                    Sign-in
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
