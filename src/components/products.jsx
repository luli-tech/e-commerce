import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../store/store";
import Toast from "./toast";
import { toast } from "react-toastify";
import { fetchProducts } from "../store/store";  // Make sure you import the correct action
import { useDispatch, useSelector } from "react-redux";
const Products = () => {
    let dispatch = useDispatch();

    const { productData, status, error, ActiveUsers } = useSelector((state) => state.bazzar);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    console.log(ActiveUsers)
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
    function getToCart(productData) {
        dispatch(addToCart({ id: productData.id, title: productData.title, price: productData.price, image: productData.image, description: productData.description, total: productData.price * productData.quantity })) & toast.success(`${productData.title} is added successfully`)
    }
    return (
        <div className="bg-white text-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Shopping Everyday</h1>
                    <div className="w-16 h-1 bg-black mx-auto mb-4"></div>
                    <p className="text-gray-600 mb-8">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, quos fugit inventore, cumque quae corporis ratione tenetur eos voluptates neque magnam soluta aperiam omnis perspiciatis reiciendis asperiores repudiandae assumenda quidem.
                    </p>
                </div>
                {/* Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productData.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg shadow-md bg-white relative group overflow-hidden"
                        >
                            {/* Image */}
                            <Link to={`/${product.id}`} className="w-full h-48 flex justify-center items-center overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-auto h-full object-contain"
                                />
                            </Link>
                            {/* Add to Cart Button */}
                            <button
                                className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black text-white text-sm font-semibold px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transition-all duration-300"
                                onClick={() => getToCart(product)}
                            >
                                Add to Cart
                            </button>
                            {/* Product Details */}
                            <div className="p-4 text-center">
                                <h2 className="font-bold text-lg truncate">{product.title}</h2>
                                <p className="text-gray-600 text-sm">{product.category}</p>
                                <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Toast />
        </div>
    );
};

export default Products;
