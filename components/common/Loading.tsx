import React from 'react';
import "../Styles/productlist.css";

const Loading = () => {
  return (
    <div className="card-container">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="custom-card">
          <div className="flex flex-col gap-3 p-4 animate-pulse">
            {/* Image Placeholder */}
            <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>

            {/* Title Placeholder */}
            <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>

            {/* Price Placeholder */}
            <div className="flex justify-between items-center">
              <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
