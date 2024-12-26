import React from 'react';
import { useSelector } from 'react-redux';

const MyProducts = () => {
    const { profile, productData } = useSelector((state) => state.bazzar);
    let data = productData.filter(userData => userData.owner === profile.uid)
    console.log(data)
    return (
        <div>
            {data.map(product => (
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 p-4">
                    {/* Image Section */}
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                        {product.imgUrl ? (
                            <img src={product?.imgUrl} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                            <p className="text-gray-400">No Image Available</p>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h2>
                        <p className="text-sm text-gray-500">Category: {product.category}</p>
                        <p className="text-sm text-gray-500">Date Added: {product.date}</p>
                        <p className="text-sm text-gray-500">Price: ${product.price}</p>
                        <p className="text-sm text-gray-500">Owner ID: {product.owner}</p>
                        <p className="text-gray-600 mt-4">{product.description}</p>
                    </div>

                    {/* ID Section */}
                    <div className="text-xs text-gray-400 mt-4">Product ID: {product.id}</div>
                </div>
            ))}
        </div>
    );
};

export default MyProducts;