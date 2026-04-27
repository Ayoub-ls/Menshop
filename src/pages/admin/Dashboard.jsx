import React from 'react';
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '$12,450', icon: <DollarSign size={24} />, trend: '+12.5%' },
    { label: 'Active Orders', value: '24', icon: <ShoppingCart size={24} />, trend: '+5.2%' },
    { label: 'Total Products', value: '142', icon: <Package size={24} />, trend: '+2.4%' },
    { label: 'Conversion Rate', value: '3.2%', icon: <TrendingUp size={24} />, trend: '+1.1%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back. Here is what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-700">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px] flex items-center justify-center">
        <p className="text-slate-400 font-medium">Chart visualization area</p>
      </div>
    </div>
  );
};

export default Dashboard;
