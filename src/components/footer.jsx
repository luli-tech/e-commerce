import React from "react";

const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
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
                    <p className="mb-2">📍 123 Business Street, City, Country</p>
                    <p className="mb-2">📞 Phone: +1 234 567 890</p>
                    <p>📧 Email: contact@yourcompany.com</p>
                </div>

                {/* Profile, Payments, and Social Media */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                    <p className="mb-4">Connect with us on social media:</p>
                    <div className="flex gap-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-700"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <h2 className="text-xl font-semibold mt-6 mb-4">Payment Systems</h2>
                    <div className="flex flex-wrap gap-4">
                        <img
                            src="https://via.placeholder.com/50x30?text=Visa"
                            alt="Visa"
                            className="h-8"
                        />
                        <img
                            src="https://via.placeholder.com/50x30?text=Mastercard"
                            alt="Mastercard"
                            className="h-8"
                        />
                        <img
                            src="https://via.placeholder.com/50x30?text=PayPal"
                            alt="PayPal"
                            className="h-8"
                        />
                        <img
                            src="https://via.placeholder.com/50x30?text=Stripe"
                            alt="Stripe"
                            className="h-8"
                        />
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
