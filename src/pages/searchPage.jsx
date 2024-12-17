import React, { useState, useEffect } from 'react';
import { addToCart } from '../store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Toast from '../components/toast';
import Pagination from '../components/pagination';  // Pagination Component
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ShoppingPage = () => {
    let { id } = useParams()
    let dispatch = useDispatch();
    let { productData, ActiveUsers } = useSelector(state => state.bazzar);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12; // You can change this number based on your needs

    // Handle adding products to the cart
    const addCart = (productData) => {
        dispatch(addToCart({ id: productData.id, title: productData.title, price: productData.price, image: productData.image, description: productData.description, total: productData.price * productData.quantity }));
        toast.success(`${productData.title} is added successfully`);
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);  // Reset to the first page when the search term changes
    };

    // Filter products based on search term
    const filteredProducts = productData.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Cart total price
    const totalPrice = ActiveUsers.cart?.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-white text-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Shopping Everyday</h1>
                    <div className="w-16 h-1 bg-black mx-auto mb-4"></div>
                    <p className="text-gray-600 mb-8">
                        Find your favorite products here. Add them to your cart and checkout easily!
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search products..."
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
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
                                    onClick={() => addCart(product)}
                                    disabled={product.stock === 0} // Disable button if out of stock
                                >
                                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                </button>

                                {/* Product Details */}
                                <Link to={`/${product.id}`} className="p-4 text-center">
                                    <h2 className="font-bold text-lg truncate">{product.title}</h2>
                                    <p className="text-gray-600 text-sm">{product.category}</p>
                                    <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <Toast />
        </div>
    );
};

export default ShoppingPage;


