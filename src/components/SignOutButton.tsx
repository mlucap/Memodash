import { redirect } from "next/navigation";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";

export default function SignOutButton() {
    const handleSignOut = async () => {
        try {
            await signOut(auth).then(redirect("/"));
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded">
            Sign out
        </button>
    )
}