import { useEffect, useState } from "react";
import { productData } from "../api/api";

const Products = () => {
    let [da, setda] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await productData(); // Await the resolved value
                setda(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        getProducts(); // Call the async function
    }, []);

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {da.map((product, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-md bg-white relative group overflow-hidden"
                        >
                            {/* Image */}
                            <div className="w-full h-48 flex justify-center items-center overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-auto h-full object-contain"
                                />
                            </div>
                            {/* Add to Cart Button */}
                            <button
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition duration-300"
                                onClick={() => alert(`Added ${product.title} to cart!`)}
                            >
                                Add to Cart
                            </button>
                            {/* Product Details */}
                            <div className="p-4 text-center">
                                <h2 className="font-bold text-lg truncate">
                                    {product.title}
                                </h2>
                                <p className="text-gray-600 text-sm">{product.category}</p>
                                <p className="text-gray-800 font-semibold mt-2">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
