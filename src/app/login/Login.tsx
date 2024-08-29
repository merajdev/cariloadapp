"use client";

import React, { useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (user.email && user.password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("Sending login request...");
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            if (response.data.success) {
                router.push("/owner-dashboard"); // Ensure this route exists
            } else {
                console.log("Login failed:", response.data.error);
            }
        } catch (err: any) {
            console.log("Login error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full h-[90vh] justify-center items-center">
            <div className="max-w-md w-full h-min rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
                <h2 className="font-bold text-xl text-neutral-800">
                    Welcome to CariLoad
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2">
                    Login to CariLoad if you can because we don&apos;t have a login flow
                    yet

                </p>
                <Link href="/signup">
                    Signup if you do not have an account
                </Link>

                <form onSubmit={onLogin} className="my-8">
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="meraj@gmail.com"
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                    </LabelInputContainer>

                    <button
                        type="submit"
                        disabled={buttonDisabled || loading}
                        className="relative group/btn flex space-x-2 items-center justify-center px-4 py-2 w-full text-black rounded-md font-medium shadow-input bg-gray-50"
                    >
                        {loading ? "Logging in..." : buttonDisabled ? "Fill all fields" : "Login"}
                        <BottomGradient />
                    </button>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
