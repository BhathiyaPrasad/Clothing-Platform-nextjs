'use client'
import MainLayout from '../../../../components/layout/MainLayout'
import Cart from '@components/Cart';
import '../../../../src/app/globals.css'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CartPage = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null; // Optionally show a loader or placeholder
  }

  return (
    <MainLayout>
      <Cart />
    </MainLayout>
  );
};

export default CartPage;


