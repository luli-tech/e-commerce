import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../api/api';
import { logout } from '../store/store';
import { Log } from '../store/store';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    let nav = useNavigate()
    const dispatch = useDispatch();
    const { profile, isLogedIn, navigate } = useSelector((state) => state.bazzar);

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            dispatch(Log({ name: res.user.displayName || 'User', email: res.user.email, uid: res.user.uid }));
            nav('/')
            console.log(res)
        } catch (error) {
            console.error('Login Error:', error.message);
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
    console.log(profile)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isLogedIn ? `Welcome, ${profile.name}` : 'Login'}
                </h2>
                {!isLogedIn ? (
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={credentials.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={credentials.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Login;
