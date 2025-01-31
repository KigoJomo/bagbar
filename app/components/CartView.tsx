'use client';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

const CartView: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { cart } = useShop();

  return (
    <div className="">
      <h3 className="">Shopping Cart</h3>
      {isLoggedIn ? (
        cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.product_id} className="flex justify-between items-center">
                <span>Product ID: {item.product_id}</span>
                <span>Qty: {item.quantity}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty</p>
        )
      ) : (
        <p>Please login to view your cart</p>
      )}
    </div>
  );
};

export default CartView;