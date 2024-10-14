'use client';
// components/FloatingWishlistButton.tsx

import React, { useState ,  useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Heart } from 'lucide-react';

const FloatingWishlistButton = () => {
  interface WishlistItem {
    Item_Name: string;
  }
  
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]); // Example state for wishlist

useEffect(() => {
    const itemsString = localStorage.getItem('wishlist');
    if (itemsString) {
      const storedItems = JSON.parse(itemsString);
      setWishlistItems(storedItems);
    }

  }, []);

  return (
    <div className='z-50'>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="fixed bottom-5 right-5 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105">
          <Heart 
                   size={20} 
                     className="
                     transform group-hover:scale-110 group-hover:fill-current
                     transition-all duration-300 ease-in-out "/>
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6 max-w-lg w-full transition-transform duration-300 ease-in-out">
            <Dialog.Close asChild>
              <button className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 ease-in-out transform hover:rotate-90">
                X
              </button>
            </Dialog.Close>
            <h2 className="text-xl font-bold mb-5 text-center">Your Wish List</h2>
             {wishlistItems.length > 0 ? (
               <ul className="space-y-4">
              {wishlistItems.map((item, index) => (
             <li key={index} className="border p-4 rounded-lg bg-gray-100 shadow hover:bg-gray-200 transition-colors duration-300">
                <div className="font-bold">{item.Item_Name || 'Unnamed Item'}</div>
             </li>
               ))} </ul>
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
