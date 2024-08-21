'use client';

import { useParams } from 'next/navigation';
import MainLayout from '@components/layout/MainLayout';
import ProductDetails from '@components/ProductDetails';
import '../../../../src/app/globals.css';

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure productId is a string

  console.log("Product ID:", productId); // Debugging line

  return (
    <MainLayout>
      {productId ? <ProductDetails productId={productId} /> : <p>Loading......</p>}
    </MainLayout>
  );
};

export default ProductDetailsPage;
