import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../api/api';
import { logout, Log } from '../store/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { profile, isLogedIn } = useSelector((state) => state.bazzar);

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            dispatch(Log({ name: res.user.displayName || 'User', email: res.user.email, uid: res.user.uid }));
            nav('/');
        } catch (error) {
            console.error('Login Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
        } catch (error) {
            console.error('Logout Error:', error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {isLogedIn ? `Welcome, ${profile.name}` : 'Sign In'}
                </h2>
                {!isLogedIn ? (
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={credentials.email}
                                onChange={handleInputChange}
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
                                value={credentials.password}
                                onChange={handleInputChange}
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
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                    >
                        Logout
                    </button>
                )}
                {!isLogedIn && (
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Don't have an account?{' '}
                        <a href="/register" className="text-purple-500 hover:underline">
                            Register
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
