"use client";

import React, { useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ThemeToggleButton } from "@/components/ui/skiper26";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    // Login State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Skiper UI State
    const [blur, setBlur] = useState<boolean>(false);
    const [gifType, setGifType] = useState<"1" | "2" | "3" | "custom">("1");
    const [gifUrl, setGifUrl] = useState<string>(
        "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"
    );

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError("Incorrect credentials");
            } else {
                router.push("/admin");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4 md:p-8">

            {/* 1. Login Card with Border Beam */}
            <div className="relative dark:bg-[#171717] w-full max-w-sm md:max-w-md rounded-xl border border-border bg-card/50 px-8 py-12 shadow-2xl backdrop-blur-md">

                {/* The Border Beam Effect */}
                <BorderBeam size={300} duration={12} delay={9} />

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                    {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-foreground"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                            className="flex h-10 w-full rounded-md border dark:bg-[#141414] border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-foreground"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="flex h-10 w-full rounded-md border dark:bg-[#141414] border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <Button
                        variant="default"
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-xs text-muted-foreground">
                    <p>
                        By clicking continue, you agree to our{" "}
                        <a href="#" className="underline hover:text-primary">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-primary">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            {/* 2. Skiper UI Controls */}
            {/* Positioned nicely around the login form */}

            <div className="mt-10 flex flex-col items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground/50">
                    Switch Theme
                </span>
                <ThemeToggleButton
                    variant={'circle'}
                    start={'center'}
                    blur={blur}
                    gifUrl={gifUrl}
                />
            </div>

        </div>
    );
}