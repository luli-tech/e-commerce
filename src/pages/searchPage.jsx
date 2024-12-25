import React, { useState } from 'react';
import { addToCart } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import Toast from '../components/toast';
import Pagination from '../components/pagination';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ShoppingPage = () => {
    const dispatch = useDispatch();
    const { productData, ActiveUsers } = useSelector(state => state.bazzar);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const addCart = (productData) => {
        dispatch(addToCart({ ...productData, quantity: 1 }));
        toast.success(`${productData.title} added successfully`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };



    const renderStars = (rating) => {
        // Ensure the rating is a valid number between 0 and 5
        const validRating = isNaN(rating) ? 0 : Math.min(Math.max(rating, 0), 5); // Ensures rating is clamped between 0 and 5
        const fullStars = Math.floor(validRating);
        const halfStars = validRating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        // Prevent rendering with invalid array length
        const fullStarArray = Array(fullStars).fill("★");
        const halfStarArray = halfStars === 1 ? ["☆"] : [];
        const emptyStarArray = Array(emptyStars).fill("☆");

        return (
            <div className="justify-center absolute top-0 left-0 right-0 flex items-center   text-white text-[10px] font-bold px-1 py-1  rounded-md opacity-0 group-hover:opacity-80 group-hover:translate-y-0 translate-y-full transition-all duration-300">
                {fullStarArray.map((_, i) => (
                    <span key={`full-${i}`} className="text-yellow-500">★</span>
                ))}
                {halfStarArray.length > 0 && (
                    <span className="text-yellow-500">☆</span>
                )}
                {emptyStarArray.map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-400">☆</span>
                ))}
            </div>
        );
    };


    const filteredProducts = productData?.filter((product) =>
        product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const isNewProduct = (dateAdded) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(dateAdded) > oneWeekAgo;
    };


    const totalPrice = ActiveUsers?.cart?.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    return (
        <div className="bg-white text-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Shopping Everyday</h1>
                    <div className="w-16 h-1 bg-black mx-auto mb-4"></div>
                    <p className="text-gray-600 mb-8">Find your favorite products here. Add them to your cart and checkout easily!</p>
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

                <div className="grid m-auto min-w-[400px] max-w-[60%] grid-cols-3 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-3 gap-2">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id} className="border h-[150px] w-full rounded-lg shadow-md bg-white relative group overflow-hidden"
                        >
                            {/* Image */}
                            <Link to={`/${product.id}`} className="w-full h-[100px] flex justify-center items-center overflow-hidden">
                                <img
                                    src={product.imgUrl}
                                    alt={product.title}
                                    className="h-full object-contain"
                                />
                            </Link>
                            {/* Add to Cart Button */}
                            <button
                                className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black text-white text-[10px] font-bold px-1 py-1  rounded-md opacity-0 group-hover:opacity-80 group-hover:translate-y-0 translate-y-full transition-all duration-300"
                                onClick={() => getToCart(product)}
                            >
                                Add to Cart
                            </button>
                            {/* Product Details */}
                            <div className="w-[100%] flex-col items-top justify-center text-center">
                                <div className="flex justify-around flex-row"> <h2 className=" text-[12px] font-bold w-[40px] truncate uppercase">{product.title}</h2>
                                    <p className="text-gray-600 text-[10px]">{product.category}</p>
                                </div>

                                {isNewProduct(product.dateAdded) && (
                                    <span className="text-sm absolute top-0 text-red-500 bg-yellow-100 rounded-full">New</span>
                                )}
                                <p className="text-gray-800 text-[10px] font-semibold">${product.price}</p>
                                {renderStars(product.rating)} {/* Displaying star ratings */}
                            </div>
                        </div>
                    ))}
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
