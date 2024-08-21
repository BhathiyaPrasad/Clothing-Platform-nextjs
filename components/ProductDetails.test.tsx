// __tests__/ProductDetails.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { doc, getDoc } from 'firebase/firestore';
import ProductDetails from '../components/ProductDetails';
import { db } from '../utils/firebase';
import '@testing-library/jest-dom';  // This ensures jest-dom matchers are available

// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('../utils/firebase', () => ({
  db: jest.fn(),
}));

const sampleProduct = {
  name: 'Sample Product',
  description: 'This is a sample product.',
  price: 99.99,
  id: '1',
};

describe('ProductDetails', () => {
  it('renders product details with sample data', async () => {
    // Mock the implementation of getDoc to return a sample product
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => sampleProduct,
    });

    // Mock doc function to return a sample doc reference
    (doc as jest.Mock).mockReturnValue({});

    render(<ProductDetails productId="1" />);

    // Check if the loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the product data to be displayed
    await waitFor(() => {
      expect(screen.getByText('Sample Product')).toBeInTheDocument();
      expect(screen.getByText('This is a sample product.')).toBeInTheDocument();
      expect(screen.getByText('Price: $99.99')).toBeInTheDocument();
    });
  });
});
