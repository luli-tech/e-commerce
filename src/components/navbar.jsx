import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-white shadow-md w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-800">bazaar</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#" className="text-gray-700 hover:text-black">Home</a>
              <a href="#" className="text-gray-700 hover:text-black">Pages</a>
              <a href="#" className="text-gray-700 hover:text-black">Shop</a>
              <a href="#" className="text-gray-700 hover:text-black">Element</a>
              <a href="#" className="text-gray-700 hover:text-black">Blog</a>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-700 hover:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18l-1 14H4L3 3zm4 14h10m-6-4h2"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </div>

                <img
                  src="https://via.placeholder.com/30" // Placeholder avatar
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="text-gray-700 hover:text-black focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with Transition */}
        <div
          className={`md:hidden px-4 py-2 bg-white border-t transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
        >
          <a href="#" className="block text-gray-700 hover:text-black">Home</a>
          <a href="#" className="block text-gray-700 hover:text-black">Pages</a>
          <a href="#" className="block text-gray-700 hover:text-black">Shop</a>
          <a href="#" className="block text-gray-700 hover:text-black">Element</a>
          <a href="#" className="block text-gray-700 hover:text-black">Blog</a>
        </div>
      </nav>
      <Outlet className='outlet' />
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Navbar;
