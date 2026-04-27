import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Heart, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BottomNav = () => {
  const location = useLocation();
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { name: 'SHOP', icon: Home, path: '/' },
    { name: 'SEARCH', icon: Search, path: '/shop' },
    { name: 'WISHLIST', icon: Heart, path: '#' },
    { name: 'CART', icon: ShoppingBag, path: '/cart', count: cartCount },
  ];

  return (
    <div className="md:hidden max-w-screen fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center space-y-1"
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={isActive ? 'text-slate-900' : 'text-slate-400'}
                />
                {item.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[8px] font-bold rounded-full h-3 w-3 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-bold tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
