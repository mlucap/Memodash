import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import type { User } from "firebase/auth";

export default function useAuth(redirectTo = '/login') {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(redirectTo)
            } else {
                setUser(user)
                router.push("/dashboard")
            }
        });

        return () => unsubscribe();
    }, [router, redirectTo])

    return user;
}