'use client';
// components/FloatingWishlistButton.tsx

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface WishlistItem {
  Item_Name: string;
  Sales_Price: string;
  imageUrl: string;

}

const FloatingWishlistButton: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]); // State for wishlist

  // Function to load wishlist from localStorage
  const loadWishlist = () => {
    const itemsString = localStorage.getItem('wishlist');
    if (itemsString) {
      const storedItems: WishlistItem[] = JSON.parse(itemsString);
      setWishlistItems(storedItems);
    }
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = (indexToRemove: number) => {
    const updatedWishlist = wishlistItems.filter((_, index) => index !== indexToRemove);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Load wishlist when the component mounts
  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className="fixed bottom-5 right-5 z-50 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={loadWishlist}
          >
            <Heart size={20} />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6 max-w-lg w-full transition-transform duration-300 ease-in-out z-50">
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 ease-in-out transform hover:rotate-90"
                aria-label="Close"
              >
                X
              </button>
            </Dialog.Close>
            <h2 className="text-xl font-bold mb-5 text-center">Your Wish List</h2>
            {wishlistItems.length > 0 ? (
              <ul className="space-y-4">
                {wishlistItems.map((item, index) => (
                  <li key={index} className="border p-4 rounded-lg bg-gray-100 shadow hover:bg-gray-200 transition-colors duration-300">
                    <div className="flex items-center space-x-4">
                      <Image src={item.imageUrl} alt={item.Item_Name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold">{item.Item_Name || 'Unnamed Item'}</div>
                        <div className="text-gray-600">Price: {item.Sales_Price || 'N/A'}</div>
                      </div>
                      <button
                        className="ml-auto text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                        onClick={() => removeFromWishlist(index)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No items in your wishlist yet.</p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default FloatingWishlistButton;
