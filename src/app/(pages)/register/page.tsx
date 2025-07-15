"use client"
import GoogleSignIn from "@/components/GoogleSignIn"
import Image from "next/image";
import { auth } from "../../../../utils/firebase";
import { setPersistence, browserLocalPersistence, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Logo from "../../../../public/logo.png"
import useAuth from "../../../../hooks/useAuth";

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [error, setError] = useState("")

    useAuth()

    const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            if (verifyPassword != password) {
                setError("Passwords do not match");
                return;
            }
            await setPersistence(auth, browserLocalPersistence);
            const userCreds = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCreds.user);
        } catch (error) {
            setError(String(error))
        }
    }

    return (
        <div className="flex h-screen min-h-full flex-col justify-center pt-24 px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image className="mx-auto h-10 w-auto"
                    src={Logo}
                    alt="Memodash logo"
                    height={48}
                    width={48}
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">Register a new account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <p>{error}</p>
                <form className="space-y-6" onSubmit={handleClick}>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white-900">Email address</label>
                        <div className="mt-2">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="verifyPassword" className="block text-sm/6 font-medium text-white-900">Verify Password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => setVerifyPassword(e.target.value)} type="password" name="verifyPassword" id="verifyPassword" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Register
                        </button>
                        <GoogleSignIn />
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already a member?
                    <a href="/login" className="font-semibold text-indigo-600 px-1.5 hover:text-indigo-500">Login</a>
                </p>
            </div>
        </div>
    )
}