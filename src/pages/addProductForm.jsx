import React, { useState } from "react";
import { db } from "../api/api";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Toast from "../components/toast";
import { useSelector } from "react-redux";
import FileStack from "../components/filestack";
import { setDoc, doc, collection } from "firebase/firestore";

const AddProductForm = () => {
    const { profile } = useSelector(state => state.bazzar)
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        imgUrl: '',
        date: new Date().toLocaleDateString('en-GB'),
        owner: profile.uid
    });

    const [status, setStatus] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);
    function handlefileupload(file) {
        setProduct({ ...product, imgUrl: file })
    }
    // Categories Array
    const categories = ["Electronics", 'Food', 'Pet', 'Drinks and Beverages', "Books", "Clothing", "Home Appliances", "Beauty Products"];

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!product.title || !product.price || !product.description || !product.category) {
            setStatus({ message: "All fields are required!", type: "error" });
            setLoading(false);
            return; // Prevent submission if any field is empty
        }

        try {
            const uniqueId = uuidv4(); // Generate unique ID inside handleSubmit
            const productRef = doc(
                collection(db, "ProductData"),
                `${product.title}-ID(${uniqueId.slice(0, 5)})`
            );
            await setDoc(productRef, product);

            setStatus({ message: "Product added successfully!", type: "success" });
            setProduct({
                title: "",
                price: "",
                description: "",
                category: "",
                imgUrl: ''
            });
        } catch (error) {
            setStatus({ message: "Failed to add product. Please try again.", type: "error" });
            console.error("Error adding product: ", error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

            {status.message && (
                <div
                    className={`mb-4 text-center ${status.type === "success" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {["title", "price", "description"].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block mb-1 font-medium">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === "price" ? "number" : "text"}
                            id={field}
                            name={field}
                            value={product[field]}
                            onChange={handleChange}
                            placeholder={`Enter ${field}`}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                ))}

                {/* Select for Category */}
                <div>
                    <label htmlFor="category" className="block mb-1 font-medium">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <FileStack handlefileupload={handlefileupload} />
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                            } text-white py-2 rounded-md transition duration-300`}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </form>
            <Toast />
        </div>
    );
};

export default AddProductForm;
