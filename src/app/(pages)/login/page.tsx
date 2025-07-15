"use client"
import GoogleSignIn from "@/components/GoogleSignIn"
import Image from "next/image";
import Logo from "../../../../public/logo.png"
import useAuth from "../../../../hooks/useAuth";
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { getBetterErrorMessages } from "../../../../utils/betterErrorMessages";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // redirects user to dashboard if they are logged in
    useAuth();

    const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            const auth = getAuth();
            await setPersistence(auth, browserLocalPersistence)
            await signInWithEmailAndPassword(auth, email, password)
                .catch((error) => {
                    const errorCode = error.code;
                    const betterErrorMessage = getBetterErrorMessages(errorCode);
                    setError(betterErrorMessage);
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex h-screen min-h-full flex-col justify-center pt-24 px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image className="mx-auto h-10 w-auto rounded-full"
                    src={Logo}
                    alt="Memodash logo"
                    height={48}
                    width={48}
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleClick}>
                    <div>
                        {
                            error && (
                                <div className="flex justify-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">{error}</span>
                                </div>
                            )}
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white-900">Email address</label>
                        <div className="mt-2">
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        <GoogleSignIn />
                    </div>
                </form>
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Don&apos;t have an account?
                    <a href="/register" className="font-semibold text-indigo-600 px-1.5 hover:text-indigo-500">Register</a>
                </p>
            </div>
        </div>
    )
}