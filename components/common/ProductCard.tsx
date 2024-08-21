'use client'
import { useRouter } from 'next/navigation'
import React from "react";
import product from "../../assests/images/product13.13.jpg";
import Image from "next/image";
import "../Styles/productlist.css";
import { formatPrice } from "@utils/price";
import { useState } from 'react';


const ProductCard = ({ UUID, imageUrl, height, width, Eng_Name, Discount, Sales_Price, imageUrl2 }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const router = useRouter();

  const handleMouseOver = () => {
    setCurrentImageUrl(imageUrl2);
  };

  const handleMouseOut = () => {
    setCurrentImageUrl(imageUrl);
  };

  return (
    <div className="custom-card" onClick={() => router.push(`/product/${UUID}`)}>
      <figure onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <Image src={currentImageUrl} alt="product image" priority={false} loading="lazy" height='200' width='200' />
      </figure>
      <div className="custom-card-body">
        <h2 className="custom-card-title">
          {Eng_Name}
          <div className="tag">NEW</div>
        </h2>
        {Discount > 0 ? (
          <>
            <p className="custom-card-sale-price">{formatPrice(Sales_Price)}</p>
            <p className="custom-card-real-price">{formatPrice(Sales_Price - Discount)}</p>
          </>
        ) : (
          <p className="custom-card-real-price">{formatPrice(Sales_Price)}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;