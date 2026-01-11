import React from 'react';
import { CartItem } from '../types';

interface CartBarProps {
  cart: CartItem[];
  onOpenCheckout: () => void;
}

const CartBar: React.FC<CartBarProps> = ({ cart, onOpenCheckout }) => {
  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (totalCount === 0) return null;

  return (
    <div 
      onClick={onOpenCheckout}
      className="fixed bottom-5 left-4 right-4 bg-primary text-white p-4 rounded-xl flex justify-between items-center shadow-lg shadow-red-200 z-50 cursor-pointer hover:bg-red-700 transition-colors animate-bounce-short"
    >
      <div className="flex items-center gap-3">
        <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold backdrop-blur-sm">
          {totalCount}
        </span>
        <span className="font-bold text-sm">
          {totalPrice.toLocaleString()} Kz
        </span>
      </div>
      <span className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
        Ver Pedido <i className="fa-solid fa-chevron-right text-xs"></i>
      </span>
    </div>
  );
};

export default CartBar;