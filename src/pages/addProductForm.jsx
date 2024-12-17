import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
    // State for form inputs
    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        category: ''

    });
    const [image, setImage] = useState(null);

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!productName || !price || !quantity || !description || !image) {
            alert('Please fill all fields, including the image.');
            return;
        }

        // Create a product object
        const newProduct = {
            name: productName,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description: description,
            image: URL.createObjectURL(image), // Preview URL for the image
        };

        // Pass product to parent function
        onAddProduct(newProduct);

        // Reset form fields
        setProductName('');
        setPrice('');
        setQuantity('');
        setDescription('');
        setImage(null);
    };
    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                    <label className="block mb-1 font-medium">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price ($)</label>
                    <input
                        type="number"
                        value={product.price}
                        name='price'
                        onChange={handleChange}
                        placeholder="Enter price"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Quantity */}
                <div>
                    <label className="block mb-1 font-medium">Quantity</label>
                    <input
                        type="number"
                        name='quantity'
                        value={product.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        min="1"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        value={product.description}
                        onChange={handleChange}
                        name='description'
                        placeholder="Enter product description"
                        rows="3"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    ></textarea>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1 font-medium">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
