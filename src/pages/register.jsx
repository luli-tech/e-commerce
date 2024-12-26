import React, { useState } from 'react';
import { auth, db } from '../api/api'; // Ensure auth and db are correctly imported
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Register = () => {
    const encodeEmail = (email) => email.replace(/\./g, '_'); // Replace dots with underscores

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const getInput = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Create the user in Firebase Authentication
            const res = await createUserWithEmailAndPassword(auth, profile.email, profile.password);
            const user = res.user;

            // Encode email for document ID
            const encodedEmail = encodeEmail(user.email);

            // Add the user to Firestore
            await setDoc(doc(db, 'users', encodedEmail), {
                name: profile.name || 'Anonymous', // Use the name from the form
                email: user.email,
                password: profile.password,
                createdAt: new Date(),
            });

            console.log('User registered and added to Firestore successfully!');
        } catch (error) {
            console.error('Error registering user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-purple-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={profile.name}
                            name="name"
                            onChange={getInput}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={profile.email}
                            name="email"
                            onChange={getInput}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={profile.password}
                            name="password"
                            onChange={getInput}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${loading
                                ? 'bg-purple-400 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300'
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                                    ></path>
                                </svg>
                                Registering...
                            </div>
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
