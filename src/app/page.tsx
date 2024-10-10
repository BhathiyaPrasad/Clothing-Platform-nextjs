"use client"; // Ensures this is treated as a client-side component

import MainLayout from "@components/layout/MainLayout";
import Hero from "@components/Hero";
import Title from "@components/common/Title";
import ProductList from "@components/ProductList";
import './globals.css';


export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Title text="New Arrivals" />
      <ProductList
        category=""
        order=">="
        limits={12}
        group='Item_ID_Auto'
        type=''
      />
     
  
    </MainLayout>
  );
}
