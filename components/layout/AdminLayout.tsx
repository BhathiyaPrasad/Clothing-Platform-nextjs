// components/layout/AdminLayout.tsx
import React, { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div data-theme="winter">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
