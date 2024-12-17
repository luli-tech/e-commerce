import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/store";

const ProductCard = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const { productData, ActiveUsers } = useSelector((state) => state.bazzar);

    // Find the product by ID
    const product = productData?.find((product) => product.id === parseInt(id));
    console.log(ActiveUsers?.cart)
    // Increment quantity
    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Decrement quantity
    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    };

    const getToCart = (product) => {
        dispatch(addToCart({ ...product, quantity }));
    };

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
                    <div className="mt-6 flex items-center space-x-4">
                        <button
                            onClick={handleDecrement}
                            className="px-4 py-2 bg-gray-300 rounded-md text-lg font-bold"
                        >
                            -
                        </button>
                        <span className="w-16 px-3 py-2 text-center border border-gray-300 rounded-md text-lg font-semibold">
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrement}
                            className="px-4 py-2 bg-gray-300 rounded-md text-lg font-bold"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-6">
                        <button
                            onClick={() => getToCart(product)}
                            className="w-full py-3 px-4 bg-black text-white text-lg font-semibold rounded-md hover:bg-gray-800 transition duration-300"
                        >
                            Add to Cart
                        </button>
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
