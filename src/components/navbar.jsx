import React, { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from './footer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let { ActiveUsers = null } = useSelector((state) => state.bazzar);
  let length = ActiveUsers?.cart?.length
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  console.log(ActiveUsers)
  return (
    <>
      <ScrollRestoration />
      <nav className="bg-white z-50 fixed top-0 left-0 shadow-md w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to='/' className="text-2xl font-bold text-gray-800">bazaar</Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <NavLink to="/" className="text-gray-700 hover:text-black">Home</NavLink>
              <NavLink to="" className="text-gray-700 hover:text-black">Pages</NavLink>
              <NavLink to="/shop" className="text-gray-700 hover:text-black">Shop</NavLink>
              <NavLink to="" className="text-gray-700 hover:text-black">Element</NavLink>
              <NavLink to="" className="text-gray-700 hover:text-black">Blog</NavLink>
              <p>{ActiveUsers?.name}</p>
              {/* Icons */}
              <Link to='/cart' className="flex items-center space-x-4">
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
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{length}</span>
                </div>
              </Link>
              <Link to='/login'>
                <img
                  src="https://via.placeholder.com/30" // Placeholder avatar
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
              <p>{ActiveUsers?.profile?.name}</p>
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
          onClick={toggleMobileMenu}
          className={`md:hidden px-4 py-2 bg-white border-t transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="space-y-4">
            <a href="#" className="block text-gray-700 hover:text-primary transition-colors">Home</a>
            <a href="#" className="block text-gray-700 hover:text-primary transition-colors">Pages</a>
            <a href="#" className="block text-gray-700 hover:text-primary transition-colors">Shop</a>
            <a href="#" className="block text-gray-700 hover:text-primary transition-colors">Element</a>
            <a href="#" className="block text-gray-700 hover:text-primary transition-colors">Blog</a>

            <Link to="/cart" className="flex items-center space-x-4">
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-700 hover:text-primary transition-colors"
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
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {length}
                </span>
              </div>
            </Link>

            <div className="flex items-center space-x-4 mt-4">
              <Link to="/login">
                <img
                  src="https://via.placeholder.com/30"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              </Link>
              <p className="text-gray-700">{ActiveUsers?.profile?.name}</p>
            </div>
          </div>
        </div>

      </nav>
      <div className='outlet' >      <Outlet /></div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Navbar;
