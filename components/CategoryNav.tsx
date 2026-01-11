import React from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory, onSelectCategory }) => {
  const categories: { id: Category; label: string; icon?: string }[] = [
    { id: 'burgers', label: 'BURGERS' },
    { id: 'combos', label: 'COMBOS' },
    { id: 'bebidas', label: 'BEBIDAS' },
    { id: 'sobremesas', label: 'SOBREMESAS' },
  ];

  return (
    <nav className="bg-white flex overflow-x-auto whitespace-nowrap px-4 border-b border-gray-100 no-scrollbar sticky top-[73px] z-40">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`
            py-4 px-5 text-[13px] font-semibold cursor-pointer border-b-2 transition-all duration-200 flex items-center gap-2
            ${activeCategory === cat.id 
              ? 'text-primary border-primary' 
              : 'text-text-gray border-transparent hover:text-text-dark'}
          `}
        >
          {cat.icon && <i className={`fa-solid ${cat.icon}`}></i>}
          {cat.label}
        </div>
      ))}
    </nav>
  );
};

export default CategoryNav;