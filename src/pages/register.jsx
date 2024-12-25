import React, { useState } from 'react';
import { auth, db } from '../api/api'; // Ensure auth and db are correctly imported
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const encodeEmail = (email) => email.replace(/\./g, '_'); // Replace dots with underscores

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
    });

    const getInput = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={profile.name}
                            name="name"
                            onChange={getInput}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={profile.email}
                            name="email"
                            onChange={getInput}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={profile.password}
                            name="password"
                            onChange={getInput}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
