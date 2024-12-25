import React, { useEffect, useState } from "react";
import { db } from "../api/api";
import { doc, getDoc } from "firebase/firestore";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]); // State to store cart data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error handling

    const userId = "data"; // Replace with the correct document ID

    // Function to fetch cart data from Firestore
    const fetchCartData = async () => {
        if (!userId) {
            setError("User ID is missing. Please log in.");
            setLoading(false);
            return;
        }

        const userDocRef = doc(db, "ProductData", userId); // Correct document reference

        try {
            setLoading(true);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                setCartItems(data.cart || []); // Set cart data (default to empty array if cart doesn't exist)
            } else {
                console.log("No such document!");
                setCartItems([]); // Empty array if document doesn't exist
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
            setError("Failed to fetch cart data. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch cart data when component mounts
    useEffect(() => {
        fetchCartData();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

            {loading && <p className="text-center">Loading cart...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            {!loading && !error && cartItems.length === 0 && (
                <p className="text-center">Your cart is empty!</p>
            )}

            {!loading && cartItems.length > 0 && (
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            className="border p-4 rounded-md shadow-sm flex justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-600">
                                    Category: {item.category}
                                </p>
                                <p className="text-sm">Description: {item.description}</p>
                                <p className="text-sm font-medium">
                                    Quantity: {item.quantity}
                                </p>
                            </div>
                            <p className="text-lg font-bold text-blue-600">
                                ${item.price}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
