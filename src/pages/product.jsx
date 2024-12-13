import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../api/api";

const ProductCard = () => {
    let [da, setDa] = useState([]);
    let { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]); // Cart state to store added items

    // Fetch the product data from API
    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await productData(); // Await the resolved value
                setDa(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        getProducts(); // Call the async function
    }, []);

    // Find the product by ID
    const product = da.find((product) => product.id === parseInt(id));

    // Quantity change handler
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    // Add item to cart
    const addToCart = () => {
        setCart([...cart, { ...product, quantity }]);
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const isInCart = cart.some((item) => item.id === product?.id);

    if (!product) {
        return <div>Loading...</div>; // Loading state or error state if product not found
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap gap-4 sm:gap-6 lg:flex-nowrap lg:max-w-full bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Product Image */}
                <div className="w-full sm:w-1/2 p-4">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-full object-cover"
                    />
                    {product?.sale && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs py-2 px-4 rounded-bl-md">
                            Sale
                        </span>
                    )}
                </div>

                {/* Product Details */}
                <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        {/* Product Title */}
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{product?.title}</h2>

                        {/* Product Price */}
                        <div className="flex items-center mt-2">
                            {product?.sale && (
                                <span className="text-lg font-semibold text-gray-500 line-through mr-3">
                                    ${product?.price}
                                </span>
                            )}
                            <span className="text-2xl font-semibold text-red-600">
                                ${product?.sale ? product?.salePrice : product?.price}
                            </span>
                        </div>

                        {/* Product Rating */}
                        <div className="flex items-center mt-2 text-yellow-500">
                            <span>★★★★★</span>
                            <span className="ml-2 text-sm text-gray-500">({product?.reviewsCount} Reviews)</span>
                        </div>

                        {/* Product Description */}
                        <p className="text-sm text-gray-600 mt-4">{product?.description}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-6 flex items-center space-x-2">
                        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            className="w-16 px-3 py-2 text-center border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Add or Remove from Cart Button */}
                    <div className="mt-6">
                        {!isInCart ? (
                            <button
                                onClick={addToCart}
                                className="w-full py-3 px-4 bg-black text-white text-lg font-semibold rounded-md hover:bg-gray-800 transition duration-300"
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <button
                                onClick={() => removeFromCart(product?.id)}
                                className="w-full py-3 px-4 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-700 transition duration-300"
                            >
                                Remove from Cart
                            </button>
                        )}
                    </div>

                    {/* Category */}
                    <div className="mt-4 text-sm text-gray-600">
                        Category: <span className="font-medium text-gray-800">{product?.category}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
