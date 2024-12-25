import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiStripe } from "react-icons/si";

const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Subscribed successfully!");
    };

    return (
        <footer className="bg-blue-950 text-white py-12 px-6 md:px-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Subscription Form */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Stay Updated</h2>
                    <p className="text-sm text-gray-200">
                        Subscribe to our newsletter to receive the latest news and exclusive offers.
                    </p>
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                        <button
                            type="submit"
                            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold shadow-md"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Contact Us</h2>
                    <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-blue-200 text-lg" />
                        <p className="text-sm text-gray-200">123 Business Street, City, Country</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaPhoneAlt className="text-green-200 text-lg" />
                        <p className="text-sm text-gray-200">+1 234 567 890</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaEnvelope className="text-red-200 text-lg" />
                        <p className="text-sm text-gray-200">contact@yourcompany.com</p>
                    </div>
                </div>

                {/* Social Media and Payments */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Follow Us</h2>
                    <p className="text-sm text-gray-200">Connect with us on social media:</p>
                    <div className="flex gap-4 text-xl">
                        <a href="https://facebook.com" className="hover:text-blue-100">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" className="hover:text-blue-100">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" className="hover:text-pink-100">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" className="hover:text-blue-100">
                            <FaLinkedin />
                        </a>
                    </div>
                    <h2 className="text-2xl font-bold mt-6">Payment Methods</h2>
                    <div className="flex items-center gap-4 text-2xl">
                        <SiVisa className="text-blue-200" />
                        <SiMastercard className="text-red-200" />
                        <SiPaypal className="text-blue-100" />
                        <SiStripe className="text-purple-200" />
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 border-t border-gray-400 pt-6 text-center">
                <p className="text-sm text-gray-200">
                    © 2024 Your Company. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
