import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiStripe } from "react-icons/si";

const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Subscribed successfully!");
    };

    return (
        <footer className="bg-gray-800 text-white py-10 px-4 md:px-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Subscription Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
                    <p className="mb-4">Stay updated with the latest news and offers.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="px-4 py-2 rounded-md text-gray-800 w-full"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-semibold"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Address and Contact */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                    <div className="flex items-center mb-2">
                        <FaMapMarkerAlt className="text-blue-500 mr-2" />
                        <p>123 Business Street, City, Country</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaPhoneAlt className="text-green-500 mr-2" />
                        <p>+1 234 567 890</p>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="text-red-500 mr-2" />
                        <p>contact@yourcompany.com</p>
                    </div>
                </div>

                {/* Profile, Payments, and Social Media */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                    <p className="mb-4">Connect with us on social media:</p>
                    <div className="flex gap-4 text-xl">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-700"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                    <h2 className="text-xl font-semibold mt-6 mb-4">Payment Systems</h2>
                    <div className="flex flex-wrap gap-4 text-2xl">
                        <SiVisa className="text-blue-600" />
                        <SiMastercard className="text-red-600" />
                        <SiPaypal className="text-blue-400" />
                        <SiStripe className="text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 text-center">
                <p>© 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
