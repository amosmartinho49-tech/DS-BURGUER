import React from 'react';
import { Product, CartItem } from '../types';

interface ProductListProps {
  products: Product[];
  cart: CartItem[];
  categoryTitle: string;
  onUpdateQty: (product: Product, delta: number) => void;
  onOpenAI: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, cart, categoryTitle, onUpdateQty, onOpenAI }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-extrabold my-5 text-white drop-shadow-md capitalize flex items-center gap-2">
        {categoryTitle}
        <div className="h-0.5 flex-1 bg-white/20 rounded-full"></div>
      </h2>
      <div className="space-y-4">
        {products.map((prod) => {
          const cartItem = cart.find(item => item.id === prod.id);
          const qty = cartItem ? cartItem.qty : 0;

          return (
            <div key={prod.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
               {/* Text Content */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-[15px] font-bold text-text-dark leading-tight mb-1">{prod.name}</h3>
                  <p className="text-[13px] text-text-gray leading-relaxed line-clamp-2">{prod.desc}</p>
                </div>
                <div className="font-bold text-[15px] text-text-dark mt-2">
                  {prod.price.toLocaleString()} Kz
                </div>
              </div>

              {/* Image & Action */}
              <div className="relative w-[110px] min-w-[110px] h-[110px]">
                {prod.image ? (
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                    <i className="fa-solid fa-burger text-2xl"></i>
                  </div>
                )}
                
                {/* AI Editor Button (CEO Only) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAI();
                  }}
                  className="absolute top-1 left-1 w-6 h-6 bg-black/40 hover:bg-primary rounded-full flex items-center justify-center backdrop-blur-[2px] text-white transition-all z-10"
                  title="Editor IA"
                >
                  <i className="fa-solid fa-wand-magic-sparkles text-[10px]"></i>
                </button>

                {qty === 0 ? (
                  <button 
                    onClick={() => onUpdateQty(prod, 1)}
                    className="absolute -bottom-2 -right-2 bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100 hover:bg-primary hover:text-white transition-all active:scale-95 z-20"
                  >
                    <i className="fas fa-cart-plus text-sm"></i>
                  </button>
                ) : (
                  <div className="absolute -bottom-2 -right-2 bg-white text-text-dark h-10 rounded-full flex items-center shadow-lg border border-gray-100 z-20 overflow-hidden">
                    <button 
                      onClick={() => onUpdateQty(prod, -1)}
                      className="w-9 h-full flex items-center justify-center text-primary hover:bg-gray-50 transition-colors active:bg-gray-100"
                    >
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <span className="text-sm font-bold w-4 text-center select-none">{qty}</span>
                    <button 
                      onClick={() => onUpdateQty(prod, 1)}
                      className="w-9 h-full flex items-center justify-center text-primary hover:bg-gray-50 transition-colors active:bg-gray-100"
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;