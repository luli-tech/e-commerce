import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../api/api";

const ProductCard = () => {
    let [da, setDa] = useState([]);
    let { id } = useParams();
    const [quantity, setQuantity] = useState(1);

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

    if (!product) {
        return <div>Loading...</div>; // Loading state or error state if product not found
    }

    return (
        <div className="flex max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Product Image */}
            <div className="w-1/2">
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
            <div className="w-1/2 p-6 flex flex-col justify-between">
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

                {/* Quantity Selector and Add to Cart */}
                <div>
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

                    {/* Add to Cart Button */}
                    <div className="mt-6">
                        <button
                            onClick={() => alert(`Added ${product?.title} to cart`)}
                            className="w-full py-3 px-4 bg-black text-white text-lg font-semibold rounded-md hover:bg-gray-800 transition duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Category */}
                <div className="mt-4 text-sm text-gray-600">
                    Category: <span className="font-medium text-gray-800">{product?.category}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
