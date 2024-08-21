'use client'

import React, { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProductCard from '@components/common/ProductCard';
type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div data-theme="valentine">
      <Header />
      <main>{children}</main>
      
     
      <Footer />
    </div>
  );
};

export default MainLayout;
