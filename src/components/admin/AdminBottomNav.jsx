import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Settings } from 'lucide-react';

const AdminBottomNav = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-400 border-t border-slate-800 z-50 flex justify-around items-center h-16 px-2">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          end={item.path === '/admin'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-all ${
              isActive ? 'text-white' : 'hover:text-slate-200'
            }`
          }
        >
          {item.icon}
          <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default AdminBottomNav;
