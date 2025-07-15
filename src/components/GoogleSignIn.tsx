import Image from "next/image";
import GoogleLogo from "../../public/search.png"
import { auth, provider } from "../../utils/firebase"
import { signInWithPopup } from "firebase/auth"

export default function GoogleSignIn() {
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User:', result.user);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <button onClick={handleGoogleSignIn} className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 my-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <Image className="px-1 py-1 mx-1"
                src={GoogleLogo}
                alt="google logo"
                height={28}
                width={28} />
            Sign in with Google
        </button>
    )
}