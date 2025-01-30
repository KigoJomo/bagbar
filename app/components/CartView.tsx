
import React from 'react';

interface CartViewProps {
  className?: string
}

const CartView: React.FC<CartViewProps> = ({className}) => {
  return (
    <div className={`${className}`}>
      <h3>My Cart</h3>
    </div>
  );
};

export default CartView;
