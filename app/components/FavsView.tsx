'use client';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

interface FavsViewProps {
  className?: string;
}

const FavsView: React.FC<FavsViewProps> = ({ className }) => {
  const { isLoggedIn } = useAuth();
  const { favorites } = useShop();

  return (
    <div className={`${className}`}>
      <h3 className="">My Favorites</h3>
      {isLoggedIn ? (
        favorites.length > 0 ? (
          <div className="flex flex-col gap-2">
            {favorites.map((id) => (
              <div key={id} className="flex justify-between items-center">
                <span>Product ID: {id}</span>
                <button className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No favorites yet</p>
        )
      ) : (
        <p>Please login to view favorites</p>
      )}
    </div>
  );
};

export default FavsView;