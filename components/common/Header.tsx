" use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../Styles/header.css';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
      <div className="navbars">Island wide cash on delivery</div>
      <div className="navbar" style={{ margin: '10px' }}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow text-lg"
            >
              <li>
                <Link href="/">HOME</Link>
              </li>
              <li>
                <Link href="/product/men">MEN</Link>
                <ul className="p-2">
                  <li><Link href="/product/men/shirts">Shirts</Link></li>
                  <li><Link href="/product/men/trousers">Trousers</Link></li>
                </ul>
              </li>
              <li>
                <Link href="/product/women">WOMEN</Link>
                <ul className="p-2">
                  <li><Link href="/product/women/shorts">Shorts</Link></li>
                  <li><Link href="/product/women/skirts">Skirts</Link></li>
                </ul>
              </li>
              <Link href="/product/unisex">WOMEN</Link>
              <li><Link href="/product/week">THIS WEEK</Link></li>
              <li><Link href="/product/sale">SALE</Link></li>
              <li><Link href="/product/accessories">ACCESSORIES</Link></li>
              <li><Link href="/contact">CONTACT</Link></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-3xl" href="/">SALUNI FASHION</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/" className="text font-bold font-mono text-base">HOME</Link></li>
            <li>
              <details>
                <summary><Link href="/product/men" className="text font-bold font-mono text-base">MEN</Link></summary>
                <ul className="p-2">
                  <li><Link href="/product/men/shirts">Shirts</Link></li>
                  <li><Link href="/product/men/trousers">Trousers</Link></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary><Link href="/product/women" className="text font-bold font-mono text-base">WOMEN</Link></summary>
                <ul className="p-2">
                  <li><Link href="/product/women/shorts">Shorts</Link></li>
                  <li><Link href="/product/women/skirts">Skirts</Link></li>
                </ul>
              </details>
            </li>
            <li><Link href="/product/unisex" className="text font-bold font-mono text-base">UNISEX</Link></li>
            <li><Link href="/product/week" className="text font-bold font-mono text-base">THIS WEEK</Link></li>
            <li><Link href="/product/sale" className="text font-bold font-mono text-base">SALE</Link></li>
            <li><Link href="/product/accessories" className="text font-bold font-mono text-base">ACCESSORIES</Link></li>
            <li><Link href="/contact" className="text font-bold font-mono text-base">CONTACT</Link></li>
          </ul>
        </div>
        <div className="navbar-end" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="dropdown dropdown-end" style={{ marginRight: '20px' }}>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{items.length}</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{items.length} Items</span>
                <span className="text-info"></span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    <Link href="/product/cart">View cart</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div className="clerk-buttons" style={{ marginRight: '10px' }}>
              <SignedOut>
                <SignInButton>
                  <button className="btn btn-square">Sign In</button>
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
