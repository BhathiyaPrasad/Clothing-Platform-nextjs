'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { formatPrice } from "@utils/price";
import Image from 'next/image';
import './Styles/cart.css';
import { productOrder } from '@utils/productorder';

interface CartItem {
  UUID: string;
  Item_Name: string;
  Sales_Price: number;
  quantity: number;
  imageUrl: string;
  imageAlt: string;
  selectedcolor: string;
  selectedsize: string;
}

interface BillingDetails {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  number: number
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'gateway'>('cod');
  const { user } = useUser();
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    name: user?.fullName || '',
    address: '',
    city: '',
    postalCode: '',
    number:0
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const itemsString = localStorage.getItem('Items');
    if (itemsString) {
      const storedItems = JSON.parse(itemsString);
      setCartItems(storedItems);
    }

    const storedDetails = localStorage.getItem('BillingDetails');
    if (storedDetails) {
      setBillingDetails(JSON.parse(storedDetails));
    }
  }, []);

  const updateLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('Items', JSON.stringify(items));
  };

  const handleQuantityChange = (UUID: string, quantity: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.UUID === UUID ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const handleRemoveItem = (UUID: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.UUID !== UUID);
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const calculateTotalPrice = () => {
    return formatPrice(
      cartItems.reduce((total, item) => total + item.Sales_Price * item.quantity, 0)
    );
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'cod') {
      productOrder(cartItems);
      alert('Order placed successfully with Cash on Delivery!');
    } else {
      window.location.href = '/payment-gateway';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    localStorage.setItem('BillingDetails', JSON.stringify(billingDetails));
    setIsFormVisible(false);
  };

  return (
    <div className="cart-container">
      {/* Shopping Cart */}
      <div className="cart-item-container">
        <h1 className="cart-title">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items-list">
              {cartItems.map(item => (
                <li key={item.UUID} className="cart-item">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="cart-item-image"
                    width={100}
                    height={100}
                    priority
                  />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.Item_Name}</p>
                    <p className="cart-item-info">Price: {formatPrice(item.Sales_Price)}</p>
                    <p className="cart-item-info">Color: {item.selectedcolor}</p>
                    <p className="cart-item-info">Size: {item.selectedsize}</p>
                    <div className="cart-item-actions">
                      <button
                        className="cart-quantity-button"
                        onClick={() => handleQuantityChange(item.UUID, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="cart-quantity-text">{item.quantity}</span>
                      <button
                        className="cart-quantity-button"
                        onClick={() => handleQuantityChange(item.UUID, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="cart-remove-button"
                        onClick={() => handleRemoveItem(item.UUID)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h3.5V.5a.5.5 0 0 1 1 0V1h3V.5a.5.5 0 0 1 1 0V1H13a1 1 0 0 1 1 1v1zM4.118 4l.81 8.106A1 1 0 0 0 5.986 13h4.028a1 1 0 0 0 .998-.894l.81-8.106H4.118z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="cart-total">Total: {calculateTotalPrice()}</p>
            <div className="cart-payment-method">
              <h2 className="payment-method-title">Payment Method</h2>
              <div className="payment-method-options">
                <div className="payment-method-option">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="payment-method-radio"
                  />
                  <label htmlFor="cod" className="payment-method-label">Cash on Delivery</label>
                </div>
                {/* <div className="payment-method-option">
                  <input
                    type="radio"
                    id="gateway"
                    name="paymentMethod"
                    value="gateway"
                    checked={paymentMethod === 'gateway'}
                    onChange={() => setPaymentMethod('gateway')}
                    className="payment-method-radio"
                  />
                  <label htmlFor="gateway" className="payment-method-label">Online Payment</label>
                </div> */}
              </div>
              <button
                onClick={handlePlaceOrder}
                className="cart-place-order-button"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
      {/* Billing Details */}
      <div className="billing-details-container">
        <h2 className="billing-details-title">Billing Details</h2>
        {user ? (
          <div className="billing-details-content">
            {!isFormVisible ? (
              <>
                <ul className="billing-details-list">
                  <li className="billing-details-item">
                    <strong>Name :</strong> 
                    <span className="billing-details-item-value">{billingDetails.name || 'User'}</span>
                  </li>
                  <li className="billing-details-item">
                    <strong>Email :</strong> 
                    <span className="billing-details-item-value">{user.primaryEmailAddress?.emailAddress}</span>
                  </li>
                  <li className="billing-details-item">
                    <strong>Address :</strong> 
                    <span className="billing-details-item-value">{billingDetails.address || 'Not provided'}</span>
                  </li>
                  <li className="billing-details-item">
                    <strong>Phone Number :</strong> 
                    <span className="billing-details-item-value">{billingDetails.number || 'Not provided'}</span>
                  </li>
                  <li className="billing-details-item">
                    <strong>City :</strong> 
                    <span className="billing-details-item-value">{billingDetails.city || 'Not provided'}</span>
                  </li>
                  <li className="billing-details-item">
                    <strong>Postal Code :</strong> 
                    <span className="billing-details-item-value">{billingDetails.postalCode || 'Not provided'}</span>
                  </li>
                
                </ul>
                <button
                  className="billing-edit-button"
                  onClick={() => setIsFormVisible(true)}
                >
                  Edit Details
                </button>
              </>
            ) : (
              <>
                <div className="billing-form">
                  <div>
                    <label htmlFor="name" className="billing-form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={billingDetails.name}
                      onChange={handleInputChange}
                      className="billing-form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="billing-form-label">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={billingDetails.address}
                      onChange={handleInputChange}
                      className="billing-form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="billing-form-label">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={billingDetails.city}
                      onChange={handleInputChange}
                      className="billing-form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="billing-form-label">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={billingDetails.postalCode}
                      onChange={handleInputChange}
                      className="billing-form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="billing-form-label">Postal Code</label>
                    <input
                      type="number"
                      id="number"
                      name="number"
                      value={billingDetails.number}
                      onChange={handleInputChange}
                      className="billing-form-input"
                    />
                  </div>
                </div>
                <button
                  className="billing-save-button"
                  onClick={handleFormSubmit}
                >
                  Save
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="signed-out-message">Please sign in to view your details.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
