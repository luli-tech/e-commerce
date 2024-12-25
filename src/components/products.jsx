import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./toast";
import Loader from "./loader";
import { toast } from "react-toastify";
import Pagination from "./pagination";
import { fetchProduct } from "../store/store";

const Products = () => {
    const dispatch = useDispatch();
    const { productData, status, error, publicProduct } = useSelector((state) => state.bazzar);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15; // Adjust based on your requirements
    const [sortedProducts, setSortedProducts] = useState([]);

    // Handle adding to cart
    const getToCart = (productData) => {
        dispatch(addToCart({
            id: productData.id,
            title: productData.title,
            price: productData.price,
            image: productData.image,
            description: productData.description,
            total: productData.price * productData.quantity
        }));
        toast.success(`${productData.title} is added successfully`);
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(productData?.length / productsPerPage);
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
            <div className="flex space-x-1">
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

    // Sorting by Date Added and adding "New" label
    const sortProductsByDate = () => {
        const sorted = [...publicProduct].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        setSortedProducts(sorted);
    };

    // Label "New" if added within the last 7 days
    const isNewProduct = (dateAdded) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(dateAdded) > oneWeekAgo;
    };

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    useEffect(() => {
        if (publicProduct?.length > 0) {
            sortProductsByDate();
        }
    }, [publicProduct]);

    if (status === "loading") return <div><Loader /></div>;
    if (status === "failed") return <p><Loader /></p>;

    // Paginate the sorted products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
                                className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black text-white text-sm font-semibold px-1 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transition-all duration-300"
                                onClick={() => getToCart(product)}
                            >
                                Add to Cart
                            </button>
                            {/* Product Details */}
                            <div className="p-4 flex items-top justify-center text-center">
                                <div>       <h2 className=" text-[15px] truncate">{product.title}</h2>
                                    <p className="text-gray-600 text-sm">{product.category}</p></div>

                                {isNewProduct(product.dateAdded) && (
                                    <span className="text-sm text-red-500 bg-yellow-100 px-2 py-1 rounded-full">New</span>
                                )}
                                <p className="text-gray-800 text-[10px] font-semibold mt-2">${product.price}</p>
                                {renderStars(product.rating)} {/* Displaying star ratings */}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination Component */}
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

export default Products;
