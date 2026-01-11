import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import ProductList from './components/ProductList';
import CartBar from './components/CartBar';
import CheckoutModal from './components/CheckoutModal';
import ImageEditor from './components/ImageEditor';
import { Product, CartItem, Category, MenuData } from './types';

const DEFAULT_BG = "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop";

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('burgers');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appBackground, setAppBackground] = useState<string>(DEFAULT_BG);

  // Load background from local storage on mount
  useEffect(() => {
    const savedBg = localStorage.getItem('app_bg');
    if (savedBg) {
      setAppBackground(savedBg);
    }
  }, []);

  const handleSetBackground = (bg: string | null) => {
    if (bg) {
      setAppBackground(bg);
      localStorage.setItem('app_bg', bg);
    } else {
      setAppBackground(DEFAULT_BG);
      localStorage.removeItem('app_bg');
    }
  };

  // Menu data with images
  const menu: MenuData = {
    burgers: [
      { 
        id: 1, 
        name: "Hamburguer Simples", 
        price: 2000, 
        desc: "Pão brioche, carne bovina 150g, queijo cheddar, alface, tomate e molho da casa.", 
        category: "burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop"
      },
      { 
        id: 2, 
        name: "Hamburguer Completo", 
        price: 3000, 
        desc: "Pão brioche, carne bovina 150g, queijo cheddar e muito bacon crocante.", 
        category: "burgers",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=300&auto=format&fit=crop"
      },
      { 
        id: 7, 
        name: "Magoga DS BURGUER", 
        price: 1000, 
        desc: "Dois smash burgers, cheddar duplo, cebola caramelizada.", 
        category: "burgers",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=300&auto=format&fit=crop"
      }
    ],
    combos: [
      { 
        id: 3, 
        name: "Combo Individual", 
        price: 6500, 
        desc: "1 Classic + Batata Frita + Bebida 330ml.", 
        category: "combos",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=300&auto=format&fit=crop" 
      }
    ],
    bebidas: [
      { 
        id: 4, 
        name: "Coca-Cola 330ml", 
        price: 800, 
        desc: "Lata bem gelada.", 
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&auto=format&fit=crop"
      },
      { 
        id: 5, 
        name: "Água Mineral", 
        price: 400, 
        desc: "Sem gás 500ml.", 
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=300&auto=format&fit=crop"
      }
    ],
    sobremesas: [
      { 
        id: 6, 
        name: "Mousse de Chocolate", 
        price: 2000, 
        desc: "Artesanal e cremoso.", 
        category: "sobremesas",
        image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=300&auto=format&fit=crop"
      }
    ]
  };

  const handleUpdateQty = (product: Product, delta: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQty = existingItem.qty + delta;
        if (newQty <= 0) {
          return prevCart.filter(item => item.id !== product.id);
        }
        return prevCart.map(item => 
          item.id === product.id ? { ...item, qty: newQty } : item
        );
      } else if (delta > 0) {
        return [...prevCart, { ...product, qty: 1 }];
      }
      return prevCart;
    });
  };

  return (
    <>
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-fixed bg-center transition-all duration-500"
        style={{ backgroundImage: `url('${appBackground}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <Header />
      <CategoryNav 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      <main className="min-h-screen">
        {activeCategory === 'ai-studio' ? (
          <ImageEditor onSetBackground={handleSetBackground} />
        ) : (
          <ProductList 
            products={menu[activeCategory]} 
            cart={cart}
            categoryTitle={activeCategory} 
            onUpdateQty={handleUpdateQty} 
            onOpenAI={() => setActiveCategory('ai-studio')}
          />
        )}
      </main>

      {/* Only show cart bar if not in AI Studio mode, or you can choose to always show it */}
      {activeCategory !== 'ai-studio' && (
        <CartBar 
          cart={cart} 
          onOpenCheckout={() => setIsCheckoutOpen(true)} 
        />
      )}

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart} 
      />
    </>
  );
};

export default App;