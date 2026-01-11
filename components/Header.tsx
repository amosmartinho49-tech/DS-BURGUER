import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="flex items-center gap-2">
        <img 
          src="https://burgerfive.co.ao/assets/img/logo.png" 
          alt="DS BURGUER" 
          className="h-[40px] w-auto object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerText = 'DS BURGUER';
            e.currentTarget.parentElement!.className = 'font-black text-xl text-primary tracking-tighter italic';
          }}
        />
      </div>
      <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide leading-none">
          Aberto
        </span>
      </div>
    </header>
  );
};

export default Header;