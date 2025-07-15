"use client"
import useAuth from "../../../../hooks/useAuth";
import SignOutButton from "@/components/SignOutButton";

export default function Dashboard() {
    const user = useAuth();

    if (!user) return <p>Loading...</p>

    return (
        <div className="pt-24 px-6 py-12 lg:px-8">
            <p>dashboard</p>
            <p>user: {user.displayName} {user.email}</p>
            <SignOutButton />
        </div>
    )
}