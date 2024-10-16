"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
 import '../Styles/header.css'; //removed for fix the build error
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import SaluniLogo from '../../assests/images/final1.3.jpg';

const Header = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsString = localStorage.getItem('Items');
    if (itemsString) {
      const parsedItems = JSON.parse(itemsString);
      setItems(parsedItems);
    }
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 bg-black shadow-md text-white ">
        {/* Top Announcement Bar */}
        <div className="bg-gray-200 text-center py-2 text-sm text-gray-900 font-black">ISLAND WIDE CASH ON DELIVERY</div>

        {/* Main Header Section */}
        <div className="navbar container mx-auto px-2 py-3 flex items-center justify-between">

          <div className="lg:hidden">
            <div className="dropdown">
              <div tabIndex={0} className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow  rounded-box w-52 text-white bg-black">
                <li><Link href="/">HOME</Link></li>
                <li>
                  <details>
                    <summary>MEN</summary>
                    <ul className="p-2">
                      <li><Link href="/product/men/shirts">Shirts</Link></li>
                      <li><Link href="/product/men/trousers">Trousers</Link></li>
                      <li><Link href="/product/men/t-shirts">T-Shirts</Link></li>
                      <li><Link href="/product/men/shorts">Shorts</Link></li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>WOMEN</summary>
                    <ul className="p-2">
                      <li><Link href="/product/women/shorts">Shorts</Link></li>
                      <li><Link href="/product/women/skirts">Skirts</Link></li>
                      <li><Link href="/product/women/tops">Tops</Link></li>
                      <li><Link href="/product/women/t-shirts">T-Shirts</Link></li>
                      <li><Link href="/product/women/dresses">Dresses</Link></li>
                    </ul>
                  </details>
                </li>
                <li><Link href="/product/unisex">UNISEX</Link></li>
                <li><Link href="/product/week">THIS WEEK</Link></li>
                <li><Link href="/product/sale">SALE</Link></li>
                <li><Link href="/product/accessories">ACCESSORIES</Link></li>
                <li><Link href="/contact">CONTACT</Link></li>
              </ul>
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/">
              <>
                <Image src={SaluniLogo} width={100} height={80} alt="Saluni Logo" className="cursor-pointer" />
              </>
            </Link>
          </div>


          {/* Centered Navigation for Desktop */}
          <div className="hidden lg:flex justify-center flex-grow">
            <ul className="flex space-x-8 font-semibold text-white hover:text-white">
              <li><Link href="/">HOME</Link></li>
              <li className="relative group">
                <Link href="/product/men">MEN</Link>
                <ul className="absolute hidden group-hover:block bg-black shadow-lg py-2 text-sm text-white">
                  <li className="py-2 px-4 hover:bg-black-800 text-white"><Link href="/product/men/shirts">Shirts</Link></li>
                  <li className="py-2 px-4 hover:bg-black-800"><Link href="/product/men/trousers">Trousers</Link></li>
                  <li className="py-2 px-4 hover:bg-black-800"><Link href="/product/men/t-shirts">T-Shirts</Link></li>
                  <li className="py-2 px-4 hover:bg-black-800"><Link href="/product/men/shorts">Shorts</Link></li>
                </ul>
              </li>
              <li className="relative group">
                <Link href="/product/women">WOMEN</Link>
                <ul className="absolute hidden group-hover:block bg-black shadow-lg py-2 text-sm text-white">
                  <li className="py-2 px-4 hover:bg-black-800"><Link href="/product/women/shorts">Shorts</Link></li>
                  <li className="py-2 px-4 hover:bg-black-800"><Link href="/product/women/skirts">Skirts</Link></li>
                  <li className="py-2 px-4 hover:bg-black-800"><Link href="/product/women/tops">Tops</Link></li>
                  <li className="py-2 px-2 hover:bg-black-800"><Link href="/product/women/t-shirts">T-Shirts</Link></li>
                  <li className="py-2 px-2 hover:bg-black-800"><Link href="/product/women/dresses">Dresses</Link></li>

                </ul>
              </li>
              <li><Link href="/product/unisex">UNISEX</Link></li>
              <li><Link href="/product/week">THIS WEEK</Link></li>
              <li><Link href="/product/sale">SALE</Link></li>
              <li><Link href="/product/accessories">ACCESSORIES</Link></li>
              <li><Link href="/contact">CONTACT</Link></li>
            </ul>
          </div>

          {/* User Actions: Cart and Sign-In */}
          <div className="flex items-center space-x-6">
            {/* Cart Button */}
            <div className="relative">
              <Link href="/product/cart">
                <p className="text-white-700 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {items.length > 0 && (
                    <span className="absolute -bottom-1 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {items.length}
                    </span>
                  )}
                </p>
              </Link>
            </div>


            {/* Sign-In/Account Button */}
            <div className="text-gray-700 hover:text-black">
              <SignedOut>
                <SignInButton>
                  <Link href="/sign-in">
                    <button className="bg-white-400 text-white  py-2 px-4 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                      Sign In
                    </button>
                  </Link>

                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
