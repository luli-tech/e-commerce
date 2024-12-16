import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addUser, logout } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../store/store";
const Login = () => {
    const { RegisteredCustomer, ActiveUsers } = useSelector((state) => state.bazzar);
    const dispatch = useDispatch();

    const auth = getAuth(); // Firebase Auth
    const provider = new GoogleAuthProvider(); // Google Auth Provider

    async function handleGoogleLogin(e) {
        e.preventDefault();
        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;

            // Dispatch the user data to Redux store
            dispatch(addUser({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }));
        } catch (error) {
            console.error("Error during Google login:", error.message);
        }
    }

    async function handleSignOut() {
        try {
            await signOut(auth);
            console.log("User signed out successfully");

            // Clear the user from Redux store
            dispatch(logout());
            persistor.purge()
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    }

    console.log("Registered Customer:", RegisteredCustomer);
    console.log(ActiveUsers)
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-6">
                {/* Google Authentication */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center w-64 px-4 py-2 border border-gray-300 rounded-md shadow-md text-gray-700 bg-white hover:bg-gray-100 transition"
                    >
                        <FaGoogle className="mr-2 text-blue-500 text-xl" />
                        Sign in with Google
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="w-32 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                    >
                        Sign Out
                    </button>
                </div>

                {/* GitHub Authentication */}
                <div className="flex items-center gap-4">
                    <button
                        className="flex items-center justify-center w-64 px-4 py-2 border border-gray-300 rounded-md shadow-md text-gray-700 bg-white hover:bg-gray-100 transition"
                    >
                        <FaGithub className="mr-2 text-gray-700 text-xl" />
                        Sign in with GitHub
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="w-32 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
