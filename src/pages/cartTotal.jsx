import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CartTotals = () => {
    let { cart } = useSelector(state => state.bazzar)
    let total = cart.reduce((a, b) => a + (b.total || 0), 0)

    console.log(cart);
    console.log(total);

    return (
        <div className="max-w-sm mx-auto bg-white p-6 rounded-md shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>

            {/* Subtotal Section */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-800">${total}</p>
            </div>

            {/* Shipping Section */}
            <div className="mb-4">
                <p className="text-gray-600">Shipping</p>
                <p className="text-sm text-gray-500"></p>
            </div>

            {/* Divider */}
            <div className="border-t my-4"></div>

            {/* Total Section */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 font-semibold">Total</p>
                <p className="text-xl font-bold">$</p>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartTotals;
